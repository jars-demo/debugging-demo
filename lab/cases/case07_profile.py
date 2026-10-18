"""Case 07: the slow regulars report.

"Who ordered five times or more?" takes ages on a year of orders. Profile it before you guess.
Run it: uv run python -m detective run 7
"""

import random
import time


def year_of_orders(n: int = 20_000, seed: int = 7) -> list[str]:
    rng = random.Random(seed)
    return [f"customer-{rng.randrange(4_000):04}" for _ in range(n)]


def regulars(customers: list[str], at_least: int = 5) -> list[str]:
    found = []
    for name in customers:
        if customers.count(name) >= at_least and name not in found:
            found.append(name)
    return sorted(found)


def run() -> None:
    orders = year_of_orders()
    started = time.perf_counter()
    found = regulars(orders)
    print(f"{len(found)} regulars in {time.perf_counter() - started:.2f} s")
