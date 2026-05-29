'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Package, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from './cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Navbar() {
  const { totalItems } = useCart()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const categoryBarClass = scrolled
    ? 'hidden border-t border-border/70 md:block'
    : 'hidden border-t border-white/15 bg-transparent md:block'
  const primaryCategoryLinkClass = scrolled
    ? 'font-medium text-foreground hover:text-accent'
    : 'font-medium text-white drop-shadow-sm hover:text-accent'
  const categoryLinkClass = scrolled
    ? 'text-foreground/75 hover:text-foreground'
    : 'text-white/90 drop-shadow-sm hover:text-white'

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedQuery = query.trim()
    router.push(trimmedQuery ? `/shop?q=${encodeURIComponent(trimmedQuery)}` : '/shop')
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <Link href="/" className="font-serif text-2xl font-semibold tracking-wider text-foreground">
            LUXE
          </Link>

          <form onSubmit={handleSearch} className="hidden flex-1 items-center md:flex max-w-2xl">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search luxury fashion, beauty, home, gifts"
                className="h-10 rounded-r-none border-r-0 pl-9"
              />
            </div>
            <Button type="submit" className="h-10 rounded-l-none px-4" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-5 lg:flex">
              <Link href="/marketplace/account-dashboard" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                <User className="h-4 w-4" />
                Account
              </Link>
              <Link href="/marketplace/orders-tracking" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                <Package className="h-4 w-4" />
                Orders
              </Link>
            </div>
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="flex">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="rounded-r-none border-r-0"
              />
              <Button type="submit" className="rounded-l-none" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Link href="/" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/shop" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link href="/marketplace" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              Marketplace
            </Link>
            <Link href="/marketplace/today-deals" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              Deals
            </Link>
            <Link href="/marketplace/orders-tracking" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              Orders
            </Link>
            <Link href="/about" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block text-sm font-medium text-foreground/80 hover:text-foreground" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}

      <div className={categoryBarClass}>
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-2 text-sm sm:px-6 lg:px-8">
          <Link href="/marketplace" className={primaryCategoryLinkClass}>All</Link>
          <Link href="/marketplace/today-deals" className={categoryLinkClass}>Today&apos;s Deals</Link>
          <Link href="/marketplace/women-fashion" className={categoryLinkClass}>Women</Link>
          <Link href="/marketplace/men-fashion" className={categoryLinkClass}>Men</Link>
          <Link href="/marketplace/luxury-handbags" className={categoryLinkClass}>Handbags</Link>
          <Link href="/marketplace/gift-guide" className={categoryLinkClass}>Gift Guide</Link>
          <Link href="/marketplace/customer-service" className={categoryLinkClass}>Customer Service</Link>
        </div>
      </div>
    </nav>
  )
}
