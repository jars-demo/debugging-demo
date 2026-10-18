"""Case 04: the first page of reviews.

The bakery's site shows reviews ten at a time. The first ten never appear. Nobody can say why.
Step through it with breakpoint() and find out.
Run it: uv run python -m detective run 4
"""

REVIEWS = [f"review {n}" for n in range(1, 26)]


def page(items: list[str], number: int, size: int = 10) -> list[str]:
    """Page `number` of `items`, counting pages from 1."""
    start = number * size
    return items[start : start + size]


def run() -> None:
    for number in (1, 2, 3):
        shown = page(REVIEWS, number)
        print(f"page {number}: {shown[0] if shown else '(empty)'} ... {len(shown)} reviews")
