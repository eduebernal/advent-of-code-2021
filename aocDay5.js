const fs = require('fs')
const rawInput = './aocInput5.txt'

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('\n')
        .join('|')
        .replace(/\s*->\s*/g,',')
        .split('|')
        .map(element => {
            let coord = element.split(',').map((num)=>parseInt(num));
            return [[coord[0],coord[1]],[coord[2],coord[3]]];
        });
    }
    
    function ventDetectorPlus(arr,straightOnly){
        let overlap = new Map;
        if(straightOnly){arr = arr.filter((line)=>(line[0][0]==line[1][0]||line[0][1]==line[1][1]))}
        function mapStraightLine(fix,initial,final,horizontal){
            let p1 = initial;
            let p2 = final;
            if(p1>p2){[p1,p2]=[p2,p1];}
            for(let i=p1;i<=p2;i++){
                stringCoord = (horizontal)?fix.toString()+','+i.toString():i.toString()+','+fix.toString();
                if(overlap.has(stringCoord)){
                    overlap.set(stringCoord,overlap.get(stringCoord)+1);
                }
                else{
                    overlap.set(stringCoord,1)
                }
            }   
        }
        function mapDiagonalLine(x1,x2,y1,y2){
            if(x2-x1<0){[x1,x2]=[x2,x1];[y1,y2]=[y2,y1];}
            for(let i =0;i<=x2-x1;i++){
                stringCoord = ((x2-x1)*(y2-y1)>0)?
                (x1+i).toString()+','+(y1+i).toString():
                (x1+i).toString()+','+(y1-i).toString();
                if(overlap.has(stringCoord)){
                overlap.set(stringCoord,overlap.get(stringCoord)+1);
                }
                else{
                    overlap.set(stringCoord,1)
                }
            }
        }
        arr.forEach((line)=>{
            let x1 = line[0][0];
            let x2 = line[1][0];
            let y1 = line[0][1];
            let y2 = line[1][1];
            if(x1==x2){mapStraightLine(x1,y1,y2,true)}
            else if(y1==y2){mapStraightLine(y1,x1,x2,false)}
            else{mapDiagonalLine(x1,x2,y1,y2);}
        })
        let dangerPoints = 0;
        overlap.forEach((value)=>{
            if(value>=2){
                dangerPoints++;
            }
        })
        return dangerPoints;
    }

    let puzzleInput = parseData(fileToStr(rawInput));

    //Part 1 answer
    console.log('The number of danger points is:');
    console.log(ventDetectorPlus(puzzleInput,true));
    //Part 2 answer
    console.log('The number of danger points is:');
    console.log(ventDetectorPlus(puzzleInput,false));