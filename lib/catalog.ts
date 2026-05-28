import type { Category, Product } from '@/lib/types'

const categorySeeds = [
  {
    id: 'cat-designer-dresses',
    name: 'Designer Dresses',
    slug: 'designer-dresses',
    image_url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1200&q=80',
  },
  {
    id: 'cat-tailoring',
    name: 'Tailoring',
    slug: 'tailoring',
    image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
  },
  {
    id: 'cat-handbags',
    name: 'Handbags',
    slug: 'handbags',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80',
  },
  {
    id: 'cat-footwear',
    name: 'Footwear',
    slug: 'footwear',
    image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80',
  },
  {
    id: 'cat-jewelry',
    name: 'Fine Jewelry',
    slug: 'fine-jewelry',
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    slug: 'beauty',
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
  },
  {
    id: 'cat-watches',
    name: 'Watches',
    slug: 'watches',
    image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80',
  },
  {
    id: 'cat-home',
    name: 'Home Atelier',
    slug: 'home-atelier',
    image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80',
  },
]

const productNames = [
  'Cobalt Satin Wrap Dress',
  'Rose Organza Midi Dress',
  'Emerald Silk Column Gown',
  'Sunset Pleated Maxi Dress',
  'Ivory Bow Cocktail Dress',
  'Ruby Velvet Mini Dress',
  'Lilac Tulle Occasion Dress',
  'Black Sequin Slip Dress',
  'Pearl Trim A-Line Dress',
  'Champagne Halter Gown',
  'Aqua Draped Day Dress',
  'Marigold Linen Shirt Dress',
  'Fuchsia Corset Midi Dress',
  'Sage Chiffon Garden Dress',
  'Graphite Tailored Blazer Dress',
  'Azure Cutout Resort Dress',
  'Coral Satin Bias Dress',
  'Plum Velvet Evening Dress',
  'White Poplin Volume Dress',
  'Gold Jacquard Party Dress',
  'Teal One-Shoulder Gown',
  'Blush Feather Hem Dress',
  'Navy Crepe Wrap Dress',
  'Silver Beaded Column Dress',
  'Mint Ruffle Mini Dress',
  'Crimson Off-Shoulder Gown',
  'Buttercup Knit Tank Dress',
  'Olive Utility Midi Dress',
  'Orchid Printed Maxi Dress',
  'Mocha Suede Shirt Dress',
  'Cerulean High-Neck Dress',
  'Scarlet Lace Pencil Dress',
]

const productImages = [
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=80',
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=900&q=80',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&q=80',
  'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=900&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
  'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&q=80',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=80',
  'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=900&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80',
  'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80',
  'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=900&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80',
]

const colorPalettes = [
  ['#1f5eff', '#f7c7d9', '#111111'],
  ['#d90452', '#ffd166', '#2a9d8f'],
  ['#064e3b', '#f8f0d9', '#c1121f'],
  ['#7c3aed', '#f97316', '#f9fafb'],
  ['#0f172a', '#c0c0c0', '#b08968'],
  ['#ec4899', '#a7f3d0', '#312e81'],
]

export const catalogCategories: Category[] = categorySeeds.map((category) => ({
  ...category,
  created_at: '2026-01-01T00:00:00.000Z',
}))

