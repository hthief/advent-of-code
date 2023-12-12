const fs = require("fs");
const path = require("path");



fs.readFile(path.resolve(__dirname, "input.txt"), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const inputsArray = data.split('\n');
    let sum = 0;
    let input;
    for(let i = inputsArray.length - 1; i >= 0; i--) {
        
        input = inputsArray[i].match(/\d/g);
        console.log(inputsArray.length);
        if(input.length > 1) {
            sum += parseInt(input[0] + input[input.length - 1]);
        }
        else {
            sum += parseInt(input[0] + input[0]);
        }
        
    }

    console.log(sum);
  });