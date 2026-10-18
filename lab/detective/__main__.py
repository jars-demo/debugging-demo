"""detective: eight bugs, one magnifying glass.

list        every case, and which ones are solved
run N       run case N and watch the bug happen
check N     check your fix
hint N      a nudge from Clue
"""

import argparse
import importlib
import sys

from detective.checks import CHECKS

CASES = {
    1: ("case01_traceback", "The missing croissant"),
    2: ("case02_reproduce", "The customer who was paid to eat"),
    3: ("case03_logging", "The points that keep growing"),
    4: ("case04_pdb", "The first page of reviews"),
    5: ("case05_divide", "One bad row in two thousand"),
    6: ("case06_heisenbug", "The croissant that followed someone home"),
    7: ("case07_profile", "The slow regulars report"),
    8: ("case08_assumptions", "The missing cent"),
}

HINTS = {
    1: [
        "Read the last line of the traceback first: the exception and its value.",
        "Look closely at the key in the KeyError. Every character.",
        "Then read upwards to the first frame in cases/case01_traceback.py.",
    ],
    2: [
        "Write cases/test_case02.py with a test_ function that asserts the right price.",
        "Run detective check 2 before fixing: your test must fail on the bug.",
        "A price can never go below zero. max() is your friend.",
    ],
    3: [
        "import logging; logging.basicConfig(level=logging.DEBUG) at the top of run().",
        "log.debug the number of lines in the order inside points_for.",
        "Who changes the list that was passed in? Should they?",
    ],
    4: [
        "Put breakpoint() as the first line of page().",
        "At the (Pdb) prompt: p number, p size, p start. Then n to step, c to continue.",
        "Pages count from 1. Lists count from 0.",
    ],
    5: [
        "Copy the CSV, delete the bottom half, run again. Which half has the bug?",
        "csv.DictReader does not tell you the line number. reader.line_num does.",
        "Catch ValueError per row, and add a problem that names the line.",
    ],
    6: [
        "Call new_basket three times and print the id() of each result.",
        "Default values are made once, when the function is defined.",
        "Use None as the default, and make a new list inside.",
    ],
    7: [
        "uv run python -m cProfile -s cumtime -m detective run 7 | head -20",
        "Which call runs 20,000 times, and how long does each one take?",
        "collections.Counter counts everything in one pass.",
    ],
    8: [
        "Write the rule down: sum(shares) == total. Assert it.",
        "round() shares the same amount with everyone. Cents do not split evenly.",
        "Give everyone total // people, then hand out the remainder one cent at a time.",
    ],
}


def say(text: str) -> None:
    print("  _/\\_")
    print(f" (o.o)  {text}")
    print("  (Y)", flush=True)


def module(number: int):
    name = f"cases.{CASES[number][0]}"
    sys.modules.pop(name, None)  # always the code as it is on disk now
    return importlib.import_module(name)


def solved(number: int) -> bool:
    return all(ok for _, ok in CHECKS[number](module(number)))


def cmd_list(args: argparse.Namespace) -> None:
    for number, (_, title) in CASES.items():
        print(f"  {number}  {title:<42} {'solved' if solved(number) else ''}")


def cmd_run(args: argparse.Namespace) -> None:
    say(f"Case {args.n}: {CASES[args.n][1]}.")
    print()
    module(args.n).run()


def cmd_check(args: argparse.Namespace) -> None:
    results = CHECKS[args.n](module(args.n))
    for label, ok in results:
        print(f"  {'PASS' if ok else 'TODO'}  {label}")
    print()
    if all(ok for _, ok in results):
        say(f"Case {args.n} closed. Elementary.")
    else:
        say(f"The case is still open. Try: uv run python -m detective hint {args.n}")
        sys.exit(1)


def cmd_hint(args: argparse.Namespace) -> None:
    say("Here is where I would look:")
    for hint in HINTS[args.n]:
        print(f"  - {hint}")


def main() -> None:
    parser = argparse.ArgumentParser(prog="detective", description="Eight bugs to solve.")
    sub = parser.add_subparsers(required=True)
    sub.add_parser("list", help="every case and which are solved").set_defaults(func=cmd_list)
    for name, func, text in [
        ("run", cmd_run, "run case N and watch the bug"),
        ("check", cmd_check, "check your fix"),
        ("hint", cmd_hint, "a nudge from Clue"),
    ]:
        p = sub.add_parser(name, help=text)
        p.add_argument("n", type=int, choices=CASES, metavar="N")
        p.set_defaults(func=func)
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
