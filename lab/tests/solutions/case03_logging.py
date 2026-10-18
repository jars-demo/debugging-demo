"""Case 03: the points that keep growing.

Every time a receipt is printed, the customer's loyalty points go up. Nobody bought anything.
Add logging to see what changes between calls, then fix it.
Run it: uv run python -m detective run 3
"""

import logging

log = logging.getLogger("crumbs.points")


def with_bonus(order: list[dict]) -> list[dict]:
    """Big orders get a free bonus line worth 100 points."""
    if sum(line["cents"] for line in order) >= 2000:
        return [*order, {"item": "bonus", "cents": 10000}]
    return order


def points_for(order: list[dict]) -> int:
    lines = with_bonus(order)
    return sum(line["cents"] for line in lines) // 100


def receipt(order: list[dict]) -> str:
    return f"{len(order)} lines, {points_for(order)} points"


def run() -> None:
    order = [{"item": "box of eclairs", "cents": 2400}]
    for copy in range(1, 4):
        print(f"receipt {copy}: {receipt(order)}")
