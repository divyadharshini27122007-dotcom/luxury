import type { Metadata } from 'next'
import { CartProvider } from '@/components/cart-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'LUXE | Premium Fashion',
  description: 'Discover luxury fashion curated for the modern connoisseur. Shop exclusive designer collections.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
