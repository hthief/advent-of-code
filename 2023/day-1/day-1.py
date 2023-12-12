import re

inputs = open('input.txt')
sum = 0

for calibrationLine in inputs:
    numbers = re.findall("\d", calibrationLine)
    if len(numbers) > 1:
        sum += int(numbers[0] + numbers[len(numbers) - 1])
    else:
        sum += int(numbers[0] + numbers[0])

print(sum)