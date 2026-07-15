import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteSidebar } from '@/components/site-sidebar'
import { SiteFooter } from '@/components/site-footer'
import { getAllCommunityPhotos, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Our Community | CJ Healing Arts',
  description:
    'A glimpse into the CJ Healing Arts community — moments, milestones, and the people we serve.',
}

export const revalidate = 60

export default async function OurCommunityPage() {
  let photos: Array<{
    id: string
    imageUrl: string
    alt: string
    caption?: string
  }> = []

  try {
    const sanityPhotos = await getAllCommunityPhotos()
    if (sanityPhotos && sanityPhotos.length > 0) {
      photos = sanityPhotos.map((p) => ({
        id: p._id,
        imageUrl: urlFor(p.image).width(600).height(600).fit('crop').url(),
        alt: p.image?.alt ?? p.caption ?? 'Community photo',
        caption: p.caption,
      }))
    }
  } catch {
    // Sanity fetch failed silently
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteSidebar />
      <main className="lg:ml-64">
        <section className="px-6 py-14 sm:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Our Community
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Moments, milestones, and the people at the heart of CJ Healing Arts.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl md:mt-20">
            {photos.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No photos yet. Check back soon.
              </p>
            ) : (
              <ul className="grid grid-cols-3 gap-1 sm:gap-2">
                {photos.map((photo) => (
                  <li key={photo.id} className="group relative aspect-square overflow-hidden">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {photo.caption && (
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="w-full px-3 py-3 text-sm text-white">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
