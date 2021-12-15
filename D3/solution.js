const fs = require('fs');
const rawInput = './D3/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('\n');
    }

    function pwConsumption(arr){
        let digitSum = [];
        for(let i = 0;i<arr[0].length;i++){
            digitSum[i]=0;
        }
        arr.forEach((element)=>{
            for(let i =0;i<element.length;i++){
            digitSum[i]+=parseInt(element[i]);
        }})
        let gammaRateBin = digitSum.map((sum)=>(arr.length%2==0)?(sum>arr.length/2)?1:0:(sum>=(arr.length+1)/2)?1:0);
        let epsilonRateBin = gammaRateBin.map((bit)=>(bit==0)?1:0);
        let gammaRate = parseInt(gammaRateBin.join(''),2);
        let epsilonRate = parseInt(epsilonRateBin.join(''),2);
        return gammaRate*epsilonRate;
    }

    function lsRating(arr){
            let oxArr = arr;
            let co2Arr = oxArr.slice();
            
            let digitSum = [];
            let bitMode = [];
            for(let i = 0;i<oxArr[0].length;i++){   //Initialize digitSum [0,0,0,0,0,0,0,0]
                digitSum[i]=0;
            }
            for(let i =0;i<oxArr[0].length;i++){    //Filter by most common bit (bitMode)
                if(oxArr.length==1){break;}
                oxArr.forEach((element)=>{
                    digitSum[i]+=parseInt(element[i]);
                })
                bitMode[i]=(digitSum[i]>=oxArr.length/2)?1:0;
                oxArr = oxArr.filter((element)=>element[i]==bitMode[i]);
            }
            for(let i = 0;i<oxArr[0].length;i++){
                digitSum[i]=0;
            }
            for(let i =0;i<co2Arr[0].length;i++){
                if(co2Arr.length==1){break;}
                co2Arr.forEach((element)=>{
                    digitSum[i]+=parseInt(element[i]);
                })
                bitMode[i]=(co2Arr.length%2==0)?(digitSum[i]>=co2Arr.length/2)?0:1:(digitSum[i]>=(co2Arr.length+1)/2)?0:1;
                co2Arr = co2Arr.filter((element)=>element[i]==bitMode[i]);
            }
            let oxRate = parseInt(oxArr[0],2);
            let co2Rate = parseInt(co2Arr[0],2);
            return oxRate * co2Rate;
    }

    const puzzleInput = parseData(fileToStr(rawInput));

    //First part answer
    console.log('Power Consumption:')
    console.log(pwConsumption(puzzleInput));
    
    //Second part answer
    console.log('\nLife Support Rating:')
    console.log(lsRating(puzzleInput));