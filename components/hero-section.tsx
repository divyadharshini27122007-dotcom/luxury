import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[76vh] flex items-center justify-center overflow-hidden pt-24">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-background/80 uppercase tracking-[0.3em] text-sm mb-6 font-medium">
          Color Collection 2026
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background font-semibold mb-5 leading-tight text-balance">
          Dresses in Rare Color Stories
        </h1>
        <p className="text-background/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover jewel-toned gowns, soft organza midis, satin wraps, and occasion dresses styled for quick marketplace browsing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-sm uppercase tracking-wider">
            <Link href="/shop">Shop Collection</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-background text-background hover:bg-background/10 px-8 py-6 text-sm uppercase tracking-wider">
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-background/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
