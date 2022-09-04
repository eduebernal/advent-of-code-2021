const fs = require('fs');
const path = require('path/posix');
const heap = require('./minHeap.js');
const rawInput = './15/input.txt';
 //TO DO: Optimize pathfinding.
    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function fiveTimes(arr){
        let newArr = [];
        let newerArr = [];
        for(let i=0;i<arr.length;i++){
            newArr.push([]);
        }
        for(let i=0;i<arr.length*5;i++){
            newerArr.push([]);
        }
        arr.forEach((row,i)=>{
            row.forEach((element,j)=>{
                for(k=0;k<=4;k++){
                    if(parseInt(element)+k>9){
                        newArr[i][j+row.length*k]= (element+k)%9;
                    }else{
                        newArr[i][j+row.length*k]= parseInt(element)+k;
                    }
                }
            })
        })
        newArr.forEach((row,i)=>{
            row.forEach((element,j)=>{
                for(k=0;k<=4;k++){
                    newerArr[i+newArr.length*k][j]= (parseInt(element)+k>9)?(element+k)%9:parseInt(element)+k;
                }
            })
        })
        return newerArr;
        
    }

    function parseData(str){
        let arr =  fiveTimes(str.split('\n').map(a=>a.split('')));
        let queue = new heap;
        arr.forEach((row,i)=>row.forEach((element,j)=>{
            let neighbors = [];
            (i>0)?neighbors.push((i-1)+','+j):null;
            (i<row.length-1)?neighbors.push((i+1)+','+j):null;
            (j>0)?neighbors.push(i+','+(j-1)):null;
            (j<arr.length-1)?neighbors.push(i+','+(j+1)):null;
            if(i==0&&j==0){
                queue.insert({node:i+','+j,cost:parseInt(arr[i][j]),pathWeight:0,neighbors:neighbors});
            }else{
                queue.insert({node:i+','+j,cost:parseInt(arr[i][j]),pathWeight:Infinity,neighbors:neighbors});
            }
        }));
        return queue;
    }
    function lowestRisk(queue){
        function updateNeighbors([node,pathWeight]){
            let neighbors = queue.map.get(node).neighbors;
            neighbors.forEach(neighbor=>{
                let nCost = queue.map.get(neighbor).cost;
                let nPW = queue.map.get(neighbor).pathWeight;
                if(pathWeight+nCost<nPW){
                    queue.map.get(neighbor).pathWeight=pathWeight+nCost;
                    queue.insert({node:neighbor,cost:nCost,pathWeight:queue.map.get(neighbor).pathWeight,neighbors:queue.map.get(neighbor).neighbors})
                }
            })
        }
        let nextNode ='';
        while(queue.heap.length>0&&nextNode!='9,9'){
            nextNode = queue.extractMin();
            updateNeighbors(nextNode);
        }
    }
    
    let puzzleInput = parseData(fileToStr(rawInput));
    
    lowestRisk(puzzleInput);
    console.log(puzzleInput.map)