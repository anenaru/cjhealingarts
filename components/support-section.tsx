import Image from 'next/image'

export function SupportSection() {
  return (
    <section
      id="support"
      className="scroll-mt-4 border-b border-border px-6 py-14 sm:px-10 md:py-20 lg:px-16"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <h2 className="max-w-xs text-balance text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          Support Independence
        </h2>
        <div className="flex items-start md:justify-end">
          <div className="max-w-md space-y-5 text-pretty leading-relaxed text-muted-foreground">
            <p>
              CJ Healing Arts is a 501(c)(3) nonprofit organization. Your
              donation may be tax deductible according to IRS rules.
            </p>
            <p>
              Please send your gift via Zelle to{' '}
              <a
                href="tel:+17542342324"
                className="text-foreground transition-colors hover:text-muted-foreground"
              >
                (754)-234-2324
              </a>
              .
            </p>
            <p>
              Call{' '}
              <a
                href="tel:+17542342324"
                className="text-foreground transition-colors hover:text-muted-foreground"
              >
                (754)-234-2324
              </a>{' '}
              for any further inquiries.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-md overflow-hidden rounded-lg" id="insights">
        <Image
          src="/donate.png"
          alt="Donate to make a difference today — support CJ Healing Arts via Cash App or Zelle"
          width={1080}
          height={1080}
          className="h-auto w-full"
        />
      </div>
    </section>
  )
}
