import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CopyButton } from '@/components/CopyButton'
import { Markdown } from '@/components/Markdown'
import { CASES } from '@/lib/site'
import { CHAPTERS, findChapter } from '@/lib/workshop'

export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ slug: chapter.slug }))
}

export async function generateMetadata(props: PageProps<'/workshop/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const chapter = findChapter(slug)
  return { title: chapter ? `${chapter.number}. ${chapter.title}` : 'Chapter' }
}

export default async function ChapterPage(props: PageProps<'/workshop/[slug]'>) {
  const { slug } = await props.params
  const chapter = findChapter(slug)
  if (!chapter) notFound()
  const index = CHAPTERS.indexOf(chapter)
  const previous = CHAPTERS[index - 1]
  const next = CHAPTERS[index + 1]
  const item = CASES.find((c) => c.number === chapter.number)
  const n = Number(chapter.number)
  const commands = `uv run python -m detective run ${n}\nuv run python -m detective check ${n}\nuv run python -m detective hint ${n}`

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-28">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link href="/workshop" className="hover:text-ink">
          Workshop
        </Link>{' '}
        / Case {chapter.number}
      </nav>
      <header className="rise mb-10 flex flex-col gap-4">
        <span className="text-[12px] font-medium tracking-[0.16em] text-muted uppercase">
          Case {chapter.number} · {chapter.minutes} minutes
        </span>
        <h1 className="font-display text-5xl leading-none tracking-[-0.03em] text-balance sm:text-6xl">
          {chapter.title}
        </h1>
        <p className="text-[17px] leading-relaxed text-ink-2">{chapter.summary}</p>
        {item ? (
          <div className="glass flex flex-wrap items-center gap-3 rounded-card px-4 py-3">
            <span className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              The evidence
            </span>
            <code className="min-w-0 overflow-x-auto rounded-lg bg-bug-wash px-2 py-1 font-mono text-[13px] whitespace-pre text-bug-text">
              {item.symptom}
            </code>
          </div>
        ) : null}
      </header>

      <div className="prose-workshop">
        <Markdown>{chapter.body}</Markdown>
      </div>

      <section
        aria-labelledby="case-commands"
        className="glass mt-14 flex flex-col gap-4 rounded-panel p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="case-commands" className="font-display text-3xl leading-none tracking-[-0.02em]">
            Case {chapter.number}, <em className="text-gradient italic">at a glance</em>
          </h2>
          <CopyButton text={commands} tone="light" />
        </div>
        <pre className="code overflow-x-auto rounded-card px-5 py-4 text-[13px] leading-relaxed">
          {commands}
        </pre>
        <p className="text-[14px] text-muted">
          Run it from <code className="font-mono text-ink-2">lab/</code>. When check says PASS on
          every line, the case is closed.
        </p>
      </section>

      <nav aria-label="Chapters" className="mt-10 grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/workshop/${previous.slug}`}
            className="glass lift flex flex-col gap-1 rounded-panel p-5"
          >
            <span className="text-[13px] text-muted">Previous</span>
            <span className="font-semibold">
              {previous.number}. {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/workshop/${next.slug}`}
            className="glass lift flex flex-col gap-1 rounded-panel p-5 text-right"
          >
            <span className="text-[13px] text-muted">Next</span>
            <span className="font-semibold">
              {next.number}. {next.title}
            </span>
          </Link>
        ) : (
          <Link href="/" className="glass lift flex flex-col gap-1 rounded-panel p-5 text-right">
            <span className="text-[13px] text-muted">All cases closed</span>
            <span className="font-semibold">Back to the evidence board</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
