import Link from 'next/link'

import { REPO_URL } from '@/lib/site'

import { BackToTop } from './BackToTop'
import { LogoMark } from './Clue'

// Navigation and footer, shared by every page.

const NAV = [
  { href: '/#cases', label: 'The cases' },
  { href: '/workshop', label: 'Workshop' },
]

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-3 z-30 px-3 sm:top-4 sm:px-4">
        <nav
          aria-label="Main"
          className="glass-strong mx-auto flex h-13 max-w-5xl items-center justify-between gap-2 rounded-full pr-2 pl-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full text-[17px] font-semibold tracking-[-0.02em]"
          >
            <LogoMark />
            <span className="hidden sm:inline">Debug like a detective</span>
          </Link>
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={REPO_URL}
                className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="mx-auto w-full max-w-5xl px-4 pb-10">
        <div className="flex flex-col gap-2 border-t border-hairline pt-6 text-[13px] text-muted sm:flex-row sm:justify-between">
          <span>Debug like a detective · MIT licensed</span>
          <a href={REPO_URL} className="hover:text-ink">
            GitHub
          </a>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
