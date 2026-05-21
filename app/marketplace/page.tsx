import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { marketplacePages } from '@/lib/catalog'

export default function MarketplaceIndexPage() {
  const groups = Array.from(new Set(marketplacePages.map((page) => page.group)))

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">All Stores</p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            70 Marketplace Pages
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
            Browse department pages, deal centers, service hubs, guides, collections, and support destinations built
            for a large online marketplace experience.
          </p>
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group}>
              <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-xl font-semibold text-foreground">{group}</h2>
                <span className="text-sm text-muted-foreground">
                  {marketplacePages.filter((page) => page.group === group).length} pages
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                {marketplacePages
                  .filter((page) => page.group === group)
                  .map((page) => (
                    <Link
                      key={page.slug}
                      href={`/marketplace/${page.slug}`}
                      className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent"
                    >
                      <p className="text-sm font-semibold text-foreground">{page.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {page.summary}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
