# Reproduce it first

> Before you fix a bug, make it happen on demand. A failing test is the most reliable witness you will ever have.

**Time:** 15 minutes

## Goal

Turn a bug report into a test that fails, fix the code, and watch the same test pass.

## Why first

A bug you cannot reproduce is a bug you cannot prove you fixed. Writing the test first gives you three things:

- **Proof the bug exists**, in a form anyone can run.
- **Proof your fix works**, because the same test turns green.
- **A guard forever**, so the bug cannot quietly come back.

The test must fail before the fix. A test that passes on broken code tests nothing.

## The scene of the crime

```bash
uv run python -m detective run 2
```

```text
2500 cents with HALF: pay 1250 cents
2500 cents with TENOFF: pay 1500 cents
680 cents with TENOFF: pay -320 cents
```

A customer bought a 6.80 coffee and cake, used the code `TENOFF`, and the till owed them 3.20.

## Write the witness

Create `lab/cases/test_case02.py` with a test that states what should happen:

```python
from cases.case02_reproduce import apply_discount


def test_a_discount_never_makes_the_price_negative():
    assert apply_discount(680, "TENOFF") == 0
```

Now check, **before** fixing anything:

```bash
uv run python -m detective check 2
```

```text
  TODO  a small order with TENOFF costs 0, not less
  PASS  TENOFF still takes 10 euros off a big order
  PASS  HALF still halves
  PASS  you wrote cases/test_case02.py
  PASS  your test fails on the original bug
  TODO  your test passes on your fix
```

The checker runs your test against the original code and confirms it fails. That is a real witness. Now fix `apply_discount`, and run the check again.

## Make the smallest reproduction

Real bug reports are long: "on Tuesday, after logging in with a voucher, the checkout page showed a negative total". The skill is cutting it down to the smallest input that still fails. Here, that is one function call with two arguments. Every detail you can remove is a detail you no longer have to think about.

## Check it works

- `uv run python -m detective check 2` shows six `PASS` lines.
- Your test file is the first thing someone will read if this bug ever returns.

## Exercise

Add a second test for an edge you can think of: a total of exactly 1,000 cents, or no code at all. Does it pass? Should it?

### More to try

- The lab already has pytest. Run your test with `uv run pytest cases/test_case02.py` before and after the fix, and read how pytest shows the failing values.
- Name your tests as sentences about behaviour, like the one above. Which is clearer six months from now: `test_discount_2` or this one?
