let fs = require('fs');
let example = './aoc8ex.txt';
let puzzleInput = './aocInput8.txt';
function sevenSegment(file){
    fs.readFile(file,'utf8',(err,data)=>{
        if(err){console.log(err)}
        let cleanData = data.split('\n')
        let cleanerData = [];
        cleanData.forEach((element)=>{
            cleanerData.push(element.split('|'));
        })
        let parsedData = [];
        cleanerData.forEach((element)=>{
            parsedData.push([element[0].trim(),element[1].trim()]);
        })
        let displays = [];
        let codex = new Map;
        let originalCodex = new Map;
        originalCodex.set(1,['c','f']);
        originalCodex.set(2,['a','c','d','e','g']);
        originalCodex.set(3,['a','c','d','f','g']);
        originalCodex.set(4,['b','c','d','f']);
        originalCodex.set(5,['a','b','d','f','g']);
        originalCodex.set(6,['a','b','d','e','f','g']);
        originalCodex.set(7,['a','c','f']);
        originalCodex.set(8,['a','b','c','d','e','f','g']);
        originalCodex.set(9,['a','b','c','d','f','g']);
        originalCodex.set(0,['a','b','c','e','f','g']);
        let displayPos = 'abcdefg';
        let segments = displayPos.split('');
        segments.forEach((letter)=>{
            codex.set(letter,'');
        })
        parsedData.forEach((element)=>{
            let sortedPatterns = element[0].split(' ').sort((a,b)=>a.length-b.length);
            let sortedArrPatterns = sortedPatterns.map((element)=>{
                return element.split('');
            })
            displays.push({patterns:sortedArrPatterns,output:element[1].split(' '),codex:codex});
        })
        let totalSum = 0;
        displays.forEach((display)=>{
            //decode position A
            let posA = display.patterns[1].filter((x)=>!display.patterns[0].some((y)=>x==y));
            display.codex.set(posA[0],'a');
            //decode position C
            let posC = display.patterns[9]
            .filter((x)=>(!display.patterns[8].some((y)=>x==y)||!display.patterns[7].some((y)=>x==y)||!display.patterns[6].some((y)=>x==y)))
            .filter((x)=>display.patterns[0].some((y)=>x==y));
            display.codex.set(posC[0],'c');
            //decode position F
            let posF = display.patterns[0].filter((x)=>x!=posC);
            display.codex.set(posF[0],'f');
            //decode position D
            let posD = display.patterns[9]
            .filter((x)=>(!display.patterns[8].some((y)=>x==y)||!display.patterns[7].some((y)=>x==y)||!display.patterns[6].some((y)=>x==y)))
            .filter((x)=>(display.patterns[2].some((y)=>x==y))&&x!=posC);
            display.codex.set(posD[0],'d');
            //decode position E
            let posE = display.patterns[9]
            .filter((x)=>(!display.patterns[8].some((y)=>x==y)||!display.patterns[7].some((y)=>x==y)||!display.patterns[6].some((y)=>x==y)))
            .filter((x)=>(x!=posD&&x!=posC));
            display.codex.set(posE[0],'e');
            //decode position B
            let posB = display.patterns[2]
            .filter((x)=>(x!=posC&&x!=posD&x!=posF));
            display.codex.set(posB[0],'b');
            //decode position G
            let posG = display.patterns[9]
            .filter((x)=>(x!=posA&&x!=posB&&x!=posC&&x!=posD&&x!=posE&&x!=posF));
            display.codex.set(posG[0],'g');
            //translate output
            let translatedOutput = []
            for(i=0;i<4;i++){
                let translatedString = [];
                let digits = display.output[i].split('');
                digits.forEach((letter)=>{
                    translatedString.push(display.codex.get(letter));
                })
                translatedOutput.push(translatedString);
            }
            //translate to number
            let numberArr = [];
            numberArr = translatedOutput.map((arr)=>{
                let number = 0;
                originalCodex.forEach((value,key)=>{
                    if (arr.every((letter)=>{
                        return value.indexOf(letter)>-1
                    })&&arr.length==value.length){
                        number = key;
                    }
                })
                return number;
            })
            totalSum += parseInt(numberArr.join(''))
        })
        console.log(totalSum);
    })
}
sevenSegment(puzzleInput);