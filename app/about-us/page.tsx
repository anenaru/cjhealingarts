import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail, Phone, Globe } from 'lucide-react'
import { SiteSidebar } from '@/components/site-sidebar'

export const metadata: Metadata = {
  title: 'About Us | CJ Healing Arts',
  description:
    'Meet the CJ Healing Arts Board of Directors and our Emotional Support Champion, working together to bridge ability with opportunity.',
}

type Member = {
  name: string
  role: string
  image: string
}

const members: Member[] = [
  {
    name: 'Michelle Jones',
    role: 'Founder and CEO',
    image: '/team/portrait1.png',
  },
  {
    name: 'Blue',
    role: 'Support Champion',
    image: '/team/portrait2.png',
  },
  {
    name: 'Dr. Emanuel Hunter',
    role: 'President, Employment Specialist',
    image: '/team/portrait3.png',
  },
  {
    name: 'Brandon Swaby',
    role: 'Board Member',
    image: '/team/portrait4.jpg',
  },
  {
    name: 'Sylvia Troyer',
    role: 'Board Secretary',
    image: '/team/portrait5.png',
  },
  {
    name: 'Judge Phoebee Francois',
    role: 'Board Member',
    image: '/team/portait6.jpg',
  },
  {
    name: 'Edinisa Lopez',
    role: 'Board Member',
    image: '/team/portrait7.png',
  },
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteSidebar />
      <main className="lg:ml-64">
        <section className="px-6 py-14 sm:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Our Board of Directors &amp; Emotional Support Champion
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              The dedicated people behind CJ Healing Arts share a common belief:
              the world needs contributions from people of all abilities. Meet
              the team guiding our mission to bridge ability with opportunity.
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
            {members.map((member) => (
              <li
                key={member.image}
                className="flex flex-col items-center text-center"
              >
                <div className="h-48 w-48 overflow-hidden rounded-full ring-4 ring-border md:h-52 md:w-52">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={`Portrait of ${member.name}`}
                    width={416}
                    height={416}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-6 text-xl font-semibold tracking-tight">
                  {member.name}
                </h2>
                <p className="mt-1 text-pretty text-muted-foreground">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>

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
      </main>
    </div>
  )
}
