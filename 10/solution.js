const fs = require('fs');
const rawInput = './10/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        let result = [];
        let tempArray = str.split('\n');
        result = tempArray.map((element)=>{
            return element.split('');
        })
        return result;
    }

    function syntaxScore(arr){
        let ref = new Map;
        ref.set(')',['(',0,3])
        .set(']',['[',0,57])
        .set('}',['{',0,1197])
        .set('>',['<',0,25137]);
        let stack = [];
        arr.forEach((line)=>{
            line.some((character)=>{
            let foundIllegal = false;
                if (!ref.has(character)){
                    stack.push(character);
                }
                else{
                    if(!(ref.get(character)[0]==stack[stack.length-1])){
                        let susArr = [ref.get(character)[0],ref.get(character)[1]+1,ref.get(character)[2]]
                        ref.set(character,susArr);
                        foundIllegal =  true;
                    }
                    stack.pop();
                }
                return foundIllegal;
            })
            stack=[];
        })
        let score = 0;
        ref.forEach(value=>{
            score+=value[1]*value[2];
        })
        console.log(score);
    }

    function completionScore(arr){
        let ref = new Map([[')','('],[']','['],['}','{'],['>','<']]);
        let points = new Map([['(',1],['[',2],['{',3],['<',4]]);
        let stack = [];
        let scores = [];
        arr.forEach((line)=>{
            let score = 0;
            let isIllegal = line.some((character)=>{
            let foundIllegal = false;
                if (!ref.has(character)){
                    stack.unshift(character);
                }
                else{
                    if(!(ref.get(character)==stack[0])){
                        foundIllegal =  true;
                    }
                    stack.shift();
                }
                return foundIllegal;
            })
            if(!isIllegal){
            stack.forEach((character)=>{
                score*=5;
                score+=points.get(character);
            })
            scores.push(score);
            }
            stack=[];
        })
        scores.sort((a,b)=>(a-b));
        console.log(scores[Math.floor(scores.length/2)]);
    }

    let puzzleInput = parseData(fileToStr(rawInput));

    //First Part Answer
    console.log('\nSyntax score is: ')
    syntaxScore(puzzleInput);
    //Second Part Answer
    console.log('\nCompletion score is')
    completionScore(puzzleInput);
