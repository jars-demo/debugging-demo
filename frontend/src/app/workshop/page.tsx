import type { Metadata } from 'next'
import Link from 'next/link'

import { CASES } from '@/lib/site'
import { CHAPTERS } from '@/lib/workshop'

export const metadata: Metadata = { title: 'Workshop' }

export default function Workshop() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 pt-16 pb-28">
      <header className="rise flex flex-col gap-4">
        <span className="text-[12px] font-medium tracking-[0.16em] text-muted uppercase">
          The case files
        </span>
        <h1 className="font-display text-6xl leading-none tracking-[-0.03em]">
          The <em className="text-gradient italic">workshop.</em>
        </h1>
        <p className="text-[17px] leading-relaxed text-ink-2">
          Eight cases, one technique each. Work through them in order; each ends with a check that
          tells you the case is closed.
        </p>
      </header>
      <ol className="flex flex-col gap-3">
        {CHAPTERS.map((chapter) => {
          const item = CASES.find((c) => c.number === chapter.number)
          return (
            <li key={chapter.slug}>
              <Link
                href={`/workshop/${chapter.slug}`}
                className="glass lift flex items-center gap-5 rounded-panel px-5 py-4"
              >
                <span className="font-display text-4xl text-accent-text italic">
                  {chapter.number}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[17px] font-semibold">{chapter.title}</span>
                  <span className="truncate text-[14px] text-muted">{item?.title}</span>
                </span>
                <span className="shrink-0 text-[13px] text-muted">{chapter.minutes} min</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
