# Debug like a detective

A playful, hands-on debugging workshop. Eight real bugs are hiding in **Crumbs**, a tiny bakery app. Solve each one with a technique every developer needs: reading tracebacks, reproducing with a failing test, logging, `breakpoint()` and pdb, divide and conquer, heisenbugs, profiling, and writing assumptions down. **Clue**, a ladybug detective, keeps score.

**Workshop site:** [debugging.jishanahmed.in](https://debugging.jishanahmed.in)

## Quick start

You need [uv](https://docs.astral.sh/uv/) and git. uv installs Python for you. The lab uses the Python standard library only.

```bash
git clone https://github.com/jars-demo/debugging-demo.git
cd debugging-demo/lab
uv sync
uv run python -m detective run 1
```

## How a case works

| Command                              | What it does                          |
| ------------------------------------ | ------------------------------------- |
| `uv run python -m detective list`    | every case, and which ones are solved |
| `uv run python -m detective run N`   | run case N and watch the bug happen   |
| `uv run python -m detective check N` | check your fix with real assertions   |
| `uv run python -m detective hint N`  | a nudge from Clue                     |

Fix the code in `lab/cases/`. Start a case over with `git restore cases/` from `lab/`.

## The cases

| #   | Chapter                                                   | The case                                 |
| --- | --------------------------------------------------------- | ---------------------------------------- |
| 01  | [Read the traceback](workshop/01-read-the-traceback.md)   | The missing croissant                    |
| 02  | [Reproduce it first](workshop/02-reproduce-it-first.md)   | The customer who was paid to eat         |
| 03  | [Print, then log](workshop/03-print-then-log.md)          | The points that keep growing             |
| 04  | [breakpoint() and pdb](workshop/04-breakpoint-and-pdb.md) | The first page of reviews                |
| 05  | [Divide and conquer](workshop/05-divide-and-conquer.md)   | One bad row in two thousand              |
| 06  | [Heisenbugs](workshop/06-heisenbugs.md)                   | The croissant that followed someone home |
| 07  | [Profile, don't guess](workshop/07-profile-dont-guess.md) | The slow regulars report                 |
| 08  | [Assumptions lie](workshop/08-assumptions-lie.md)         | The missing cent                         |

## Layout

```text
lab/cases/            the eight crime scenes: one real bug each, plus the orders data
lab/detective/        the CLI and the checks (case 02 also runs your test against the bug)
lab/tests/            every case fails as shipped and passes with the fix in tests/solutions/
workshop/             the chapters, in Markdown
frontend/             the workshop site (Next.js), which renders workshop/
```

Run the lab's tests with `cd lab && uv run pytest`. The solutions are in `lab/tests/solutions/`: peek only when truly stuck.

## Run the site locally

```bash
cd frontend
npm ci
npm run dev
```

## License

[MIT](LICENSE)
