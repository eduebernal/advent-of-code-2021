const fs = require('fs')
const rawInput = './D13/input.txt'

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        const arr = str.split('\n');
        const coord = arr.slice(0,arr.indexOf(''))
        const folds = arr.slice(arr.indexOf('')+1)
        .map(a=>(a.indexOf('x')>-1)?
            a.split('').slice(a.indexOf('x')).join('').split('=')
            :a.split('').slice(a.indexOf('y')).join('').split('=')
        );
        return [coord,folds];
    }

    function fold(arr){
        let paper = new Map;
        arr[0].forEach(a=>{     //Add coordinates to map;
            paper.set(a,a.split(',').map(b=>parseInt(b)));
        })
        arr[1].forEach((fold)=>{    //Fold the paper as per instructions
            let foldLine=parseInt(fold[1]);
            paper.forEach((point,coord)=>{
                if(fold[0]=='y'){
                    if(point[1]>foldLine){
                        let x = point[0];
                        let y = foldLine*2-point[1];
                        paper.set(x+','+y,[x,y]);
                        paper.delete(coord);
                    }
                }
                else{
                    if(point[0]>foldLine){
                        let x = foldLine*2-point[0];
                        let y = point[1];
                        paper.set(x+','+y,[x,y]);
                        paper.delete(coord);
                    }
                }
               
            })
        })
                                //Populate an array with the points from the paper map to visualize
        let code= [];
        paper.forEach(value=>{
            code[value[1]]=[];
        })
        paper.forEach(value=>{
            code[value[1]][value[0]]='█';
        })
        for(let i=0;i<code.length;i++){
            for(let j=0;j<code[0].length;j++){
                if(code[i][j]!='█'){
                    code[i][j]='░';
                }
            }
        }
        return code.map(a=>a.join(''));
    }

    let puzzleInput = parseData(fileToStr(rawInput));
    
    console.log('The code is:')
    console.log(fold(puzzleInput));
