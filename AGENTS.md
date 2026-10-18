# AGENTS.md

Guidance for AI coding agents and developers. Humans: start with [README.md](README.md).

## What this is

"Debug like a detective": eight cases, each a real bug in a tiny bakery app, each teaching one
debugging technique. `lab/` holds the cases and the checker; `workshop/` the chapters;
`frontend/` the site.

## Map

```text
lab/cases/caseNN_*.py     one deliberate bug each; run() shows the symptom
lab/cases/data/orders.csv 2,000 rows, one bad quantity on line 1337 (case 05)
lab/detective/checks.py   check_NN(module) -> [(label, ok)]; check_02 runs the learner's test
lab/detective/__main__.py CLI: list, run, check, hint; case titles live here
lab/tests/                each case fails as shipped and passes with tests/solutions/
frontend/src/lib/site.ts  the evidence board: every symptom is real `detective run` output
```

## Commands

```bash
cd lab && uv sync && uv run pytest && uv run ruff check .
cd frontend && npm ci && npm run verify
```

## Rules

1. **The bugs are the product.** Never fix a bug in `lab/cases/`. Change a case, update its
   check and its solution together, and keep `test_case_is_open_as_shipped` passing.
2. **Standard library only** in `lab/`.
3. **Every symptom is real.** Output in chapters and on the site comes from real runs.
4. **Writing style.** Plain English, short sentences, no em dashes. Conventional Commits, no AI
   attribution trailers.
