# Heisenbugs

> Some bugs depend on what ran before: the order of calls, the time of day, shared state. They vanish when you look closely. Find what is shared, and the ghost becomes an ordinary bug.

**Time:** 12 minutes

## Goal

Explain a bug that only appears on the second call, and learn the usual suspects for bugs that come and go.

## The scene of the crime

```bash
uv run python -m detective run 6
```

```text
customer A: ['croissant', 'baguette']
customer B: ['croissant', 'baguette']
```

Two customers, two new baskets, one shared list. If you test `new_basket` once, it works. Only the second call shows the bug, which is why it passes on its own and fails in a long day of real use.

## Prove what is shared

Add this to `run()` in `lab/cases/case06_heisenbug.py`:

```python
print(id(a), id(b), a is b)
```

Same id, and `a is b` is `True`: both names point at one list. Where did a single list come from?

## The default made once

A default value is created **once**, when Python reads the `def` line, not each time the function is called. A default list is therefore one list, shared by every call that does not pass its own. The fix is a classic: default to `None`, and make a fresh list inside the function.

## The usual suspects

When a bug comes and goes, check these first:

| Suspect              | Example                                               |
| -------------------- | ----------------------------------------------------- |
| shared mutable state | default lists and dicts, module-level caches, globals |
| order of calls       | tests that pass alone and fail together               |
| time                 | "today", time zones, a test that fails at midnight    |
| randomness           | an unseeded random choice, a set's iteration order    |
| the environment      | a different OS, locale, Python version or config file |

To catch one, make it stable first: fix the seed, freeze the time, run the tests in the same order. A bug you can make happen every time is no longer a ghost.

## Check it works

```bash
uv run python -m detective check 6
```

- Each new basket holds only its own item, and passing a basket in still works.

## Exercise

Write a function with a default dict, `def count_visit(name, visits={})`, and show that visits add up across calls that should be separate. Then fix it the same way.

### More to try

- Turn on the `B006` rule in ruff (`uv run ruff check --select B006 cases/`), which flags mutable defaults before they bite. The case file silences it on purpose: find the comment.
- Find a test in your own code that uses today's date. What happens if you run it on the 29th of February?
