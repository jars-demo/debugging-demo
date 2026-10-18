"""Case 08: the missing cent.

Friends split the bill. The shares never quite add up to the bill, and the bakery is short.
Write down what must always be true, check it, then fix it.
Run it: uv run python -m detective run 8
"""


def split_bill(total_cents: int, people: int) -> list[int]:
    """Each person's share, in cents. The shares must add up to the bill."""
    share, left = divmod(total_cents, people)
    shares = [share + 1] * left + [share] * (people - left)
    assert sum(shares) == total_cents
    return shares


def run() -> None:
    for total, people in [(1200, 3), (1000, 3), (1001, 4)]:
        shares = split_bill(total, people)
        print(f"{total} cents for {people}: {shares} -> adds up to {sum(shares)}")
