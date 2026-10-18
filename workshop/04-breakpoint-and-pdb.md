# breakpoint() and pdb

> Stop the program in the middle, look around, and step forward one line at a time. A debugger turns guessing into watching.

**Time:** 15 minutes

## Goal

Pause a running program with `breakpoint()`, inspect variables, step through code, and find an off-by-one bug.

## The scene of the crime

```bash
uv run python -m detective run 4
```

```text
page 1: review 11 ... 10 reviews
page 2: review 21 ... 5 reviews
page 3: (empty) ... 0 reviews
```

Page 1 starts at review 11. The first ten reviews never show.

## Stop the world

Add one line at the top of `page()` in `lab/cases/case04_pdb.py`:

```python
def page(items: list[str], number: int, size: int = 10) -> list[str]:
    """Page `number` of `items`, counting pages from 1."""
    breakpoint()
    start = number * size
```

Run the case again. The program stops and hands you a `(Pdb)` prompt. A real session:

```text
-> breakpoint()
(Pdb) p number, size
(1, 10)
(Pdb) n
-> start = number * size
(Pdb) n
-> return items[start : start + size]
(Pdb) p start
10
(Pdb) p items[start]
'review 11'
```

Page 1, size 10, start 10. There is the bug, caught in the act.

## The commands you need

| Command  | What it does                                 |
| -------- | -------------------------------------------- |
| `p expr` | print any expression                         |
| `n`      | next line, stepping over function calls      |
| `s`      | step into the function call on this line     |
| `l`      | list the code around where you are           |
| `w`      | where am I: the call stack, like a traceback |
| `c`      | continue until the next breakpoint           |
| `q`      | quit the program                             |

Remove the `breakpoint()` line when you are done. Then fix the start index, remembering that pages count from 1 and lists count from 0.

## Check it works

```bash
uv run python -m detective check 4
```

- Page 1 starts at review 1, page 3 has reviews 21 to 25, and page 4 is empty.

## Exercise

Set a breakpoint that only fires when it matters: `if number == 3: breakpoint()`. Run the case and check that you only stop once. Conditional breakpoints save hours in long loops.

### More to try

- Debug without editing the code at all: `uv run python -m pdb -m detective run 4`, then `b cases/case04_pdb.py:13` to set a breakpoint on line 13, and `c` to run until it.
- Your editor has the same debugger with buttons. Find "Run and Debug" in VS Code and set a breakpoint by clicking beside a line number.
