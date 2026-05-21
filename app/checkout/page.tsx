'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatRupees } from '@/lib/currency'
import { SafeImage } from '@/components/safe-image'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    if (!orderComplete && items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, orderComplete, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    clearCart()
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </section>
        <Footer />
      </main>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required className="mt-1" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" required className="mt-1" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-4">Payment Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full py-6" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : `Pay ${formatRupees(totalPrice)}`}
              </Button>
            </form>
          </div>

          <div className="lg:pl-8 lg:border-l border-border">
            <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="relative w-16 aspect-square rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <SafeImage
                      src={item.product.images[0] || '/placeholder.svg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                  </div>
                  <p className="font-medium text-sm">{formatRupees(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatRupees(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatRupees(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