export const catalogProducts: Product[] = Array.from({ length: 80 }, (_, index) => {
  const category = catalogCategories[index % catalogCategories.length]
  const price = 145 + ((index * 137) % 2850)
  const gender = (['women', 'men', 'unisex'] as const)[index % 3]

  return {
    id: `luxe-${String(index + 1).padStart(3, '0')}`,
    name: productNames[index % productNames.length],
    description:
      'A dress-forward luxury piece selected for striking color, polished finishing, and an easy occasion-ready fit.',
    price,
    category_id: category.id,
    images: [
      productImages[index % productImages.length],
      productImages[(index + 5) % productImages.length],
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: colorPalettes[index % colorPalettes.length],
    gender,
    stock: 8 + (index % 34),
    rating: Number((4.2 + ((index % 8) * 0.1)).toFixed(1)),
    created_at: new Date(Date.UTC(2026, index % 12, (index % 26) + 1)).toISOString(),
    categories: category,
  }
})

const tailoringCategory = catalogCategories.find((category) => category.slug === 'tailoring')!
const handbagCategory = catalogCategories.find((category) => category.slug === 'handbags')!

const menCollection: Product[] = [
  {
    id: 'men-001',
    name: 'Italian Wool Suit',
    description: 'A sharp two-piece wool suit with a clean shoulder, tapered trouser, and polished formal finish.',
    price: 5499,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#111827', '#6b7280', '#d6c7a1'],
    gender: 'men',
    stock: 14,
    rating: 4.8,
    created_at: '2026-03-01T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-002',
    name: 'Textured Linen Blazer',
    description: 'A lightweight blazer cut for warm-weather dinners, resort events, and effortless layering.',
    price: 3999,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#e5e7eb', '#0f172a', '#b08968'],
    gender: 'men',
    stock: 18,
    rating: 4.6,
    created_at: '2026-03-02T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-003',
    name: 'Merino Knit Polo',
    description: 'A refined knit polo with a soft hand feel and a neat collar for elevated casual dressing.',
    price: 1899,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=900&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#0f766e', '#111827', '#f5f5f4'],
    gender: 'men',
    stock: 24,
    rating: 4.5,
    created_at: '2026-03-03T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-004',
    name: 'Leather Bomber Jacket',
    description: 'A smooth leather jacket with ribbed trim, satin lining, and a strong modern profile.',
    price: 6999,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#111111', '#78350f', '#737373'],
    gender: 'men',
    stock: 9,
    rating: 4.9,
    created_at: '2026-03-04T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-005',
    name: 'Oxford Shirt Set',
    description: 'Crisp cotton shirts with a precise collar, tailored cuff, and daily wardrobe versatility.',
    price: 1499,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=900&q=80',
      'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#ffffff', '#bfdbfe', '#111827'],
    gender: 'men',
    stock: 32,
    rating: 4.4,
    created_at: '2026-03-05T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-006',
    name: 'Tailored Evening Trousers',
    description: 'Flat-front trousers with a clean taper, smooth drape, and formal waistband detailing.',
    price: 2299,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#111827', '#525252', '#e7e5e4'],
    gender: 'men',
    stock: 20,
    rating: 4.7,
    created_at: '2026-03-06T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-007',
    name: 'Suede Chelsea Boots',
    description: 'Streamlined suede boots with elastic side panels and a comfortable stacked heel.',
    price: 3499,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=900&q=80',
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=900&q=80',
    ],
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['#78350f', '#111827', '#a8a29e'],
    gender: 'men',
    stock: 16,
    rating: 4.6,
    created_at: '2026-03-07T00:00:00.000Z',
    categories: tailoringCategory,
  },
  {
    id: 'men-008',
    name: 'Weekend Cashmere Hoodie',
    description: 'A soft cashmere hoodie with a relaxed fit, ribbed edges, and understated luxury feel.',
    price: 2899,
    category_id: tailoringCategory.id,
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#d6d3d1', '#111827', '#164e63'],
    gender: 'men',
    stock: 21,
    rating: 4.5,
    created_at: '2026-03-08T00:00:00.000Z',
    categories: tailoringCategory,
  },
]

