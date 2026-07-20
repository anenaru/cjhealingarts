import { PortableText as SanityPortableText } from 'next-sanity'
import type { PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Standard: youtube.com/watch?v=ID
    if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v')
    }
    // Short: youtu.be/ID
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1)
    }
    // Embed: youtube.com/embed/ID
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/)
    if (embedMatch) return embedMatch[1]
  } catch {
    // invalid URL
  }
  return null
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-pretty text-lg leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-2 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border pl-5 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlFor(value).width(768).url()
      return (
        <figure className="my-2">
          <Image
            src={imageUrl}
            alt={value.alt ?? ''}
            width={768}
            height={512}
            className="w-full rounded-xl object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    youtube: ({ value }) => {
      const id = value?.url ? getYouTubeId(value.url) : null
      if (!id) return null
      return (
        <figure className="my-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${id}`}
              title={value.caption ?? 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="underline underline-offset-4 transition-colors hover:text-muted-foreground"
      >
        {children}
      </a>
    ),
  },
}

export function PortableText({ value }: { value: unknown[] }) {
  return (
    <div className="flex flex-col gap-6">
      <SanityPortableText value={value} components={components} />
    </div>
  )
}
