import csv
import sys


def main():


    
    if len(sys.argv) != 3:
        print("Usage: python dna.py database.csv sequence.txt")
        sys.exit(1)

    
    with open(sys.argv[1]) as file:
        reader = csv.DictReader(file)
        database = list(reader)
        strs = reader.fieldnames[1:]

     
    with open(sys.argv[2]) as file:
        sequence = file.read()
    
    longest_matches = {}

    for subsequence in strs:
        count = longest_match(sequence, subsequence)
        longest_matches[subsequence] = count



    for row in database:
        match = True

        for subsequence in strs:
            if longest_matches[subsequence] != int(row[subsequence]):
                match = False
                break

        if match:
            print(row["name"])
            return

    print("No match")
def longest_match(sequence,subsequence)

    
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    
    for i in range(sequence_length):

        
        count = 0

        
        while True:

            
            start = i + count * subsequence_length
            end = start + subsequence_length

            
            if sequence[start:end] == subsequence:
                count +=1
            else:
               break 
        longest_run = max(longest_run, count)

    
    return longest_run


main()
