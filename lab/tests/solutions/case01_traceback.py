"""Case 01: the missing croissant.

The till crashes on a perfectly normal order. Read the traceback, bottom line first.
Run it: uv run python -m detective run 1
"""

MENU = {  # prices in cents
    "croissant": 320,
    "baguette": 280,
    "eclair": 450,
    "box of eclairs": 2400,
}


def price_of(item: str) -> int:
    return MENU[item.lower()]


def line_total(line: str) -> int:
    name, qty = line.rsplit(" x ", 1)
    return price_of(name.strip()) * int(qty)


def order_total(lines: list[str]) -> int:
    return sum(line_total(line) for line in lines)


def run() -> None:
    order = ["Croissant x 2", "baguette x 1"]
    print(f"Total: {order_total(order)} cents")
