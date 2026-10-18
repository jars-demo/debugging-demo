"""Case 05: one bad row in two thousand.

The nightly import of orders crashes, and the error does not say where. Halve the file until
you find the row, then make the import name bad rows instead of crashing.
Run it: uv run python -m detective run 5
"""

import csv
from pathlib import Path

DATA = Path(__file__).parent / "data" / "orders.csv"


def import_orders(path: Path = DATA) -> tuple[list[dict], list[str]]:
    """Return the good orders, and a list of problems (empty for now)."""
    orders: list[dict] = []
    problems: list[str] = []
    with path.open(newline="", encoding="utf-8") as file:
        for row in csv.DictReader(file):
            orders.append(
                {"customer": row["customer"], "item": row["item"], "qty": int(row["qty"])}
            )
    return orders, problems


def run() -> None:
    orders, problems = import_orders()
    print(f"imported {len(orders)} orders, {len(problems)} problems")
