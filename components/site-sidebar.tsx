'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/#home', index: '01' },
  { label: 'Services', href: '/#services', index: '02' },
  { label: 'Support Independence', href: '/#support', index: '03' },
  { label: 'News & Resources', href: '/insights', index: '04' },
  { label: 'Our Community', href: '/our-community', index: '05' },
  { label: 'About Us', href: '/about-us', index: '06' },
  { label: 'Contact Us', href: '/contact-us', index: '07' },
]

export function SiteSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <a href="/#home" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CJ Healing Arts logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="text-sm font-medium tracking-tight">
            CJ Healing Arts
          </span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {open && (
        <nav className="sticky top-[57px] z-30 border-b border-border bg-background px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-1 py-2 text-lg tracking-tight text-foreground"
                >
                  {item.label}
                  <sup className="text-[0.6rem] text-muted-foreground">
                    {item.index}
                  </sup>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Desktop fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-background px-8 py-8 lg:flex">
        <a href="/#home" className="mb-10 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="CJ Healing Arts logo"
            width={72}
            height={72}
            className="h-16 w-16 shrink-0 object-contain"
          />
          <span className="text-sm font-medium leading-snug tracking-tight">
            CJ Healing Arts
          </span>
        </a>

        <nav aria-label="Primary" className="border-t border-border pt-6">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-baseline gap-0.5 text-[0.95rem] tracking-tight text-foreground transition-colors hover:text-muted-foreground"
                >
                  {item.label}
                  <sup className="text-[0.55rem] text-muted-foreground">
                    {item.index}
                  </sup>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
