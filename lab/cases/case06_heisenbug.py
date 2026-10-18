"""Case 06: the croissant that followed someone home.

Customer B opens a new basket, and customer A's croissant is already in it. It only happens
after the first customer of the day. Find out what is shared.
Run it: uv run python -m detective run 6
"""


def new_basket(first_item: str, basket: list[str] = []) -> list[str]:  # noqa: B006 (the bug)
    basket.append(first_item)
    return basket


def run() -> None:
    a = new_basket("croissant")
    b = new_basket("baguette")
    print(f"customer A: {a}")
    print(f"customer B: {b}")
