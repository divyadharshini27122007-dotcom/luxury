'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const mainCategoryOptions = [
  { value: 'all', label: 'All', href: '/shop' },
  { value: 'today-deals', label: "Today's Deals", href: '/marketplace/today-deals' },
  { value: 'women', label: 'Women', href: '/shop?gender=women' },
  { value: 'men', label: 'Men', href: '/shop?gender=men' },
  { value: 'handbags', label: 'Handbags', href: '/shop?category=handbags' },
  { value: 'gift-guide', label: 'Gift Guide', href: '/marketplace/gift-guide' },
  { value: 'customer-service', label: 'Customer Service', href: '/marketplace/customer-service' },
]

export function ShopFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedMainCategory =
    searchParams.get('category') === 'handbags'
      ? 'handbags'
      : searchParams.get('gender') === 'women'
        ? 'women'
        : searchParams.get('gender') === 'men'
          ? 'men'
          : 'all'

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/shop?${params.toString()}`)
  }

  const updateMainCategory = (value: string) => {
    const selectedOption = mainCategoryOptions.find((option) => option.value === value)
    router.push(selectedOption?.href || '/shop')
  }

  const clearFilters = () => {
    router.push('/shop')
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
      <Select
        value={selectedMainCategory}
        onValueChange={updateMainCategory}
      >
        <SelectTrigger className="w-[190px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {mainCategoryOptions.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
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
