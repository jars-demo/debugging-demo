"""Case 02: the customer who was paid to eat.

A customer used the code TENOFF on a small order, and the till owed them money.
Write a test that shows the bug before you fix it: cases/test_case02.py.
Run it: uv run python -m detective run 2
"""

CODES = {
    "HALF": ("percent", 50),
    "TENOFF": ("cents", 1000),
}


def apply_discount(total: int, code: str | None) -> int:
    """The price to pay, in cents, after a discount code."""
    if code is None:
        return total
    kind, amount = CODES[code]
    if kind == "percent":
        return total * (100 - amount) // 100
    return total - amount


def run() -> None:
    for total, code in [(2500, "HALF"), (2500, "TENOFF"), (680, "TENOFF")]:
        print(f"{total} cents with {code}: pay {apply_discount(total, code)} cents")
