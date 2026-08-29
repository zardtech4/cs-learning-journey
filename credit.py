import re

brand = None

card_number = input("Enter your credit card number: ")

def is_valid_credit_card(card_number):
    global brand

    card_number = card_number.replace(" ", "")

    if not card_number.isdigit():
        return False

    if len(card_number) < 13 or len(card_number) > 16:
        return False

    if re.match(r"^4", card_number):
        brand = "VISA"
    elif re.match(r"^5[1-5]", card_number):
        brand = "MASTERCARD"
    elif re.match(r"^3[47]", card_number):
        brand = "AMEX"
    else:
        return False

    total = 0
    reverse_digits = card_number[::-1]

    for i, digit in enumerate(reverse_digits):
        n = int(digit)

        if i % 2 == 1:
            n *= 2
            if n > 9:
                n -= 9

        total += n

    return total % 10 == 0


if is_valid_credit_card(card_number):
    print(f"Valid credit card, Brand: {brand}")
else:
    print("Invalid credit card")