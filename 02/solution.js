const fs = require('fs');
const rawInput = './02/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        let arr = [];
        let tempArr = str.split(/\s/).map((element)=>(/\d/.test(element))?parseInt(element):element);
        for(let i =0;i<tempArr.length;i+=2){
            arr.push([tempArr[i],tempArr[i+1]]);
        }
        return arr;
    }
    
    function seaLocation(arr){
        let xPos = 0;
        let depth = 0;
        arr.reduce((acc,command)=>{
        switch(command[0]){
            case 'forward':
                xPos+=command[1];
                break;
            case 'down':
                depth+=command[1];
                break;
            case 'up':
                depth-=command[1];
                break;
        }
        return command;
        },0)
        return xPos*depth;
    }

    function correctSeaLocation(arr){
        let xPos = 0;
        let depth = 0;
        let aim = 0;
        arr.reduce((acc,command)=>{
        switch(command[0]){
            case 'forward':
                xPos+=command[1];
                depth+=aim*command[1];
                break;
            case 'down':
                aim+=command[1];
                break;
            case 'up':
                aim-=command[1];
                break;
        }
        return command;
        },0)
        return xPos*depth;
    }

    let puzzleInput = parseData(fileToStr(rawInput));

    //First part answers
    console.log('The product of the final horizontal position and the final depth is:')
    console.log(seaLocation(puzzleInput));

    //Second part answers
    console.log('\nThe product of the final horizontal position and the final depth is:')
    console.log(correctSeaLocation(puzzleInput));
