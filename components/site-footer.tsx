import Image from 'next/image'

export function SiteFooter() {
  return (
    <footer id="contact" className="px-6 py-14 sm:px-10 md:py-20 lg:px-16">
      <div className="flex flex-wrap items-center gap-8">
        <Image
          src="/logo.png"
          alt="CJ Healing Arts logo"
          width={72}
          height={72}
          className="h-16 w-16 object-contain"
        />
        <Image
          src="/vr-logo.jpg"
          alt="Florida Department of Education and Vocational Rehabilitation logos"
          width={280}
          height={90}
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-10">
        <a
          href="/contact-us"
          className="text-sm tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          Contact Us
        </a>
        <a
          href="#home"
          className="text-sm tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          Back to the top
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Legal
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} CJ Healing Arts. All Rights Reserved`}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <p className="text-right text-sm text-muted-foreground">
          CJ Healing Arts is a Vocational Rehab Provider
          <br />
          #F814615794001
        </p>
      </div>
    </footer>
  )
}
