const fs = require("fs");
const path = require("path");

const part1 = (data) => {
    const lines = data.split('\n');
    let allPartsNumbers = [];

    const isAdjacent = (symbolIndex, numberIndex, numberLength) => {
        if (numberIndex <= symbolIndex - 1 && symbolIndex - 1 < numberIndex + numberLength) {
            return true;
        };
        if (numberIndex <= symbolIndex && symbolIndex < numberIndex + numberLength) {
            return true;
        };
        if (numberIndex <= symbolIndex + 1 && symbolIndex + 1 < numberIndex + numberLength) {
            return true
        };
        return false;
    }
    const getNeighbouringNumbers = (lineIndex, symbolIndex) => {
        const numbers = [];
        for (let lineOffset = -1; lineOffset < 2; lineOffset++) {
            if (lineIndex + lineOffset < 0 || lineIndex + lineOffset >= lines.length) {
                continue;
            }
            const currentLine = lines[lineIndex + lineOffset];
            const numbersInLine = currentLine.matchAll(/\d+/g);
            for (const match of numbersInLine) {
                const number = match[0];
                if (isAdjacent(symbolIndex, match.index, number.length)) {
                    numbers.push(parseInt(number));
                }
            }
        }
        return numbers;
    }

    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        const symbols = line.matchAll(/[^\.0-9]/g);
        for (const symbolMatch of symbols) {
            allPartsNumbers = allPartsNumbers.concat(getNeighbouringNumbers(i, symbolMatch.index));
        }

    }

    console.log(allPartsNumbers.reduce((sum, partNumber) => (sum + partNumber)));

}


fs.readFile(path.resolve(__dirname, "input"), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    part1(data); //557705

});
