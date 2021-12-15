let fs = require('fs');
let rawInput = './D8/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('\n')
        .map(a=>a.split('|'))
        .map(a=>a.map(b=>b.trim().split(' ').map(c=>c.split(''))))
    }

    function sevenSegment(arr){
        arr.map((element)=>[element[0].sort((a,b)=>a.length-b.length),element[1]]);
        let result = arr.map((element)=>{
            return element[1].map((num)=>{
                if(num.length==2){
                    return 1;
                }
                else if(num.length==5){
                    if(element[0][0].every((letter)=>num.indexOf(letter)>-1)){
                        return 3;
                    }
                    else if(element[0][2].filter((letter)=>num.indexOf(letter)>-1).length==3){
                        return 5;
                    }
                    else{
                        return 2;
                    }
                }
                else if(num.length==4){
                    return 4;
                }
                else if(num.length==3){
                    return 7;
                }
                else if(num.length==7){
                    return 8;
                }
                else if(num.length==6){
                    if(element[0][2].every((letter)=>num.indexOf(letter)>-1)){
                        return 9;
                    }
                    else if(!element[0][0].every((letter)=>num.indexOf(letter)>-1)){
                        return 6;
                    }
                    else{
                        return 0;
                    }
                }
            }).join('')
        })
        return result.reduce((a,b)=>parseInt(a)+parseInt(b));
    }

    let puzzleInput = parseData(fileToStr(rawInput));
    console.log('The sum of al the decodified outputs is:')
    console.log(sevenSegment(puzzleInput));