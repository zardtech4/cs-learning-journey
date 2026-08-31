text = input("Enter a sentence: ")
letter = 0
for c in text:
    if c.isalpha():
        letter += 1

sentences = 0

for c in text:
    if c in ".!?":
        sentences += 1        

words = len(text.split())

L = letter / words * 100
S = sentences / words * 100

index = 0.0588 * L - 0.296 * S - 15.8
index = round(index)

if index < 1:
    print("Before Grade 1")

elif index >= 16:
    print("Grade 16+")

else:
    print(f"Grade Level: {index}")