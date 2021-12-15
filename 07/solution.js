const fs = require('fs')
const rawInput = './07/input.txt'

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split(',').map((num)=>parseInt(num));
    }

    function minFuelCost(arr){
        let positions = new Map;
            let minFuelCost = 0;
            let target = arr.sort((a,b)=>a-b)[arr.length/2];
            arr.forEach((crab)=>{
                if(positions.has(crab)){
                    positions.set(crab,positions.get(crab)+1)
                }else{
                positions.set(crab,1)}
            })
                positions.forEach((v,k)=>{
                    let distance = Math.abs(k-target);
                    minFuelCost+= distance*v;
                })
            return minFuelCost;
    }
    function minFuelCostPlus(arr){
            let positions = new Map;
            let minFuelCost = 0;
            let target = Math.floor(arr.reduce((a,b)=>a+b)/arr.length)
            arr.forEach((crab)=>{
                if(positions.has(crab)){
                    positions.set(crab,positions.get(crab)+1)
                }else{
                positions.set(crab,1)}
            })
                positions.forEach((v,k)=>{
                    let distance = Math.abs(k-target);
                    minFuelCost+= ((distance*(distance+1)/2))*v;
                })
            return minFuelCost;
    }

    let puzzleInput = parseData(fileToStr(rawInput));

    //Part 1 answer
    console.log('The minimum fuel cost to align is:')
    console.log(minFuelCost(puzzleInput));
    //Part 2 answer
    console.log('The actual minimum fuel cost to align is:')
    console.log(minFuelCostPlus(puzzleInput));