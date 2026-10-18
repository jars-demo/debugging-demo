"""How each case is checked. Every check takes the case module, so the tests can check a fixed
copy too. A check says what it expects in plain words."""

import importlib
import sys
import time
from collections import Counter
from collections.abc import Callable
from pathlib import Path
from types import ModuleType

Check = tuple[str, bool]
CASES = Path(__file__).resolve().parent.parent / "cases"


def attempt(fn: Callable[[], object]) -> object:
    """Run fn and return its result, or the exception it raised."""
    try:
        return fn()
    except Exception as error:  # a crash is an answer too
        return error


def check_01(m: ModuleType) -> list[Check]:
    return [
        (
            "a normal order adds up",
            attempt(lambda: m.order_total(["Croissant x 2", "baguette x 1"])) == 920,
        ),
        (
            "an item with an x in its name works",
            attempt(lambda: m.order_total(["Box of eclairs x 1"])) == 2400,
        ),
        ("extra spaces do not matter", attempt(lambda: m.order_total(["  eclair x 3 "])) == 1350),
    ]


def buggy_discount(total: int, code: str | None) -> int:
    """The original apply_discount, kept so we can check your test catches it."""
    if code is None:
        return total
    kind, amount = {"HALF": ("percent", 50), "TENOFF": ("cents", 1000)}[code]
    if kind == "percent":
        return total * (100 - amount) // 100
    return total - amount


def run_tests(module: ModuleType) -> bool | None:
    tests = [getattr(module, name) for name in dir(module) if name.startswith("test_")]
    if not tests:
        return None
    return all(not isinstance(attempt(test), Exception) for test in tests)


def check_02(m: ModuleType) -> list[Check]:
    fixed = [
        (
            "a small order with TENOFF costs 0, not less",
            attempt(lambda: m.apply_discount(680, "TENOFF")) == 0,
        ),
        (
            "TENOFF still takes 10 euros off a big order",
            attempt(lambda: m.apply_discount(2500, "TENOFF")) == 1500,
        ),
        ("HALF still halves", attempt(lambda: m.apply_discount(2500, "HALF")) == 1250),
    ]
    if m.__name__ != "cases.case02_reproduce":
        return fixed  # checking a solution copy: the learner's test file is not about it
    if not (CASES / "test_case02.py").exists():
        return [*fixed, ("you wrote cases/test_case02.py", False)]
    sys.modules.pop("cases.test_case02", None)
    fixed_fn = m.apply_discount
    try:
        m.apply_discount = buggy_discount
        catches = run_tests(importlib.import_module("cases.test_case02")) is False
    finally:
        m.apply_discount = fixed_fn
    sys.modules.pop("cases.test_case02", None)
    passes = run_tests(importlib.import_module("cases.test_case02")) is True
    return [
        *fixed,
        ("you wrote cases/test_case02.py", True),
        ("your test fails on the original bug", catches),
        ("your test passes on your fix", passes),
    ]


def check_03(m: ModuleType) -> list[Check]:
    order = [{"item": "box of eclairs", "cents": 2400}]
    receipts = [attempt(lambda: m.receipt(order)) for _ in range(3)]
    return [
        (
            "printing a receipt three times gives the same receipt",
            len(set(map(str, receipts))) == 1,
        ),
        (
            "the customer's order is not changed",
            order == [{"item": "box of eclairs", "cents": 2400}],
        ),
        ("a big order still gets its bonus", attempt(lambda: m.points_for(list(order))) == 124),
    ]


def check_04(m: ModuleType) -> list[Check]:
    first = attempt(lambda: m.page(m.REVIEWS, 1))
    third = attempt(lambda: m.page(m.REVIEWS, 3))
    return [
        ("page 1 starts at review 1", isinstance(first, list) and first[:1] == ["review 1"]),
        ("page 1 has ten reviews", isinstance(first, list) and len(first) == 10),
        ("page 3 has reviews 21 to 25", third == [f"review {n}" for n in range(21, 26)]),
        ("page 4 is empty", attempt(lambda: m.page(m.REVIEWS, 4)) == []),
    ]


def check_05(m: ModuleType) -> list[Check]:
    result = attempt(m.import_orders)
    ok = isinstance(result, tuple) and len(result) == 2
    orders, problems = result if ok else ([], [])
    return [
        ("the import no longer crashes", ok),
        ("the 1,999 good orders are imported", ok and len(orders) == 1999),
        ("exactly one problem is reported", ok and len(problems) == 1),
        ("the problem names line 1337", ok and any("1337" in str(p) for p in problems)),
    ]


def check_06(m: ModuleType) -> list[Check]:
    first = attempt(lambda: m.new_basket("croissant"))
    second = attempt(lambda: m.new_basket("baguette"))
    return [
        ("the first basket holds only its own item", first == ["croissant"]),
        ("the second basket starts empty", second == ["baguette"]),
        (
            "adding to a basket you pass in still works",
            attempt(lambda: m.new_basket("eclair", ["tart"])) == ["tart", "eclair"],
        ),
    ]


def check_07(m: ModuleType) -> list[Check]:
    orders = m.year_of_orders()
    expected = sorted(name for name, count in Counter(orders).items() if count >= 5)
    started = time.perf_counter()
    found = attempt(lambda: m.regulars(orders))
    took = time.perf_counter() - started
    return [
        ("the same regulars as before", found == expected),
        (f"under 0.2 s on 20,000 orders (took {took:.2f} s)", took < 0.2),
    ]


def check_08(m: ModuleType) -> list[Check]:
    cases = [(total, people) for total in range(0, 3000, 7) for people in range(1, 8)]
    results = [
        (total, attempt(lambda t=total, p=people: m.split_bill(t, p))) for total, people in cases
    ]
    lists = [(total, shares) for total, shares in results if isinstance(shares, list)]
    return [
        ("every split returns a list of shares", len(lists) == len(results)),
        ("the shares always add up to the bill", all(sum(s) == t for t, s in lists)),
        ("shares differ by one cent at most", all(max(s) - min(s) <= 1 for _, s in lists if s)),
        ("nobody pays a negative share", all(min(s) >= 0 for _, s in lists if s)),
    ]


CHECKS = {n: globals()[f"check_{n:02}"] for n in range(1, 9)}
