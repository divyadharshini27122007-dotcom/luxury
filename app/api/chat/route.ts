import { NextResponse } from 'next/server'
import { catalogCategories, searchableProducts } from '@/lib/catalog'
import { formatRupees } from '@/lib/currency'
import type { Product } from '@/lib/types'

type ClientMessage = {
  role: 'user' | 'assistant'
  content: string
}

type GeminiPart = {
  text?: string
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[]
    }
    finishReason?: string
  }>
  error?: {
    message?: string
  }
}

type ShoppingIntent = {
  maxPrice?: number
  gender?: 'men' | 'women'
  categorySlug?: string
  query?: string
}

type ProductSuggestion = {
  id: string
  name: string
  price: string
  category: string
  gender: Product['gender']
  rating: number
  stock: number
  url: string
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

const categoryKeywords: Array<{ slug: string; terms: string[] }> = [
  { slug: 'designer-dresses', terms: ['dress', 'dresses', 'gown', 'gowns', 'midi', 'maxi', 'mini', 'occasionwear'] },
  { slug: 'handbags', terms: ['handbag', 'handbags', 'bag', 'bags', 'tote', 'clutch', 'crossbody', 'satchel'] },
  { slug: 'tailoring', terms: ['suit', 'suits', 'blazer', 'tailoring', 'trouser', 'shirt', 'polo', 'jacket'] },
  { slug: 'footwear', terms: ['shoe', 'shoes', 'heel', 'heels', 'boot', 'boots', 'footwear'] },
  { slug: 'fine-jewelry', terms: ['jewelry', 'jewellery', 'necklace', 'ring', 'bracelet', 'earring'] },
  { slug: 'beauty', terms: ['beauty', 'makeup', 'skincare', 'perfume', 'fragrance'] },
  { slug: 'watches', terms: ['watch', 'watches'] },
  { slug: 'home-atelier', terms: ['home', 'decor', 'atelier'] },
]

function normalizeMessages(messages: unknown): ClientMessage[] {
  if (!Array.isArray(messages)) {
    return []
  }

  return messages
    .filter((message): message is ClientMessage => {
      if (!message || typeof message !== 'object') {
        return false
      }

      const candidate = message as Partial<ClientMessage>
      return (
        (candidate.role === 'user' || candidate.role === 'assistant') &&
        typeof candidate.content === 'string' &&
        candidate.content.trim().length > 0
      )
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000),
    }))
}

function extractBudget(text: string) {
  const compactText = text.toLowerCase().replace(/,/g, '')
  const budgetMatch = compactText.match(
    /(?:under|below|less than|up to|upto|max|maximum|budget|within|beneath)\s*(?:rs\.?|inr|₹)?\s*(\d{3,7})/,
  )

  if (budgetMatch?.[1]) {
    return Number(budgetMatch[1])
  }

  const rupeeMatch = compactText.match(/(?:rs\.?|inr|₹)\s*(\d{3,7})/)

  if (rupeeMatch?.[1]) {
    return Number(rupeeMatch[1])
  }

  return undefined
}

