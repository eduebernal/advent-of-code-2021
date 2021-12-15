const fs = require('fs')
const rawInput = './D11/input.txt'

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('\n').map((row)=>{
            return row.split('').map((num)=>parseInt(num));
        })
    }

    function octoEnergy(arr,steps){
        let flashes = 0;
        let queue = [];
        function flash(y,x){
            if(arr[y][x]==0){return;}
            for(let i=y-1;i<=y+1;i++){
                for(let j=x-1;j<=x+1;j++){
                    if(!(i>=arr.length||i<0||j>=arr[0].length||j<0)){
                        if(arr[i][j]>0){arr[i][j]++};
                        if(arr[i][j]>9){
                        queue.push([i,j]);
                        }
                    }
                }
            }
            arr[y][x]=0;
            flashes++;
            while(queue.length>0){
                let nextF = queue.shift()
                flash(nextF[0],nextF[1])}
        }
        function step(){
            arr = arr.map((row)=>row.map((num)=>num+1));
            arr.forEach((row,y)=>{row.forEach((num,x)=>{
                if(num>9){flash(y,x)};
            })
             })
        }
        for(let i=0;i<steps;i++){
            step();
        }
        return flashes;
    }

    function octoSync(arr){
        let steps = 0;
        let queue = [];
        let sum = 1;
        function flash(y,x){
            if(arr[y][x]==0){return;}
            for(let i=y-1;i<=y+1;i++){
                for(let j=x-1;j<=x+1;j++){
                    if(!(i>=arr.length||i<0||j>=arr[0].length||j<0)){
                        if(arr[i][j]>0){arr[i][j]++};
                        if(arr[i][j]>9){
                        queue.push([i,j]);
                        }
                    }
                }
            }
            arr[y][x]=0;
            while(queue.length>0){
                let nextF = queue.shift()
                flash(nextF[0],nextF[1])}
        }
        function step(){
            sum = 0;
            arr = arr.map((row)=>row.map((num)=>num+1));
            arr.forEach((row,y)=>{row.forEach((num,x)=>{
                if(num>9){flash(y,x)};
            })
            })
            arr.forEach((row)=>{row.forEach((num)=>{
                sum+=num;
            })
            })
        }
        while(sum>0){
            step();
            steps++;
        }
        return steps;
    }

    let puzzleInput = parseData(fileToStr(rawInput))

    //Part 1 Answer
    console.log('Number of times the octopuses flashed in %d steps:',100);
    console.log(octoEnergy(puzzleInput,100));
    //Part 2 Answer
    console.log('First octopus sync in step:');
    console.log(octoSync(puzzleInput));