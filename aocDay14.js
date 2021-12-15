const fs = require('fs');
const rawInput = './aocInput14.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        let arr = str.split('\n');
        const template = arr.shift().split('');
        const rules = new Map(arr.slice(1).map(a=>a.split(' -> ')))
        rules.forEach((value,key) => rules.set(key,[value,0]));
        for(let i=0;i<template.length-1;i++){
            let letter = template[i]+template[i+1];
            let sustArr = [rules.get(letter)[0],rules.get(letter)[1]+1];
            rules.set(letter,sustArr);
        }
        const unique = new Set;
        rules.forEach(value=>unique.add(value[0]));
        const sum = new Map;
        unique.forEach((letter)=>sum.set(letter,0));
        template.forEach((letter)=>sum.set(letter,sum.get(letter)+1));
        return {rules:rules,sum:sum};
    }

    function polymer({rules,sum},steps){
        let nextArray = []
        let mostCom=0;
        let leastCom=Infinity;
        for(let i=0;i<steps;i++){
            nextArray = [];
            rules.forEach((value,key)=>{    //Divide each pair 'XY' into 'XZ' and 'ZY', where 'XY' is the original pair and 'Z' is the insertion rule
                if(value[1]>0){
                let pairOne = key[0]+value[0];
                let pairTwo = value[0]+key[1];
                sum.set(value[0],sum.get(value[0])+1*value[1]); //keep count of letters inserted
                nextArray.push([pairOne,[rules.get(pairOne)[0],value[1]]]);
                nextArray.push([pairTwo,[rules.get(pairTwo)[0],value[1]]]);
                rules.set(key,[rules.get(key)[0],0]);
                } 
            })
            nextArray.forEach((element)=>{   //reinitialize rule map with results from previous loop;
                let pair = element[0];
                let value = element[1];
                let sustArr = [value[0],rules.get(pair)[1]+value[1]];
                rules.set(pair,sustArr);
            })
        }
        sum.forEach(value=>(value>mostCom)?mostCom=value:(value<leastCom)?leastCom=value:null); //get most and least common letters
        return mostCom-leastCom;
    }
    let puzzleInput = parseData(fileToStr(rawInput));
    
    //Part 1 Answer
    console.log('The difference of the most common element and the least common is:');
    console.log(polymer(puzzleInput,10));

    //Part 2 Answer
    puzzleInput = parseData(fileToStr(rawInput));
    console.log('The difference of the most common element and the least common is:');
    console.log(polymer(puzzleInput,40));

