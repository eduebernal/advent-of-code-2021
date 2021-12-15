const fs = require('fs');
const rawInput = './D9/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('\n')
        .map((row)=>row.split('')
            .map((num)=>parseInt(num)
            )
        );
    }

    function lowPoints(hMap){
            let totalRiskLevel = 0;
            let lowPoints = [];
            hMap.forEach((row,i)=>{
                row.forEach((height,j)=>{
                    let riskLevel = 0;
                    let lowCheck = 0;
                    (i>0)?height<hMap[i-1][j]?lowCheck++:null:lowCheck++;
                    (i+1<hMap.length)?height<hMap[i+1][j]?lowCheck++:null:lowCheck++;
                    (j>0)?height<hMap[i][j-1]?lowCheck++:null:lowCheck++;
                    (j+1<row.length)?height<hMap[i][j+1]?lowCheck++:null:lowCheck++;
                    if(lowCheck==4){
                        riskLevel = height+1;
                        lowPoints.push([i,j]);
                    }
                    totalRiskLevel+=riskLevel;
                })
            })
            console.log('The total risk level is '+totalRiskLevel);
            
            function getBasinSize(lpX,lpY){
                let basinSize = 0;
                let basinPoints = new Set;

                function basinCounter(bX,bY){
                    basinPoints.add(bX+','+bY);
                    let i = bX;
                    let j = bY;
                    let height = hMap[bX][bY];
                    
                    function basinContinues(x,y){
                            return (height<hMap[x][y]&&hMap[x][y]!=9&&!basinPoints.has(x+','+y))
                    }

                    (i>0)?basinContinues(i-1,j)?basinCounter(i-1,j):null:null;
                    (i+1<hMap.length)?basinContinues(i+1,j)?basinCounter(i+1,j):null:null;
                    (j>0)?basinContinues(i,j-1)?basinCounter(i,j-1):null:null;
                    (j+1<hMap[0].length)?basinContinues(i,j+1)?basinCounter(i,j+1):null:null;
                    basinSize++;
                }

                basinCounter(lpX,lpY);
                return basinSize;
            }

            let basins = lowPoints.map((point)=>{
                return getBasinSize(point[0],point[1])
            })
            let sortedBasins = basins.sort((a,b)=>a-b);
            let basinL = sortedBasins.length;
            let maxThreeBasinSum = sortedBasins[basinL-1]*sortedBasins[basinL-2]*sortedBasins[basinL-3]
            console.log('\nPRODUCT OF SIZE OF THREE LARGEST BASINS');
            console.log(maxThreeBasinSum);
    }

    let puzzleInput = parseData(fileToStr(rawInput));
    lowPoints(puzzleInput);