import Link from 'next/link'

import { Clue } from '@/components/Clue'
import { CopyButton } from '@/components/CopyButton'
import { CASES, CHECKLIST, QUICKSTART, REPO_URL } from '@/lib/site'
import { CHAPTERS } from '@/lib/workshop'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

// Real output of `detective check 2` with the test written and the fix in place.
const CLOSED = [
  'PASS  a small order with TENOFF costs 0, not less',
  'PASS  your test fails on the original bug',
  'PASS  your test passes on your fix',
]

export default function Home() {
  const minutes = CHAPTERS.reduce((sum, chapter) => sum + chapter.minutes, 0)
  const hours = Math.round((minutes / 60) * 2) / 2
  const slugOf = (number: string) => CHAPTERS.find((c) => c.number === number)?.slug ?? ''

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-28 px-4 pt-14 pb-28 sm:pt-20">
      {/* Hero */}
      <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex min-w-0 flex-col gap-6">
          <span className="rise inline-flex w-fit items-center gap-2 rounded-full bg-accent-wash px-3 py-1 text-[13px] font-medium text-accent-text">
            Free workshop · {CHAPTERS.length} cases · about {hours} hours
          </span>
          <h1
            className="rise font-display text-[3.4rem] leading-[0.95] tracking-[-0.035em] text-balance sm:text-7xl"
            style={delay(80)}
          >
            Debug like a <em className="text-gradient italic">detective.</em>
          </h1>
          <p className="rise max-w-xl text-[18px] leading-relaxed text-ink-2" style={delay(160)}>
            Eight real bugs are hiding in <strong className="text-ink">Crumbs</strong>, a tiny
            bakery app. Solve each one with a technique you will use for the rest of your career:
            tracebacks, failing tests, logging, the debugger, bisection, profiling and plain honest
            assumptions. Clue keeps score.
          </p>
          <div className="rise flex flex-wrap gap-3" style={delay(240)}>
            <Link
              href={`/workshop/${CHAPTERS[0]?.slug ?? ''}`}
              className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-canvas transition-transform hover:-translate-y-0.5"
            >
              Open case 01
            </Link>
            <a
              href={REPO_URL}
              className="glass inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium transition-transform hover:-translate-y-0.5"
            >
              View the code
            </a>
          </div>
        </div>

        <figure className="rise relative mx-auto w-full max-w-sm" style={delay(200)}>
          <div className="glass absolute top-2 -left-2 z-10 -rotate-3 rounded-card px-3 py-2 sm:-left-6">
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              Evidence #1
            </p>
            <code className="font-mono text-[13px] text-bug-text">
              KeyError: &apos;croissant &apos;
            </code>
          </div>
          <div className="glass rounded-panel p-6 pt-14">
            <Clue className="mx-auto w-full max-w-[16rem]" />
          </div>
          <figcaption className="glass-strong absolute -right-2 -bottom-4 rotate-2 rounded-card px-4 py-2.5 text-[13px] sm:-right-6">
            <span className="font-semibold">Clue</span>{' '}
            <span className="text-muted">· a ladybug, naturally</span>
          </figcaption>
        </figure>
      </section>

      {/* The cases */}
      <section id="cases" className="flex scroll-mt-24 flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="font-display text-5xl leading-none tracking-[-0.03em]">
            Eight <em className="text-gradient italic">open cases.</em>
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-2">
            Each case is a real bug you can run. Every symptom below is real output. Read the
            evidence, find the culprit, fix the code, and let the checker close the case.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {CASES.map((item) => (
            <li key={item.number} className="min-w-0">
              <Link
                href={`/workshop/${slugOf(item.number)}`}
                className="glass lift flex h-full min-w-0 flex-col gap-3 rounded-panel p-6"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-medium tracking-[0.14em] text-muted uppercase">
                    Case {item.number}
                  </span>
                  <span className="rounded-full bg-accent-wash px-2.5 py-0.5 text-[12px] font-medium text-accent-text">
                    {item.technique}
                  </span>
                </span>
                <span className="font-display text-[1.75rem] leading-tight tracking-[-0.02em]">
                  {item.title}
                </span>
                <code className="mt-auto overflow-x-auto rounded-xl bg-bug-wash px-3 py-2 font-mono text-[12.5px] whitespace-pre text-bug-text">
                  {item.symptom}
                </code>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* How a case works */}
      <section className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-5xl leading-none tracking-[-0.03em]">
            Run it. Fix it. <em className="text-gradient italic">Close it.</em>
          </h2>
          <ol className="flex flex-col gap-3 text-[16px] text-ink-2">
            {[
              ['detective run 2', 'watch the bug happen'],
              ['your editor', 'find the culprit and fix it'],
              ['detective check 2', 'real checks say PASS'],
            ].map(([command, what], index) => (
              <li key={command} className="flex items-baseline gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-medium text-canvas">
                  {index + 1}
                </span>
                <span>
                  <code className="font-mono text-[14px] text-ink">{command}</code>{' '}
                  <span className="text-muted">{what}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="text-[15px] leading-relaxed text-muted">
            Case 02 goes further: the checker runs your own test against the original bug, to prove
            your test would have caught it.
          </p>
        </div>
        <div className="code overflow-x-auto rounded-panel p-6 text-[13px] leading-[1.8] shadow-[var(--shadow-lift)]">
          <p className="text-[#a8a398]">$ uv run python -m detective check 2</p>
          {CLOSED.map((line) => (
            <p key={line} className="whitespace-pre">
              <span className="text-[#86efac]">{line.slice(0, 4)}</span>
              {line.slice(4)}
            </p>
          ))}
          <p className="mt-3 whitespace-pre text-[#c4b5fd]">
            {'  _/\\_\n (o.o)  Case 2 closed. Elementary.\n  (Y)'}
          </p>
        </div>
      </section>

      {/* The checklist */}
      <section className="glass flex flex-col gap-6 rounded-panel p-7 sm:p-10">
        <h2 className="font-display text-5xl leading-none tracking-[-0.03em]">
          The detective&apos;s <em className="text-gradient italic">checklist.</em>
        </h2>
        <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKLIST.map((step, index) => (
            <li key={step} className="flex items-baseline gap-3 text-[15.5px]">
              <span className="font-display text-2xl text-accent-text italic">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Quick start */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display text-5xl leading-none tracking-[-0.03em]">
          Start in a <em className="text-gradient italic">minute.</em>
        </h2>
        <p className="text-[16px] text-ink-2">
          You need{' '}
          <a
            href="https://docs.astral.sh/uv/"
            className="text-accent-text underline underline-offset-4"
          >
            uv
          </a>{' '}
          and git. The lab uses the Python standard library only.
        </p>
        <div className="code relative max-w-2xl overflow-x-auto rounded-panel px-6 pt-12 pb-6 text-[13.5px] leading-relaxed">
          <div className="absolute top-3 right-3">
            <CopyButton text={QUICKSTART} />
          </div>
          <pre>{QUICKSTART}</pre>
        </div>
      </section>
    </div>
  )
}
