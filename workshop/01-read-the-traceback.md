# Read the traceback

> A traceback is not an insult. It is a signed confession: what went wrong, where, and how the code got there. Learn to read one in ten seconds.

**Time:** 12 minutes

## Goal

Set up the lab, meet Clue and the cases, and solve the first one using nothing but the traceback.

## Set up

You need [uv](https://docs.astral.sh/uv/) and git. uv installs Python for you, and the lab uses the standard library only.

```bash
git clone https://github.com/jars-demo/debugging-demo.git
cd debugging-demo/lab
uv sync
uv run python -m detective list
```

There are eight cases, each one a real bug in **Crumbs**, a tiny bakery app. You run a case to see the bug, fix the code in `lab/cases/`, and check your fix. Clue the ladybug keeps score. If you want to start a case over, `git restore cases/` puts every case back.

## The scene of the crime

```bash
uv run python -m detective run 1
```

The till crashes on a normal order. The end of the output:

```text
  File ".../lab/cases/case01_traceback.py", line 25, in order_total
    return sum(line_total(line) for line in lines)
  File ".../lab/cases/case01_traceback.py", line 21, in line_total
    return price_of(name) * int(qty)
           ~~~~~~~~^^^^^^
  File ".../lab/cases/case01_traceback.py", line 16, in price_of
    return MENU[item.lower()]
           ~~~~^^^^^^^^^^^^^^
KeyError: 'croissant '
```

## How to read it

1. **Start at the bottom.** The last line says what happened: a `KeyError`, and the key that was missing.
2. **Read the value like a detective.** Python shows the key with `repr`, quotes and all. Look at every character inside the quotes.
3. **Walk up the frames.** Each frame is one function call, oldest at the top, newest at the bottom. The bottom frame is where it crashed; the frames above show who called it with what.
4. **Find the first frame in your own code.** Frames inside libraries or Python itself are rarely where the bug is. Here, every frame from `run` down is ours.
5. **Read the `~~~^^^` markers.** Since Python 3.11, they point at the exact part of the line that failed.

The bug is not where it crashed. `price_of` did its job; it was handed a bad name. The question becomes: which frame **made** the bad value?

## Check it works

Fix `line_total` in `lab/cases/case01_traceback.py`, then:

```bash
uv run python -m detective check 1
```

Three `PASS` lines, and Clue declares the case closed. One check uses an item with an `x` in its name: make sure your fix survives a box of eclairs.

## Exercise

Break something on purpose: change `MENU` to `MENUS` in `price_of`, run the case, and read the new traceback from the bottom. Which line names the problem, and which frame points at it? Put it back with `git restore cases/case01_traceback.py`.

### More to try

- Add `raise ValueError("bad line") from error` around the split, and read the two tracebacks Python prints. What does "The above exception was the direct cause" tell you?
- Paste a traceback from your own work into this checklist: last line, the value, the first frame of your code, the frame that made the bad value.
