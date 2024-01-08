import re

scratchcards = open('inputs.txt')
totalSum = 0
scratchCardsCollection = []
currentIdx = 0

for scratchCard in scratchcards:
    numbersList = re.sub("Card\s+\d+:", '', scratchCard).split('|')
    numbersWinner = numbersList[0].split()
    numbersDrawn = numbersList[1].split()
    
    totalMatches = 0
    if(len(scratchCardsCollection) <= currentIdx):
        scratchCardsCollection.append(1)
    else:
        scratchCardsCollection[currentIdx] +=1

    for numberDrawn in numbersDrawn:
        if(numberDrawn in numbersWinner):
            totalMatches += 1

    if(totalMatches > 0):
        factor = scratchCardsCollection[currentIdx]
        for winRange in xrange(totalMatches):
            idx = winRange + 1 + currentIdx
            if(len(scratchCardsCollection) <= idx):
                scratchCardsCollection.append(0)
            scratchCardsCollection[idx] += 1 * factor
                
    currentIdx += 1
print(sum(scratchCardsCollection))
