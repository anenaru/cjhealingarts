import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, Globe } from 'lucide-react'
import { SiteSidebar } from '@/components/site-sidebar'
import { SiteFooter } from '@/components/site-footer'
import { getAllInsightPosts, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'News & Resources | CJ Healing Arts',
  description:
    'Empowering tools, community highlights, and resources for individuals navigating career growth, independent living, and wellness.',
}

export const revalidate = 60

export default async function NewsPage() {
  let posts: Array<{
    slug: string
    title: string
    author: string
    date: string
    imageUrl: string
    excerpt: string
  }> = []

  try {
    const sanityPosts = await getAllInsightPosts()
    if (sanityPosts && sanityPosts.length > 0) {
      posts = sanityPosts.map((p) => ({
        slug: p.slug.current,
        title: p.title,
        author: p.author,
        date: new Date(p.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        imageUrl: p.image ? urlFor(p.image).width(640).height(427).url() : '',
        excerpt: p.excerpt,
      }))
    }
  } catch {
    // Sanity fetch failed
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteSidebar />
      <main className="lg:ml-64">
        <section className="px-6 py-14 sm:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              News &amp; Resources
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Empowering tools, community highlights, and resources for
              individuals navigating career growth, independent living, and
              wellness.
            </p>
          </div>

          <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-14 md:mt-20 md:gap-20">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No posts yet. Check back soon.
              </p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.slug}
                  className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
                >
                  <Link
                    href={`/insights/${post.slug}`}
                    className="block overflow-hidden rounded-xl"
                  >
                    <Image
                      src={post.imageUrl || '/placeholder.svg'}
                      alt={post.title}
                      width={640}
                      height={420}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div>
                    <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                      <Link
                        href={`/insights/${post.slug}`}
                        className="transition-colors hover:text-muted-foreground"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                      {post.author} &middot; {post.date}
                    </p>
                    <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/insights/${post.slug}`}
                      className="mt-6 inline-flex items-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Read more
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="mx-auto mt-20 flex max-w-5xl flex-wrap items-center justify-center gap-8 border-t border-border pt-10">
            <a
              href="mailto:cjhealingart1999@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              cjhealingart1999@gmail.com
            </a>
            <a
              href="tel:+17543683864"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-5 w-5" />
              (754) 368-3864
            </a>
            <a
              href="https://cjhealingarts.org"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-5 w-5" />
              cjhealingarts.org
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
