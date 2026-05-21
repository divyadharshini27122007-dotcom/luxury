export interface Category {
  id: string
  name: string
  slug: string
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category_id: string | null
  images: string[]
  sizes: string[]
  colors?: string[]
  gender: 'men' | 'women' | 'unisex' | null
  stock: number
  rating: number
  created_at: string
  categories?: Category
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
}