function extractIntent(text: string): ShoppingIntent {
  const lowerText = text.toLowerCase()
  const matchedCategory = categoryKeywords.find(({ terms }) =>
    terms.some((term) => lowerText.includes(term)),
  )

  const gender =
    /\b(women|woman|womens|women's|ladies|lady|female|her)\b/.test(lowerText)
      ? 'women'
      : /\b(men|man|mens|men's|male|him)\b/.test(lowerText)
        ? 'men'
        : undefined

  const query = matchedCategory?.terms.find((term) => lowerText.includes(term))

  return {
    maxPrice: extractBudget(text),
    gender,
    categorySlug: matchedCategory?.slug,
    query,
  }
}

function getSearchableText(product: Product) {
  return [
    product.name,
    product.description,
    product.categories?.name,
    product.categories?.slug,
    product.gender,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function productMatchesIntent(product: Product, intent: ShoppingIntent, strict = true) {
  const searchableText = getSearchableText(product)

  if (intent.maxPrice && product.price > intent.maxPrice) {
    return false
  }

  if (intent.gender && strict && product.gender !== intent.gender && product.gender !== 'unisex') {
    return false
  }

  if (intent.categorySlug && strict) {
    const categoryTerms = categoryKeywords.find(({ slug }) => slug === intent.categorySlug)?.terms || []
    const categoryMatches =
      product.categories?.slug === intent.categorySlug ||
      categoryTerms.some((term) => searchableText.includes(term))

    if (!categoryMatches) {
      return false
    }
  }

  return true
}

function scoreProduct(product: Product, intent: ShoppingIntent) {
  const searchableText = getSearchableText(product)
  let score = product.rating

  if (intent.gender && product.gender === intent.gender) {
    score += 5
  } else if (intent.gender && product.gender === 'unisex') {
    score += 2
  }

  if (intent.categorySlug && product.categories?.slug === intent.categorySlug) {
    score += 5
  }

  if (intent.query && searchableText.includes(intent.query)) {
    score += 4
  }

  if (intent.maxPrice) {
    score += Math.max(0, 4 - product.price / intent.maxPrice)
  }

  if (product.stock > 0) {
    score += 1
  }

  return score
}

function findRelevantProducts(text: string) {
  const intent = extractIntent(text)
  let products = searchableProducts.filter((product) => productMatchesIntent(product, intent))

  if (products.length === 0) {
    products = searchableProducts.filter((product) => productMatchesIntent(product, intent, false))
  }

  if (products.length === 0) {
    products = [...searchableProducts]
  }

  return products
    .sort((first, second) => scoreProduct(second, intent) - scoreProduct(first, intent))
    .slice(0, 6)
}

function createShopUrl(text: string) {
  const intent = extractIntent(text)
  const params = new URLSearchParams()

  if (intent.query) {
    params.set('q', intent.query)
  }

  if (intent.categorySlug) {
    params.set('category', intent.categorySlug)
  }

  if (intent.gender) {
    params.set('gender', intent.gender)
  }

  if (intent.maxPrice) {
    params.set('maxPrice', String(intent.maxPrice))
  }

  params.set('sort', 'rating')

  return `/shop?${params.toString()}`
}

function toSuggestion(product: Product): ProductSuggestion {
  return {
    id: product.id,
    name: product.name,
    price: formatRupees(product.price),
    category: product.categories?.name || 'Fashion',
    gender: product.gender,
    rating: product.rating,
    stock: product.stock,
    url: `/product/${product.id}`,
  }
}

function createCatalogContext(products: Product[], shopUrl: string) {
  const productLines = products.map((product) => {
    const category = product.categories?.name || 'Fashion'
    const gender = product.gender ? `${product.gender}, ` : ''

    return `- ${product.name} (${product.id}): ${formatRupees(product.price)}, ${gender}${category}, rating ${product.rating}, stock ${product.stock}, link /product/${product.id}.`
  })

  return [
    `Categories: ${catalogCategories.map((category) => category.name).join(', ')}.`,
    `Best matching products for the shopper's latest request:`,
    ...productLines,
    `Filtered shop link: ${shopUrl}.`,
  ].join('\n')
}

function createSystemInstruction(products: Product[], shopUrl: string) {
  return `You are LUXE Concierge, a polished shopping assistant for a premium fashion ecommerce website.
Help shoppers choose outfits, gifts, sizes, colors, categories, and care options.
Use this store catalog context when recommending exact products:
${createCatalogContext(products, shopUrl)}

Rules:
- Keep responses concise and practical.
- Recommend 2 to 4 exact products from the catalog context when the shopper asks to find, compare, style, or buy something.
- Mention price in INR, why each item fits, and the product link.
- Include the filtered shop link when useful.
- Do not claim to place orders, access private account data, track real shipments, or process payments.
- If the question is unrelated to shopping, answer briefly and bring the conversation back to LUXE when natural.`
}

function createLocalReply(latestMessage: string, products: Product[], shopUrl: string) {
  const suggestions = products.slice(0, 4)

  if (suggestions.length === 0) {
    return 'I can help search the LUXE edit, but I could not find a close catalog match. Try a category, occasion, color, or budget.'
  }

  const intro = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    ? 'I found these LUXE matches:'
    : 'Gemini will answer once `GEMINI_API_KEY` is added. For now, I found these LUXE catalog matches:'

  const lines = suggestions.map((product) => {
    return `- ${product.name} (${formatRupees(product.price)}): ${product.categories?.name || 'Fashion'}, rating ${product.rating}.`
  })

  return [
    intro,
    ...lines,
    `Open the filtered edit: ${shopUrl}`,
    latestMessage.toLowerCase().includes('size')
      ? 'For sizing, compare your usual size with the product fit notes and choose the larger size if you are between sizes.'
      : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const messages = normalizeMessages(body?.messages)

    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'Send at least one user message.' }, { status: 400 })
    }

    const latestMessage = messages[messages.length - 1].content
    const relevantProducts = findRelevantProducts(latestMessage)
    const suggestions = relevantProducts.map(toSuggestion)
    const shopUrl = createShopUrl(latestMessage)
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        message: createLocalReply(latestMessage, relevantProducts, shopUrl),
        products: suggestions,
        shopUrl,
        source: 'local',
      })
    }

    const geminiResponse = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: createSystemInstruction(relevantProducts, shopUrl) }],
        },
        contents: messages.map((message) => ({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        })),
        generationConfig: {
          temperature: 0.45,
          maxOutputTokens: 700,
        },
      }),
    })

    const data = (await geminiResponse.json()) as GeminiResponse

    if (!geminiResponse.ok) {
      return NextResponse.json(
        {
          message: createLocalReply(latestMessage, relevantProducts, shopUrl),
          products: suggestions,
          shopUrl,
          source: 'local',
          warning: data.error?.message || 'Gemini could not answer right now, so local catalog results were returned.',
        },
        { status: 200 },
      )
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join('\n')
      .trim()

    if (!reply) {
      return NextResponse.json({
        message: createLocalReply(latestMessage, relevantProducts, shopUrl),
        products: suggestions,
        shopUrl,
        source: 'local',
        warning: 'Gemini returned an empty response, so local catalog results were returned.',
      })
    }

    return NextResponse.json({
      message: reply,
      products: suggestions,
      shopUrl,
      source: 'gemini',
    })
  } catch (error) {
    console.error('Gemini chat error:', error)
    return NextResponse.json(
      { error: 'The chat service had a problem. Please try again.' },
      { status: 500 },
    )
  }
}