const handbagCollection: Product[] = [
  {
    id: 'bag-001',
    name: 'Signature Leather Tote',
    description: 'A structured leather tote with top handles, polished hardware, and a roomy suede-lined interior.',
    price: 4299,
    category_id: handbagCategory.id,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
    ],
    sizes: ['One Size'],
    colors: ['#111827', '#b08968', '#f5f5f4'],
    gender: 'women',
    stock: 13,
    rating: 4.9,
    created_at: '2026-04-01T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-002',
    name: 'Quilted Chain Shoulder Bag',
    description: 'A compact quilted shoulder bag with chain trim and a sleek evening-ready profile.',
    price: 3599,
    category_id: handbagCategory.id,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900&q=80',
    ],
    sizes: ['One Size'],
    colors: ['#0f172a', '#e11d48', '#d6c7a1'],
    gender: 'women',
    stock: 17,
    rating: 4.7,
    created_at: '2026-04-02T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-003',
    name: 'Mini Crescent Crossbody',
    description: 'A curved crossbody bag with an adjustable strap and a smooth minimalist finish.',
    price: 2499,
    category_id: handbagCategory.id,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
    ],
    sizes: ['One Size'],
    colors: ['#f8fafc', '#111827', '#fb7185'],
    gender: 'women',
    stock: 22,
    rating: 4.6,
    created_at: '2026-04-03T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-004',
    name: 'Croc-Embossed Satchel',
    description: 'A refined satchel with croc-embossed texture, metal feet, and a detachable strap.',
    price: 5199,
    category_id: handbagCategory.id,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80',
    ],
    sizes: ['One Size'],
    colors: ['#78350f', '#111827', '#b45309'],
    gender: 'women',
    stock: 8,
    rating: 4.8,
    created_at: '2026-04-04T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-005',
    name: 'Soft Hobo Carryall',
    description: 'A slouchy carryall with supple leather, oversized zip pull, and generous daily storage.',
    price: 3899,
    category_id: handbagCategory.id,
    images: [
      'https://images.pexels.com/photos/29359843/pexels-photo-29359843.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/29359829/pexels-photo-29359829.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    sizes: ['One Size'],
    colors: ['#a16207', '#111827', '#d6d3d1'],
    gender: 'women',
    stock: 19,
    rating: 4.5,
    created_at: '2026-04-05T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-006',
    name: 'Box Clutch with Crystal Trim',
    description: 'A compact occasion clutch with a structured frame and subtle crystal edge detailing.',
    price: 2999,
    category_id: handbagCategory.id,
    images: [
      'https://cdn.pixabay.com/photo/2017/08/20/11/39/handbag-2661412_1280.jpg',
      'https://images.pexels.com/photos/29359845/pexels-photo-29359845.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    sizes: ['One Size'],
    colors: ['#f8fafc', '#c0c0c0', '#111827'],
    gender: 'women',
    stock: 15,
    rating: 4.6,
    created_at: '2026-04-06T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-007',
    name: 'Woven Market Bag',
    description: 'A woven statement bag with leather handles, tonal stitching, and vacation-ready texture.',
    price: 2199,
    category_id: handbagCategory.id,
    images: [
      'https://cdn.pixabay.com/photo/2015/11/19/08/46/bag-1050608_640.jpg',
      'https://cdn.pixabay.com/photo/2016/11/23/18/12/bag-1854148_1280.jpg',
    ],
    sizes: ['One Size'],
    colors: ['#d6c7a1', '#78350f', '#f5f5f4'],
    gender: 'women',
    stock: 26,
    rating: 4.4,
    created_at: '2026-04-07T00:00:00.000Z',
    categories: handbagCategory,
  },
  {
    id: 'bag-008',
    name: 'Top Handle Evening Bag',
    description: 'A polished top handle bag sized for evening essentials with a refined clasp closure.',
    price: 4799,
    category_id: handbagCategory.id,
    images: [
      'https://cdn.pixabay.com/photo/2015/11/20/03/53/package-1052370_640.jpg',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
    ],
    sizes: ['One Size'],
    colors: ['#111827', '#be123c', '#f5f5f4'],
    gender: 'women',
    stock: 10,
    rating: 4.8,
    created_at: '2026-04-08T00:00:00.000Z',
    categories: handbagCategory,
  },
]

const curatedMarketplaceProducts: Record<string, Product[]> = {
  'men-fashion': menCollection,
  'luxury-handbags': handbagCollection,
}

export const searchableProducts: Product[] = [
  ...catalogProducts,
  ...menCollection,
  ...handbagCollection,
]

