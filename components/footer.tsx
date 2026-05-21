'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    await new Promise((resolve) => setTimeout(resolve, 500))
    setStatus('success')
    setEmail('')

    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl font-semibold tracking-wider mb-4">LUXE</h2>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed mb-6">
              Curating the finest in luxury fashion since 2010. Every piece tells a story of craftsmanship and elegance.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button 
                type="submit" 
                variant="secondary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {status === 'success' && (
              <p className="text-sm text-accent mt-2">Thank you for subscribing!</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive mt-2">Something went wrong. Please try again.</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shop All</Link></li>
              <li><Link href="/marketplace" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Marketplace</Link></li>
              <li><Link href="/marketplace/today-deals" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Today&apos;s Deals</Link></li>
              <li><Link href="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Customer Care</h3>
            <ul className="space-y-3">
              <li><Link href="/marketplace/shipping-options" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/marketplace/size-guide" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Size Guide</Link></li>
              <li><Link href="/marketplace/customer-service" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
