# Profile, don't guess

> "It's slow" is a bug too. Your guess about why is usually wrong. A profiler tells you exactly where the time goes, in one command.

**Time:** 15 minutes

## Goal

Measure a slow function, profile it with `cProfile`, find the one line that costs almost everything, and fix it.

## The scene of the crime

```bash
uv run python -m detective run 7
```

```text
2199 regulars in 4.64 s
```

Nearly five seconds to find the customers who ordered five times or more, from 20,000 orders. Your laptop's number will differ; the shape will not.

## Profile it

Python ships with a profiler. Run the case under it and sort by the time spent inside each function:

```bash
uv run python -m cProfile -s tottime -m detective run 7
```

```text
   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    20000    4.397    0.000    4.397    0.000 {method 'count' of 'list' objects}
        1    0.194    0.194    4.591    4.591 case07_profile.py:16(regulars)
```

Read it like this:

- `ncalls`: how many times it ran. 20,000: once per order.
- `tottime`: time inside that function itself. 4.4 of 4.6 seconds.
- `cumtime`: time including everything it called.

`list.count` walks the whole list each time it is called. Calling it once per order means 20,000 walks of 20,000 items: 400 million comparisons. The code looked innocent; the numbers do not lie.

## Fix the hot spot, nothing else

Count everything in one pass instead, with `collections.Counter`, and keep the names whose count is high enough. Do not tune anything the profile did not point at.

## Check it works

```bash
uv run python -m detective check 7
```

- The same regulars as before, in under 0.2 seconds. The fix is usually hundreds of times faster.

## Exercise

Double the orders to 40,000 in `year_of_orders` and time the original and your fix. The original takes about four times longer; yours about twice. That difference is what "O(n²)" and "O(n)" mean in practice.

### More to try

- Sort the same profile by `cumtime` instead. Which view helps you find the slow **caller**, and which the slow **callee**?
- `time.perf_counter()` around a block is the quickest profiler of all. When is it enough?
