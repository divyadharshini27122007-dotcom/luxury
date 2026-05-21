import Link from 'next/link'
import { Category } from '@/lib/types'
import { SafeImage } from '@/components/safe-image'

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Explore</p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Shop by Category</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {categories.map((category, index) => (
          <Link 
            key={category.id} 
            href={`/shop?category=${category.slug}`}
            className={`group relative overflow-hidden rounded-lg ${
              index === 0 ? 'col-span-2 md:col-span-1 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
            }`}
          >
            <SafeImage
              src={category.image_url || '/placeholder.svg'}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 flex items-end p-4 md:p-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-background font-medium">
                  {category.name}
                </h3>
                <p className="text-background/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
