import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SafeImage } from '@/components/safe-image'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12">
        <div className="relative h-[50vh] min-h-[400px]">
          <SafeImage
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="Luxury fashion atelier"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-background/80 uppercase tracking-[0.3em] text-sm mb-4">Our Story</p>
              <h1 className="font-serif text-4xl md:text-6xl text-background font-semibold">About LUXE</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Since 2010</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              A Legacy of Excellence
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in the heart of fashion&apos;s most prestigious district, LUXE has spent over a decade 
              curating the world&apos;s finest designer pieces for discerning clientele who appreciate the 
              art of exceptional craftsmanship.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our philosophy is simple: luxury should be accessible without compromise. Every piece 
              in our collection represents the pinnacle of design, materials, and artisanal expertise.
            </p>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <SafeImage
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Fashion craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <p className="font-serif text-5xl text-accent mb-2">500+</p>
            <p className="text-muted-foreground">Designer Partners</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-5xl text-accent mb-2">50K+</p>
            <p className="text-muted-foreground">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-5xl text-accent mb-2">15+</p>
            <p className="text-muted-foreground">Years of Excellence</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden md:order-2">
            <SafeImage
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Fashion collection"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Our Values</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Quality Over Quantity
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe in sustainable luxury. Each item is carefully vetted for quality, ethical 
              production, and timeless appeal. We work exclusively with ateliers that share our 
              commitment to excellence and responsible practices.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When you shop with LUXE, you&apos;re not just buying clothes—you&apos;re investing in pieces 
              that will remain beautiful and relevant for years to come.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
