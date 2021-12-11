let fs = require('fs');
let example = './aoc9ex.txt';
let puzzleInput = './aocInput9.txt';

function lowPoints(file){
    fs.readFile(file,'utf8',(err,data)=>{
        if(err){console.log(err)}
        let rows = data.split('\n');
        let heightMap = rows.map((row)=> row.split('').map((num)=>parseInt(num)));
        let totalRiskLevel = 0;
        let lowPoints = [];
        heightMap.forEach((row,i)=>{
            row.forEach((height,j)=>{
                let riskLevel = 0;
                let lowCheck = 0;
                (i>0)?height<heightMap[i-1][j]?lowCheck++:null:lowCheck++;
                (i+1<heightMap.length)?height<heightMap[i+1][j]?lowCheck++:null:lowCheck++;
                (j>0)?height<heightMap[i][j-1]?lowCheck++:null:lowCheck++;
                (j+1<row.length)?height<heightMap[i][j+1]?lowCheck++:null:lowCheck++;
                if(lowCheck==4){
                    console.log('Low point '+height)
                    riskLevel = height+1;
                    console.log(riskLevel);
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
                let height = heightMap[bX][bY];
                
                function basinContinues(x,y){
                        return (height<heightMap[x][y]&&heightMap[x][y]!=9&&!basinPoints.has(x+','+y))
                    }
                (i>0)?basinContinues(i-1,j)?basinCounter(i-1,j):null:null;
                (i+1<heightMap.length)?basinContinues(i+1,j)?basinCounter(i+1,j):null:null;
                (j>0)?basinContinues(i,j-1)?basinCounter(i,j-1):null:null;
                (j+1<heightMap[0].length)?basinContinues(i,j+1)?basinCounter(i,j+1):null:null;
                basinSize++;
                }
                basinCounter(lpX,lpY);
                return basinSize;
        }
        let basins = lowPoints.map((point)=>{
            return getBasinSize(point[0],point[1])
        })
        console.log('\nBASINS')
        console.log(basins);
        let sortedBasins = basins.sort((a,b)=>a-b);
        let basinL = sortedBasins.length;
        let maxThreeBasinSum = sortedBasins[basinL-1]*sortedBasins[basinL-2]*sortedBasins[basinL-3]
        console.log('\nPRODUCT OF SIZE OF THREE LARGEST BASINS');
        console.log(maxThreeBasinSum);
    })
}
lowPoints(puzzleInput);