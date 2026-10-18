import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { headingsOf, slugify } from '@/components/Markdown'
import { CASES } from '@/lib/site'
import { CHAPTERS, findChapter } from '@/lib/workshop'

const ROOT = path.join(process.cwd(), '..')
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), 'utf8')

// Files the learner creates during a case, so they are not in the repository yet.
const WRITTEN_BY_YOU = new Set(['lab/cases/test_case02.py'])

describe('chapters', () => {
  it('has eight chapters numbered in order', () => {
    expect(CHAPTERS.map((chapter) => Number(chapter.number))).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  it.each(CHAPTERS.map((chapter) => [chapter.slug, chapter] as const))(
    '%s has a summary, a time, the standard sections and its own case',
    (_slug, chapter) => {
      expect(chapter.summary.length).toBeGreaterThan(10)
      expect(chapter.minutes).toBeGreaterThan(0)
      expect(chapter.body).toMatch(/^## Goal$/m)
      expect(chapter.body).toMatch(/^## Check it works$/m)
      expect(chapter.body).toMatch(/^## Exercise$/m)
      expect(chapter.body).toContain(`detective run ${Number(chapter.number)}`)
    },
  )

  it('only mentions files that exist, or that you write', () => {
    const mentioned = new Set(
      CHAPTERS.flatMap((chapter) =>
        [...chapter.body.matchAll(/`(lab\/[\w./-]+\.\w+)`/g)].map((m) => m[1] ?? ''),
      ),
    )
    expect(mentioned.size).toBeGreaterThan(5)
    for (const file of mentioned) {
      if (WRITTEN_BY_YOU.has(file)) continue
      expect(fs.existsSync(path.join(ROOT, file)), `${file} is missing`).toBe(true)
    }
  })

  it('quotes code exactly as it is in the cases', () => {
    expect(findChapter('03-print-then-log')?.body).toContain(
      'log = logging.getLogger("crumbs.points")',
    )
    expect(read('lab/cases/case03_logging.py')).toContain(
      'log = logging.getLogger("crumbs.points")',
    )
    expect(read('lab/cases/case01_traceback.py')).toContain('    return MENU[item.lower()]')
    expect(findChapter('01-read-the-traceback')?.body).toContain('    return MENU[item.lower()]')
  })
})

describe('the evidence board', () => {
  it('has one case per chapter, titled as the lab titles it', () => {
    const cli = read('lab/detective/__main__.py')
    expect(CASES.map((item) => item.number)).toEqual(CHAPTERS.map((chapter) => chapter.number))
    for (const item of CASES) {
      expect(cli).toContain(`"${item.title}"`)
    }
  })

  it('links headings by a stable slug', () => {
    expect(slugify("Profile, don't guess")).toBe('profile-dont-guess')
    expect(
      headingsOf('## Goal\n```\n## not a heading\n```\n## Check it works').map((h) => h.id),
    ).toEqual(['goal', 'check-it-works'])
  })
})
