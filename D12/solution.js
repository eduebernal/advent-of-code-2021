const fs = require('fs')
const rawInput = './D12/input.txt'

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('\n')
        .map((a)=>a.split('-'));
    }

    function cavePath(arr,part){
        let graph = new Map;
        let paths = 0;
        arr.forEach((pair)=>{ //Map the graph in a map object
            pair.forEach((element,i)=>{
                let j = (i==0)?1:0;
                if(graph.has(element)){
                    let sustArr = graph.get(element)
                    sustArr.push(pair[j])
                    graph.set(element,sustArr);
                }else{
                    graph.set(element,[pair[j]])
                }
            })
        })
        function searchNeighbor([start,visited,visitedOnce,noRepeat]){

            function checkPathOne(neighbor){
                if(neighbor==neighbor.toUpperCase()){
                    searchNeighbor([neighbor,visited,visitedOnce,noRepeat])
                }
                else{
                    searchNeighbor([neighbor,[...visited,...visitedOnce,neighbor],[],false]);
                }
            }

            function checkPathTwo(neighbor){
                if(neighbor==neighbor.toUpperCase()){
                    searchNeighbor([neighbor,visited,visitedOnce,noRepeat])
                }
                else if((!(visitedOnce.indexOf(neighbor)>-1))&&noRepeat){
                   searchNeighbor([neighbor, visited,[...visitedOnce,neighbor],noRepeat]);
                } 
                else{
                    searchNeighbor([neighbor,[...visited,...visitedOnce,neighbor],[],false]);
                }
            }

            graph.get(start).forEach((neighbor)=>{
                if(neighbor=='end'){
                    paths++;
                    return;
                }else if(!(visited.indexOf(neighbor)>-1)){
                    (part==1)?checkPathOne(neighbor):checkPathTwo(neighbor);
                }
                else{
                    return;
                }
            })
        }
        
        searchNeighbor(['start',['start'],['start'],true]);
        return paths;
    }

    let puzzleInput = parseData(fileToStr(rawInput))

    //Part 1 Answer
    console.log('The number of possible paths while visiting small caves once is:')
    console.log(cavePath(puzzleInput,1));
    console.log('The number of possible paths while visiting a single small cave twice and the remaining once is:')
    console.log(cavePath(puzzleInput,2));
    