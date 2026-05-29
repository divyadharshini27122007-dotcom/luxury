import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductDetails } from '@/components/product-details'
import { ProductCard } from '@/components/product-card'
import { shopProducts } from '@/lib/catalog'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = shopProducts.find((item) => item.id === id)

  if (!product) {
    notFound()
  }

  const relatedProducts = shopProducts
    .filter((item) => item.category_id === product.category_id && item.id !== id)
    .slice(0, 4)

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ProductDetails product={product} />
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
      
      <Footer />
    </main>
  )
}
