'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((resolve) => setTimeout(resolve, 500))
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you have a question about our collection, need styling advice, or want to 
              discuss a special order, our team is here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">hello@luxe.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-muted-foreground">
                    123 Fashion Avenue<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 bg-background"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="mt-1 bg-background resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
              {status === 'success' && (
                <p className="text-center text-sm text-accent">
                  Thank you! We&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
