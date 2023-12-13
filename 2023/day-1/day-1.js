const fs = require("fs");
const path = require("path");

const part1 = (data)=>{
    const inputsArray = data.split('\n');
    let sum = 0;
    let input;
    const dump=[];
    for(let i = inputsArray.length - 1; i >= 0; i--) {
        
        input = inputsArray[i].match(/\d/g);
        
        sum += parseInt(input[0] + input[input.length - 1]);
        dump.push(parseInt(input[0] + input[input.length - 1]));
    }
    console.log(sum);
}

const part2 = (data)=>{
    const inputsArray = data.split('\n');
    const digitCaptions = ['zero','one','two','three','four','five','six','seven','eight','nine','1','2','3','4','5','6','7','8','9',];
    let sum = 0;
    const dump=[];

    const lastMatch = (string, substring, position)=>{
        const newPosition = string.indexOf(substring, position);
        if(newPosition < 0) { return position - 1}
        return lastMatch(string, substring, newPosition+1);
    }

    for(let idx = inputsArray.length - 1; idx >= 0; idx--) {
        const line = inputsArray[idx];
        let firstDigit = {index: 99, value: NaN };
        let lastDigit = {index: -1, value: NaN };

        for (let i = digitCaptions.length - 1; i >= 0; i--) {

            const firstMatchIndex = line.indexOf(digitCaptions[i]);
            if(firstMatchIndex >= 0) {
                if(firstMatchIndex < firstDigit.index) {
                   
                    firstDigit = {index: firstMatchIndex, value: line[firstMatchIndex]  }
                    if(i < 10) {
                        firstDigit = {index: firstMatchIndex, value: ('' + i)  }
                    }
                }

                const lastMatchIndex = lastMatch(line, digitCaptions[i], firstMatchIndex +1);
                if(lastMatchIndex > lastDigit.index) {
                    lastDigit = {index: lastMatchIndex, value: line[lastMatchIndex]  }
                    
                    if(i < 10) {
                        lastDigit = {index: lastMatchIndex, value: ('' + i)  }
                    }
                }
            }
        }
        dump.push(parseInt(firstDigit.value + lastDigit.value));
        sum += parseInt(firstDigit.value + lastDigit.value);
        
    }
    console.log(sum);
}

fs.readFile(path.resolve(__dirname, "input.txt"), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    part1(data);
    part2(data);
    //54719 right answer for part2
    
  });