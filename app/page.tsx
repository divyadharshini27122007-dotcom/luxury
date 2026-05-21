import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { CategoryGrid } from '@/components/category-grid'
import { FeaturedProducts } from '@/components/featured-products'
import { catalogCategories, catalogProducts, marketplacePages } from '@/lib/catalog'
import Link from 'next/link'

export default function HomePage() {
  const featuredProducts = [...catalogProducts].sort((a, b) => b.rating - a.rating).slice(0, 8)
  const featuredPages = marketplacePages.slice(0, 12)

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryGrid categories={catalogCategories} />
      <FeaturedProducts products={featuredProducts} />

      <section className="border-y border-border bg-secondary/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Marketplace</p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Shop 70 Amazon-Style Pages
              </h2>
            </div>
            <Link href="/marketplace" className="text-sm font-medium text-foreground hover:text-accent">
              View all pages
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {featuredPages.map((page) => (
              <Link
                key={page.slug}
                href={`/marketplace/${page.slug}`}
                className="rounded-lg border border-border bg-background px-4 py-4 transition-colors hover:border-accent"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{page.group}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{page.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Our Promise</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Crafted in Color
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Every piece in our collection is meticulously selected from the world&apos;s finest ateliers. 
            We believe luxury is not just about the label, but the craftsmanship, the materials, 
            and the story behind each creation.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