const pageGroups = [
  {
    label: 'Departments',
    slugs: [
      'women-fashion',
      'men-fashion',
      'designer-dresses',
      'luxury-handbags',
      'premium-shoes',
      'fine-jewelry',
      'beauty-store',
      'watch-boutique',
      'home-luxury',
      'travel-essentials',
      'workwear-edit',
      'occasionwear',
    ],
  },
  {
    label: 'Deals',
    slugs: [
      'today-deals',
      'limited-time-offers',
      'outlet-finds',
      'coupon-center',
      'buy-more-save-more',
      'new-markdowns',
      'gifts-under-250',
      'premium-clearance',
      'weekend-event',
      'early-access-deals',
    ],
  },
  {
    label: 'Services',
    slugs: [
      'account-dashboard',
      'orders-tracking',
      'returns-center',
      'membership-rewards',
      'gift-cards',
      'registry',
      'personal-shopper',
      'style-subscription',
      'seller-studio',
      'customer-service',
    ],
  },
  {
    label: 'Guides',
    slugs: [
      'size-guide',
      'fit-finder',
      'fabric-care',
      'gift-guide',
      'wedding-guest-guide',
      'capsule-wardrobe',
      'seasonal-trends',
      'investment-pieces',
      'designer-index',
      'sustainability-hub',
    ],
  },
  {
    label: 'Collections',
    slugs: [
      'new-arrivals',
      'best-sellers',
      'editorial-picks',
      'runway-inspired',
      'quiet-luxury',
      'black-tie',
      'resort-shop',
      'winter-layering',
      'spring-refresh',
      'office-polish',
      'evening-glamour',
      'minimalist-edit',
      'color-story',
      'monogram-shop',
      'artisan-made',
      'exclusive-drops',
      'celebrity-style',
      'vacation-shop',
    ],
  },
  {
    label: 'Help',
    slugs: [
      'shipping-options',
      'payment-methods',
      'privacy-center',
      'security-center',
      'accessibility',
      'store-locator',
      'contact-support',
      'order-protection',
      'loyalty-faq',
      'marketplace-policies',
    ],
  },
]

export type MarketplacePage = {
  slug: string
  title: string
  group: string
  eyebrow: string
  summary: string
  heroImage: string
  productOffset: number
  tags: string[]
}

const titleCase = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const pageOverrides = {
  'men-fashion': {
    title: "Men's Collection",
    summary:
      'Explore tailored suits, refined knits, leather layers, and polished essentials curated for a modern menswear wardrobe.',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80',
    tags: ['Menswear', 'Tailoring', 'Premium edit', 'Fast delivery'],
  },
  'luxury-handbags': {
    title: 'Handbag Collection',
    summary:
      'Browse structured totes, quilted shoulder bags, compact clutches, and polished leather carryalls for every occasion.',
    heroImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1920&q=80',
    tags: ['Handbags', 'Leather goods', 'Verified sellers', 'Premium edit'],
  },
}

export const marketplacePages: MarketplacePage[] = pageGroups.flatMap((group, groupIndex) =>
  group.slugs.map((slug, index) => {
    const override = pageOverrides[slug as keyof typeof pageOverrides]

    return {
      slug,
      title: override?.title || titleCase(slug),
      group: group.label,
      eyebrow: `${group.label} Storefront`,
      summary:
        override?.summary ||
        (group.label === 'Services' || group.label === 'Help'
          ? 'Manage a complete shopping journey with quick actions, guidance, and trusted support in one focused destination.'
          : 'Browse a full marketplace-style page with curated products, fast discovery modules, and merchandising blocks built for comparison shopping.'),
      heroImage: override?.heroImage || productImages[(groupIndex * 3 + index) % productImages.length],
      productOffset: (groupIndex * 11 + index * 3) % catalogProducts.length,
      tags: override?.tags || [group.label, 'Fast delivery', 'Verified sellers', 'Premium edit'],
    }
  }),
)

export function getMarketplacePage(slug: string) {
  return marketplacePages.find((page) => page.slug === slug)
}

export function getProductsForPage(page: MarketplacePage, count = 8) {
  const curatedProducts = curatedMarketplaceProducts[page.slug]

  if (curatedProducts) {
    return curatedProducts.slice(0, count)
  }

  return Array.from({ length: count }, (_, index) => catalogProducts[(page.productOffset + index) % catalogProducts.length])
}
