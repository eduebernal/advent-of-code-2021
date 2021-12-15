const fs = require('fs');
const rawInput = './D1/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parsePuzzleInput(str){
        return str.split('\n').map((x)=>parseInt(x));
    }

    function getTimesIncreased(arr){
    let timesIncreased = 0;
    arr.reduce((a,b)=>{
        if(b>a){timesIncreased++;}
        return b;})
    return timesIncreased;}

    function getThreeMeasureList(arr){
        let newArr = [];
        for(let i=2;i<arr.length;i++){
            newArr.push(arr[i-2]+arr[i-1]+arr[i]);
        }
        return newArr;
        }
    
    let puzzleInput = parsePuzzleInput(fileToStr(rawInput));

    //First Part Answers
    console.log('The number of measurements larger than the previous one is:')
    console.log(getTimesIncreased(puzzleInput));

    //Second Part Answers
    console.log('\nThe number of sums larger than the previous one is:')
    console.log(getTimesIncreased(getThreeMeasureList(puzzleInput)));
