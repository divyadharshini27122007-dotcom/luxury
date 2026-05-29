import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { ShopFilters } from '@/components/shop-filters'
import { catalogCategories, shopProducts } from '@/lib/catalog'

interface ShopPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    gender?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  let filteredProducts = [...shopProducts]

  if (params.q) {
    const query = params.q.toLowerCase()
    filteredProducts = filteredProducts.filter((product) =>
      [product.name, product.description, product.categories?.name, product.gender]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    )
  }

  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.categories?.slug === params.category)
  }

  if (params.gender) {
    filteredProducts = filteredProducts.filter(p => p.gender === params.gender)
  }

  if (params.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(params.minPrice))
  }

  if (params.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(params.maxPrice))
  }

  if (params.sort) {
    switch (params.sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Our Collection</p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            {params.q ? `Results for "${params.q}"` : 'Shop All'}
          </h1>
        </div>

        <ShopFilters categories={catalogCategories} />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      
      <Footer />
    </main>
  )
}
