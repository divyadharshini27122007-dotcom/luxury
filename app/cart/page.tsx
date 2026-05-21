'use client'

import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { formatRupees } from '@/lib/currency'
import { SafeImage } from '@/components/safe-image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[60vh] flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Discover our collection and add some luxury to your wardrobe.</p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-6 pb-6 border-b border-border">
                <div className="relative w-24 aspect-[3/4] rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <SafeImage
                    src={item.product.images[0] || '/placeholder.svg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="font-semibold">{formatRupees(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatRupees(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatRupees(totalPrice)}</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full mt-2">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
