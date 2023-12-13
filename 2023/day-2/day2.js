const fs = require("fs");
const path = require("path");

const cubesInBag = { red: 12, green: 13, blue: 14 };

const part1 = (data)=>{
    const gameMatches = data.split('\n');
    let validMatches = 0;

    for (let matchIndex = gameMatches.length - 1; matchIndex >= 0; matchIndex--) {

        let matchId = gameMatches[matchIndex].match(/(?<=Game) \d+/)[0];
        const matchSets = gameMatches[matchIndex].split(";");

        for (let matchRound = matchSets.length - 1; matchRound >= 0; matchRound--) {
            const match = matchSets[matchRound].match(/\d+ \w+/g);
            const cubesInMatch = { red: 0, green: 0, blue: 0 };


            for (let index = 0; index < match.length; index++) {
                const matchSubSet = match[index].split(" ");
                cubesInMatch[matchSubSet[1]] += parseInt(matchSubSet[0]);
            }

            for (const [cubeColor, cubeCap] of Object.entries(cubesInBag)) {
                if (cubeCap < cubesInMatch[cubeColor]) {
                    matchId = 0;
                }
            }
        }
        validMatches += parseInt(matchId);
    }

    console.log(validMatches);
}

const part2 = (data)=>{
    const gameMatches = data.split('\n');
    let powersSum = 0;

    for (let matchIndex = gameMatches.length - 1; matchIndex >= 0; matchIndex--) {

        const matchSets = gameMatches[matchIndex].split(";");
        const minimumCubesInMatch = { red: 0, green: 0, blue: 0 };

        for (let matchRound = matchSets.length - 1; matchRound >= 0; matchRound--) {
            const match = matchSets[matchRound].match(/\d+ \w+/g);
            const cubesInRound = { red: 0, green: 0, blue: 0 };
            

            for (let index = 0; index < match.length; index++) {
                const matchSubSet = match[index].split(" ");
                cubesInRound[matchSubSet[1]] = parseInt(matchSubSet[0]);
            }

            for (const [cubeColor, cubeCap] of Object.entries(cubesInBag)) {
                if(minimumCubesInMatch[cubeColor] < cubesInRound[cubeColor]) {
                    minimumCubesInMatch[cubeColor] = cubesInRound[cubeColor];
                }
            }
        }

       
            powersSum += minimumCubesInMatch["red"] * minimumCubesInMatch["green"] * minimumCubesInMatch["blue"];
        
        
    }

    console.log(powersSum);
}

fs.readFile(path.resolve(__dirname, "input.txt"), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    part1(data);//2593
    part2(data);//54699

});