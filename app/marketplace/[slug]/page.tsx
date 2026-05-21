import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BadgeCheck, PackageCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { SafeImage } from '@/components/safe-image'
import { getMarketplacePage, getProductsForPage, marketplacePages } from '@/lib/catalog'

interface MarketplacePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return marketplacePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: MarketplacePageProps) {
  const { slug } = await params
  const page = getMarketplacePage(slug)

  return {
    title: page ? `${page.title} | LUXE Marketplace` : 'Marketplace | LUXE',
    description: page?.summary,
  }
}

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const { slug } = await params
  const page = getMarketplacePage(slug)

  if (!page) {
    notFound()
  }

  const products = getProductsForPage(page, 8)

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative min-h-[430px] overflow-hidden pt-28">
        <SafeImage
          src={page.heroImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-background">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-background/75">
              {page.eyebrow}
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight md:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-background/85">{page.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-background/15 px-4 py-2 text-sm backdrop-blur">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ['Fast delivery', Truck],
            ['Verified sellers', BadgeCheck],
            ['Protected checkout', ShieldCheck],
            ['Easy returns', RotateCcw],
          ].map(([label, Icon]) => (
            <div key={String(label)} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-foreground">{String(label)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Featured Products</p>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
              Top Picks in {page.title}
            </h2>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link href="/shop" className="flex items-center gap-2">
              Shop all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={`${page.slug}-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ['Compare before you buy', 'Scan ratings, stock, sizes, and related products from one page.'],
            ['Marketplace confidence', 'Clear shipping, returns, and seller quality signals support every purchase.'],
            ['Built for browsing', 'Department links, deal modules, and guide content make discovery feel broad and fast.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg border border-border bg-background p-6">
              <PackageCheck className="mb-5 h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
