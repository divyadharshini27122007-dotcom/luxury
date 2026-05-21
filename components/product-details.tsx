'use client'

import { useState } from 'react'
import { Star, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatRupees } from '@/lib/currency'
import { useCart } from './cart-provider'
import { Button } from '@/components/ui/button'
import { SafeImage } from '@/components/safe-image'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) return
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
      <div className="space-y-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <SafeImage
            src={product.images[selectedImage] || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-accent' : 'border-transparent'
                }`}
              >
                <SafeImage src={image} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="mb-3">
          <p className="text-accent uppercase tracking-wider text-sm mb-2">
            {product.categories?.name || 'Luxury Fashion'}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">{product.rating} rating</span>
          </div>
          <p className="text-3xl font-semibold text-foreground mb-4">
            {formatRupees(product.price)}
          </p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {product.description}
        </p>

        <div className="mb-5">
          <p className="font-medium mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:border-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {product.colors && (
          <div className="mb-5">
            <p className="font-medium mb-3">Available Colors</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="h-8 w-8 rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="font-medium mb-3">Quantity</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className="w-full py-6 text-sm uppercase tracking-wider"
        >
          {added ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Gender</p>
              <p className="font-medium capitalize">{product.gender || 'Unisex'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium">{product.categories?.name || 'Fashion'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
