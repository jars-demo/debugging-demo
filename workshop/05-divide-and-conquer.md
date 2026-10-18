# Divide and conquer

> When the haystack is huge, do not search it. Cut it in half, see which half still breaks, and repeat. Then make sure the next person never has to.

**Time:** 15 minutes

## Goal

Find one bad row among two thousand by halving the input, then change the import so it names bad rows instead of crashing.

## The scene of the crime

```bash
uv run python -m detective run 5
```

```text
    orders.append({"customer": row["customer"], "item": row["item"], "qty": int(row["qty"])})
                                                                            ~~~^^^^^^^^^^^^
ValueError: invalid literal for int() with base 10: 'l2'
```

The nightly import of `lab/cases/data/orders.csv` dies. The error says what, but not **where**: which of the 2,000 lines?

## Halve it

Pretend you cannot search for the value, which is often true: the bad thing is a missing field, a strange encoding or a value that only breaks in combination. Then:

1. Copy the file. Keep the header and the first half of the rows. Run the import on it.
2. Still fails? The bug is in this half. Passes? It is in the other half.
3. Repeat on the half that fails.

Two thousand rows take about eleven halvings, because 2 to the 11th is 2,048. The same idea finds a bad commit (`git bisect`), a bad config line, or the one test that breaks another.

Here a search does work: open the file and look for `l2`. You will find a lowercase L where a 1 should be, on line 1337.

## Make it never happen again

The real fix is not editing line 1337. Tomorrow's file will have a different bad line. Change `import_orders` so that:

- a bad row is **skipped**, not fatal
- each bad row adds a problem that **names its line**, like `line 1337: quantity 'l2' is not a number`
- every good row is still imported

`csv.DictReader` keeps the current line number in `reader.line_num`. Catch the `ValueError` for one row, record the problem, and continue.

## Check it works

```bash
uv run python -m detective check 5
```

- 1,999 good orders, exactly one problem, and it names line 1337.

## Exercise

Write a 10-line script that does the halving for you: take a list of rows and a function that says "fails or not", and return the smallest failing slice. Run it on the orders. This is a tiny version of delta debugging.

### More to try

- Good error messages save the next person the halving. Rewrite one error message in your own code so it says what was wrong, where, and what was expected.
- Should one bad row stop the whole import, or be skipped and reported? Who decides, and where would you write it down?
