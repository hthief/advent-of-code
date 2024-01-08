import re
#part 1 correct value is 20667
scratchcards = open('inputs.txt')

totalSum = 0

for scratchCard in scratchcards:
    numbersList = re.sub("Card\s+\d+:", '', scratchCard).split('|')
    winningMatrix = numbersList[0].split()
    numbersDrawn = numbersList[1].split()
    sum = -1
    for numberDrawn in numbersDrawn:
        if(numberDrawn in winningMatrix):
            sum += 1
    if(sum >= 0):
        totalSum += 1 * (2**sum)
print(totalSum)
