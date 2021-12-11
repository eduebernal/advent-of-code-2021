const fs = require('fs');
const rawInput = './aocInput6.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split(',').map((num)=>parseInt(num));
    }

    function countFish(fish,days){
        let fishSum = new Map;
        let totalFish = 0;
        for(let i=0;i<=8;i++){          //Initialize map
            fishSum.set(i,0)
        }
        fish.forEach((fish)=>{          //Add initial fish to map
            fishSum.set(fish,fishSum.get(fish)+1);
        })
        for(let i = days;i>0;i--){      //Advance x days
            let born = fishSum.get(0);
            for(let j=1;j<=8;j++){
                fishSum.set(j-1,fishSum.get(j))
                .set(j,0);
            }
            fishSum.set(6,born+fishSum.get(6))
            .set(8,born+fishSum.get(8));
        }
        for(let value of fishSum.values()){ //Add total fish
            totalFish+=value;
            }
        return totalFish;
    }

    let puzzleInput = parseData(fileToStr(rawInput));
    
    //PART 1 ANSWER
    let days = 80;
    console.log('After %d days, the number of fish has grown to %d',days,countFish(puzzleInput,days));
    //PART 2 ANSWER
    days = 256;
    console.log('After %d days, the number of fish has grown to %d',days,countFish(puzzleInput,days));