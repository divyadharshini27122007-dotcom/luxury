'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ShopFiltersProps {
  categories: Category[]
}

export function ShopFilters({ categories }: ShopFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/shop?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/shop')
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
      <Select
        value={searchParams.get('category') || 'all'}
        onValueChange={(value) => updateFilter('category', value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('gender') || 'all'}
        onValueChange={(value) => updateFilter('gender', value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="women">Women</SelectItem>
          <SelectItem value="men">Men</SelectItem>
          <SelectItem value="unisex">Unisex</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('sort') || 'newest'}
        onValueChange={(value) => updateFilter('sort', value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Top Rated</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
          Clear Filters
        </Button>
      )}
    </div>
  )
}
