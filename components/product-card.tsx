'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatRupees } from '@/lib/currency'
import { SafeImage } from '@/components/safe-image'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
        <SafeImage
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>
          {product.colors && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color}
                  className="h-3.5 w-3.5 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="font-semibold text-foreground">{formatRupees(product.price)}</p>
      </div>
    </Link>
  )
}
