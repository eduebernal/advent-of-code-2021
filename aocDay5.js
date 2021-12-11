let fs = require('fs');
function ventDetector(){
    let dataArr = [];
    fs.readFile('./aocInput5.txt','utf8',(err,data)=>{
        if(err){return console.log(err)}
        //read file
        dataArr = data.split('\n');
        let cleanData = dataArr.join('|').replace(/\s*->\s*/g,',').split('|');
        let coord = [];
        let overlap = new Map;
        cleanData = cleanData.map(element => {
            let cleanArr = element.split(',');
            let numArr = cleanArr.map((num)=>parseInt(num));
            return numArr;
        });
        cleanData.forEach(element => {
            if(element[0]==element[2]||element[1]==element[3]){
            coord.push([[element[0],element[2]],[element[1],element[3]]]);}
        });
        coord.forEach((line)=>{
            let x1 = line[0][0];
            let x2 = line[0][1];
            let y1 = line[1][0];
            let y2 = line[1][1];
            if(x1==x2){
                if(y1>y2){[y1,y2]=[y2,y1];}
                for(let i=y1;i<=y2;i++){
                    let fixedCoord = x1;
                    let stringCoord = fixedCoord.toString()+','+i.toString();
                    if(overlap.has(stringCoord)){
                        overlap.set(stringCoord,overlap.get(stringCoord)+1);
                    }
                    else{
                        overlap.set(stringCoord,1)
                    }
                }
            }
            else{
                if(x1>x2){[x1,x2]=[x2,x1];}
                for(let i=x1;i<=x2;i++){
                    let fixedCoord = y1;
                    let stringCoord = i.toString()+','+fixedCoord.toString();
                    if(overlap.has(stringCoord)){
                        overlap.set(stringCoord,overlap.get(stringCoord)+1);
                    }
                    else{
                        overlap.set(stringCoord,1)
                    }
                }
            }
        })
        let dangerPoints = 0;
        overlap.forEach((value)=>{
            if(value>=2){
                dangerPoints++;
            }
        })
        console.log('There are '+dangerPoints+' Danger points')
    })
}
function ventDetectorPlus(){
    let dataArr = [];
    fs.readFile('./aocInput5.txt','utf8',(err,data)=>{
        if(err){return console.log(err)}
        //read file
        dataArr = data.split('\n');
        let cleanData = dataArr.join('|').replace(/\s*->\s*/g,',').split('|');
        let coord = [];
        let overlap = new Map;
        cleanData = cleanData.map(element => {
            let cleanArr = element.split(',');
            let numArr = cleanArr.map((num)=>parseInt(num));
            return numArr;
        });
        cleanData.forEach(element => {
            coord.push([[element[0],element[2]],[element[1],element[3]]]);
        });
        coord.forEach((line)=>{
            let x1 = line[0][0];
            let x2 = line[0][1];
            let y1 = line[1][0];
            let y2 = line[1][1];
            if(x1==x2){
                if(y1>y2){[y1,y2]=[y2,y1];}
                for(let i=y1;i<=y2;i++){
                    let fixedCoord = x1;
                    let stringCoord = fixedCoord.toString()+','+i.toString();
                    if(overlap.has(stringCoord)){
                        overlap.set(stringCoord,overlap.get(stringCoord)+1);
                    }
                    else{
                        overlap.set(stringCoord,1)
                    }
                }
            }
            else if(y1==y2){
                if(x1>x2){[x1,x2]=[x2,x1];}
                for(let i=x1;i<=x2;i++){
                    let fixedCoord = y1;
                    let stringCoord = i.toString()+','+fixedCoord.toString();
                    if(overlap.has(stringCoord)){
                        overlap.set(stringCoord,overlap.get(stringCoord)+1);
                    }
                    else{
                        overlap.set(stringCoord,1)
                    }
                }
            }
            else{
                if((x2-x1)*(y2-y1)>0){
                    if(x2-x1<0){[x1,x2]=[x2,x1];[y1,y2]=[y2,y1];}
                    for(let i =0;i<=x2-x1;i++){
                        let stringCoord = (x1+i).toString()+','+(y1+i).toString();
                        if(overlap.has(stringCoord)){
                        overlap.set(stringCoord,overlap.get(stringCoord)+1);
                    }
                    else{
                        overlap.set(stringCoord,1)
                    }
                    }
                }
                else{
                    if(x2-x1<0){[x1,x2]=[x2,x1];[y1,y2]=[y2,y1];}
                    for(let i =0;i<=x2-x1;i++){
                        let stringCoord = (x1+i).toString()+','+(y1-i).toString();

                        if(overlap.has(stringCoord)){
                        overlap.set(stringCoord,overlap.get(stringCoord)+1);
                    }
                    else{
                        overlap.set(stringCoord,1)
                    }
                    }
                }
            }
        })
        let dangerPoints = 0;
        overlap.forEach((value)=>{
            if(value>=2){
                dangerPoints++;
            }
        })
        console.log('There are '+dangerPoints+' Danger points')
    })
}
ventDetectorPlus();