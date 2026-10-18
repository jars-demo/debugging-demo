# Print, then log

> A print statement is a flashlight. Logging is the lighting in the whole building: levels, names and timestamps you can turn up and down without touching the code.

**Time:** 15 minutes

## Goal

Find a bug by watching values change between calls, first with `print`, then with the `logging` module.

## The scene of the crime

```bash
uv run python -m detective run 3
```

```text
receipt 1: 1 lines, 124 points
receipt 2: 2 lines, 224 points
receipt 3: 3 lines, 324 points
```

Printing a receipt should not change anything. Yet each copy has one more line and 100 more points.

## Look at what changes

Add a print inside `points_for` in `lab/cases/case03_logging.py`:

```python
print("points_for got", len(order), "lines:", order)
```

Run it again and read the lines in order. Something is adding to the customer's order. Prints are perfect for a quick look. Delete them before you commit.

## Upgrade to logging

The case file already has a logger named after where it lives:

```python
log = logging.getLogger("crumbs.points")
```

Use it instead of print:

```python
log.debug("points_for got %d lines", len(order))
```

Then turn it on, once, at the start of `run()`:

```python
logging.basicConfig(level=logging.DEBUG, format="%(levelname)s %(name)s %(message)s")
```

Why bother, when print works?

| Logging gives you | Why it matters                                                    |
| ----------------- | ----------------------------------------------------------------- |
| levels            | `debug` lines stay in the code, off in production, on when needed |
| names             | turn on `crumbs.points` only, not every library at once           |
| one switch        | change `level=` in one place instead of hunting prints            |
| structure         | timestamps, files and line numbers come free with the format      |

Pass values as arguments (`%d`, then `len(order)`) rather than building the string yourself: the string is only built if the line is actually shown.

## The real bug

`with_bonus` **appends** to the list it was given. That list is the customer's order, so every call changes it for good. A function that changes its input surprises everyone who calls it. Return a new list instead.

## Check it works

```bash
uv run python -m detective check 3
```

- Three receipts are identical, and the order still has one line.

## Exercise

Set the level to `logging.INFO` and run the case. Your debug line disappears without any code change. Then change only the `crumbs.points` logger: `logging.getLogger("crumbs.points").setLevel(logging.DEBUG)`. When would you want one noisy logger and the rest quiet?

### More to try

- Never log secrets, passwords or whole customer records. What would you log here instead of the full order?
- Try `logging.exception("...")` inside an `except` block. What does it add that `log.error` does not?
