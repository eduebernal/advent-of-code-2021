let fs = require('fs');
function minFuelCost(){
fs.readFile('./aocInput7.txt','utf8',(err,data)=>{
    if(err){console.log(err)}
    let cleanData = data.split(',');
    let crabs = cleanData.map((num)=>parseInt(num));
    console.log(crabs);
    let positions = new Map;
    let minFuelCost = 99999999;

    crabs.forEach((crab)=>{
        if(positions.has(crab)){
            positions.set(crab,positions.get(crab)+1)
        }else{
        positions.set(crab,1)}
    })
    console.log(positions);
    positions.forEach((value,key)=>{
        let fuelCost = 0;
        positions.forEach((v,k)=>{
            fuelCost+=Math.abs(k-key)*v;
        })
        if(fuelCost<minFuelCost){minFuelCost=fuelCost};
    })
    console.log(minFuelCost)
})
}
function minCrabFuelCost(){
    fs.readFile('./aocInput7.txt','utf8',(err,data)=>{
        if(err){console.log(err)}
        let cleanData = data.split(',');
        let crabs = cleanData.map((num)=>parseInt(num));
        let maxPos = 0;
        let positions = new Map;
        let minFuelCost = Infinity;
        let target=0;
    
        crabs.forEach((crab)=>{
            if(crab>maxPos){maxPos=crab;}
            if(positions.has(crab)){
                positions.set(crab,positions.get(crab)+1)
            }else{
            positions.set(crab,1)}
        })
        for(i=0;i<=maxPos;i++){
            let fuelCost = 0;
            positions.forEach((v,k)=>{
                let distance = Math.abs(k-i);
                fuelCost+= ((distance*(distance+1)/2))*v;
            })
            if(fuelCost<minFuelCost){minFuelCost=fuelCost;target=i};
        }
        console.log('Old function')
        console.log(target);
        console.log(minFuelCost);
    })
}
function minFuelCostPlus(){
    fs.readFile('./aocInput7.txt','utf8',(err,data)=>{
        if(err){console.log(err)}
        let cleanData = data.split(',');
        let crabs = cleanData.map((num)=>parseInt(num));
        let positions = new Map;
        let minFuelCost = 0;
        let target = Math.floor(crabs.reduce((a,b)=>a+b)/crabs.length)
        crabs.forEach((crab)=>{
            if(positions.has(crab)){
                positions.set(crab,positions.get(crab)+1)
            }else{
            positions.set(crab,1)}
        })
        console.log(target);
            positions.forEach((v,k)=>{
                let distance = Math.abs(k-target);
                minFuelCost+= ((distance*(distance+1)/2))*v;
            })
        console.log(minFuelCost)
    })
}
minCrabFuelCost();
minFuelCostPlus();