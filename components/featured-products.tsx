import { Product } from '@/lib/types'
import { ProductCard } from './product-card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Curated Selection</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Featured Dresses</h2>
        </div>
        <Button asChild variant="ghost" className="group">
          <Link href="/shop" className="flex items-center gap-2">
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
