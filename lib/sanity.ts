import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'a67qw9j5'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityInsightPost = {
  _id: string
  title: string
  slug: { current: string }
  author: string
  date: string
  image: SanityImageSource & { alt?: string }
  excerpt: string
  content: unknown[] // Portable Text blocks
}

// ─── Queries ──────────────────────────────────────────────────────────────────

const insightPostFields = /* groq */ `
  _id,
  title,
  slug,
  author,
  date,
  image { ..., alt },
  excerpt
`

export async function getAllInsightPosts(): Promise<SanityInsightPost[]> {
  return client.fetch(
    /* groq */ `*[_type == "insightPost"] | order(date desc) { ${insightPostFields} }`
  )
}

export async function getInsightPostBySlug(
  slug: string
): Promise<SanityInsightPost | null> {
  return client.fetch(
    /* groq */ `*[_type == "insightPost" && slug.current == $slug][0] {
      ${insightPostFields},
      content
    }`,
    { slug }
  )
}

export async function getAllInsightSlugs(): Promise<string[]> {
  const results: Array<{ slug: { current: string } }> = await client.fetch(
    /* groq */ `*[_type == "insightPost"]{ slug }`
  )
  return results.map((r) => r.slug.current)
}

export type SanityCommunityPhoto = {
  _id: string
  image: SanityImageSource & { alt?: string }
  caption?: string
  date: string
}

export async function getAllCommunityPhotos(): Promise<SanityCommunityPhoto[]> {
  return client.fetch(
    /* groq */ `*[_type == "communityPhoto"] | order(date desc) {
      _id,
      image { ..., alt },
      caption,
      date
    }`
  )
}
