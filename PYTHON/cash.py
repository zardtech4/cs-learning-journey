change = int(input("Change owed: "))

count = 0

while change < 0:
    print("Please enter a valid change!!!!")
    change = int(input("Change owed: "))

while change >= 25:
    change -= 25
    count += 1

while change >= 10:
    change -= 10
    count += 1

while change >= 5:
    change -= 5
    count += 1

while change >= 1:
    change -= 1
    count += 1

print(f"Total coins: {count}")