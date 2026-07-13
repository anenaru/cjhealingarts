import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteSidebar } from '@/components/site-sidebar'
import { SiteFooter } from '@/components/site-footer'
import { getInsightPostBySlug, getAllInsightSlugs, urlFor } from '@/lib/sanity'
import { PortableText } from '@/components/portable-text'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllInsightSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getInsightPostBySlug(slug)
    if (post) {
      return {
        title: `${post.title} | CJ Healing Arts`,
        description: post.excerpt,
      }
    }
  } catch {
    // fall through
  }
  return { title: 'News & Resources | CJ Healing Arts' }
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post: Awaited<ReturnType<typeof getInsightPostBySlug>> = null
  try {
    post = await getInsightPostBySlug(slug)
  } catch {
    // Sanity fetch failed
  }

  if (!post) notFound()

  const imageUrl = post.image
    ? urlFor(post.image).width(768).height(512).url()
    : null

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteSidebar />
      <main className="lg:ml-64">
        <article className="px-6 py-14 sm:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to News &amp; Resources
            </Link>

            <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {post.author} &middot; {formattedDate}
            </p>

            {imageUrl && (
              <Image
                src={imageUrl}
                alt={(post.image as { alt?: string })?.alt ?? post.title}
                width={768}
                height={512}
                className="mt-8 aspect-[3/2] w-full rounded-xl object-cover"
                priority
              />
            )}

            <div className="mt-10">
              <PortableText value={post.content as unknown[]} />
            </div>
          </div>
        </article>

        <SiteFooter />
      </main>
    </div>
  )
}
