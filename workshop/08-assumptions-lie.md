# Assumptions lie

> The hardest bugs live in what you were sure of. Write your assumptions down as checks, let the code tell you which one is false, and close the case with a checklist for next time.

**Time:** 15 minutes

## Goal

Turn an assumption into an assertion, fix a lost-cent bug, and leave with a debugging checklist.

## The scene of the crime

```bash
uv run python -m detective run 8
```

```text
1200 cents for 3: [400, 400, 400] -> adds up to 1200
1000 cents for 3: [333, 333, 333] -> adds up to 999
1001 cents for 4: [250, 250, 250, 250] -> adds up to 1000
```

Ten euros split three ways comes to 9.99. Somebody assumed the shares always add up to the bill.

## Write the assumption down

Every function has rules that must always be true. Write them as code:

```python
assert sum(shares) == total_cents, (shares, total_cents)
```

Now the program stops at the exact moment the assumption breaks, with the values that broke it, instead of quietly losing a cent a thousand times a day. Assertions are for things that should be impossible; for bad user input, raise a proper error instead.

## Fix the arithmetic

Cents do not split evenly, so somebody pays one cent more. Work in whole cents: give everyone `total // people`, then hand the remainder out one cent at a time. `divmod(total, people)` gives you both numbers at once. Never use floats for money: `0.1 + 0.2` is `0.30000000000000004` in Python, and in every language that uses the same kind of number.

## The detective's checklist

What the eight cases taught, in the order to try it:

1. **Read the error.** Last line first, then the frames. (Case 01)
2. **Reproduce it** with the smallest input, as a failing test. (Case 02)
3. **Watch the values** with print, then logging. (Case 03)
4. **Stop and step** with `breakpoint()`. (Case 04)
5. **Halve the search space:** input, commits, config. (Case 05)
6. **Suspect shared state, time and order** when it comes and goes. (Case 06)
7. **Measure** before you optimise. (Case 07)
8. **Write your assumptions down** as checks. (Case 08)
9. **Explain it out loud**, to a colleague or a rubber duck. Half the time you find it mid-sentence.

## Check it works

```bash
uv run python -m detective check 8
uv run python -m detective list
```

- The shares always add up, differ by one cent at most, and nobody pays a negative amount.
- `list` shows every case you solved. Eight of eight: Clue is proud of you.

## Exercise

Find one function in your own code with an unwritten rule (a list that should be sorted, a total that should match, an id that should be unique). Add the assertion. Run your tests. Did the rule hold?

### More to try

- Look up `decimal.Decimal`. When would you use it instead of whole cents?
- Teach one case to someone else in five minutes. Explaining a bug is the best test of whether you understood it.
