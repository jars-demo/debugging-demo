// Facts shown on the site. Every symptom is real output from `uv run python -m detective run N`.

export const REPO_URL = 'https://github.com/jars-demo/debugging-demo'

export type Case = {
  number: string
  title: string
  technique: string
  symptom: string
}

export const CASES: readonly Case[] = [
  {
    number: '01',
    title: 'The missing croissant',
    technique: 'Read the traceback',
    symptom: "KeyError: 'croissant '",
  },
  {
    number: '02',
    title: 'The customer who was paid to eat',
    technique: 'Reproduce it first',
    symptom: '680 cents with TENOFF: pay -320 cents',
  },
  {
    number: '03',
    title: 'The points that keep growing',
    technique: 'Print, then log',
    symptom: 'receipt 3: 3 lines, 324 points',
  },
  {
    number: '04',
    title: 'The first page of reviews',
    technique: 'breakpoint() and pdb',
    symptom: 'page 1: review 11 ... 10 reviews',
  },
  {
    number: '05',
    title: 'One bad row in two thousand',
    technique: 'Divide and conquer',
    symptom: "ValueError: invalid literal for int() with base 10: 'l2'",
  },
  {
    number: '06',
    title: 'The croissant that followed someone home',
    technique: 'Heisenbugs',
    symptom: "customer B: ['croissant', 'baguette']",
  },
  {
    number: '07',
    title: 'The slow regulars report',
    technique: "Profile, don't guess",
    symptom: '2199 regulars in 4.64 s',
  },
  {
    number: '08',
    title: 'The missing cent',
    technique: 'Assumptions lie',
    symptom: '1000 cents for 3: [333, 333, 333] -> adds up to 999',
  },
]

export const CHECKLIST = [
  'Read the error, last line first',
  'Reproduce it as a failing test',
  'Watch the values: print, then log',
  'Stop and step with breakpoint()',
  'Halve the search space',
  'Suspect shared state, time and order',
  'Measure before you optimise',
  'Write your assumptions down',
  'Explain it out loud',
]

export const QUICKSTART = `git clone https://github.com/jars-demo/debugging-demo.git
cd debugging-demo/lab
uv sync
uv run python -m detective run 1`
