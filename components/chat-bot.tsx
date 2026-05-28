'use client'

import Link from 'next/link'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Bot, ExternalLink, Loader2, MessageCircle, Send, ShoppingBag, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type ProductSuggestion = {
  id: string
  name: string
  price: string
  category: string
  gender: 'men' | 'women' | 'unisex' | null
  rating: number
  stock: number
  url: string
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  suggestions?: ProductSuggestion[]
  shopUrl?: string
}

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Welcome to LUXE. Tell me what you are shopping for and I will help narrow the edit.',
  },
]

const quickPrompts = [
  'Women dresses under Rs 10,000',
  'Best handbags under Rs 5,000',
  'Style a black tie outfit',
  'Gift ideas for her',
]

function createId() {
  return crypto.randomUUID()
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const sendMessageContent = async (messageContent: string) => {
    const content = messageContent.trim()
    if (!content || isLoading) {
      return
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content,
    }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setDraft('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = (await response.json()) as {
        message?: string
        error?: string
        products?: ProductSuggestion[]
        shopUrl?: string
      }

      if (!response.ok || !data.message) {
        throw new Error(data.error || 'The concierge is unavailable right now.')
      }

      const assistantContent = data.message

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createId(),
          role: 'assistant',
          content: assistantContent,
          suggestions: data.products,
          shopUrl: data.shopUrl,
        },
      ])
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    await sendMessageContent(draft)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="LUXE chat assistant"
          className="mb-3 flex h-[min(620px,calc(100vh-120px))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl sm:w-96"
        >
          <header className="flex min-h-16 items-center justify-between border-b border-border bg-primary px-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10">
                <Sparkles className="size-4" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold leading-tight">LUXE Concierge</h2>
                <p className="text-xs text-primary-foreground/70">Gemini style assistant</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="size-4" />
            </Button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[84%] rounded-lg px-3 py-2 text-sm leading-relaxed',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-secondary text-secondary-foreground',
                  )}
                >
                  <p className="whitespace-pre-line">{message.content}</p>

                  {message.role === 'assistant' && message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.slice(0, 3).map((product) => (
                        <Link
                          key={product.id}
                          href={product.url}
                          className="block rounded-md border border-border bg-background p-2 text-foreground transition-colors hover:border-accent"
                        >
                          <span className="flex items-start justify-between gap-2">
                            <span className="min-w-0">
                              <span className="line-clamp-1 font-medium">{product.name}</span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {product.category} - {product.rating} rating
                              </span>
                            </span>
                            <span className="shrink-0 text-xs font-semibold">{product.price}</span>
                          </span>
                        </Link>
                      ))}

                      {message.shopUrl && (
                        <Link
                          href={message.shopUrl}
                          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80"
                        >
                          View filtered edit
                          <ExternalLink className="size-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-auto rounded-full px-3 py-1.5 text-xs"
                    onClick={() => void sendMessageContent(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Styling a reply...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {error && (
            <p className="border-t border-border px-4 py-2 text-sm text-destructive">{error}</p>
          )}

          <form onSubmit={sendMessage} className="border-t border-border bg-background p-3">
            <div className="flex items-end gap-2">
              <Textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about outfits, gifts, sizing, or handbags"
                className="max-h-28 min-h-11 resize-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="size-11"
                disabled={!draft.trim() || isLoading}
                aria-label="Send message"
              >
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </div>
          </form>
        </section>
      )}

      <Button
        type="button"
        size="lg"
        className="h-12 rounded-full px-4 shadow-xl"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close LUXE chat' : 'Open LUXE chat'}
      >
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="hidden sm:inline">Ask LUXE</span>
        {isOpen ? <Bot className="size-4 opacity-70 sm:hidden" /> : <ShoppingBag className="size-4 opacity-70 sm:hidden" />}
      </Button>
    </div>
  )
}
