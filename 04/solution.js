const fs = require('fs');
const rawInput = './04/input.txt';

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        let dataArr = str.split('\n');
        let parsedData = {};
        parsedData.numOrder = dataArr.shift()     //Get number order on int array
        .split(',')
        .map((num)=>parseInt(num));
        let rawBingoCards = dataArr.join(' ')
        .trim()
        .replace(/\s+/g,',')
        .split(',')
        .map((num)=>parseInt(num));
        let bingoCards = [];                    //Create bingoCards array
        for(let i=0;i<rawBingoCards.length/25;i++){
            let rows = new Map();
            let sum = 0;
            for(let j=0;j<25;j++){
                rows.set(rawBingoCards[j+25*i],[Math.floor(j/5),j%5]);
                sum+=rawBingoCards[j+25*i];
            }
            bingoCards.push({rows:rows,sum:sum,rowTrack:[0,0,0,0,0],colTrack:[0,0,0,0,0],won:false});
        }
        parsedData.bingoCards = bingoCards;
        return parsedData;
    }

    function winnerBingo({numOrder,bingoCards}){
            let lastWinCard = {};
            let firstWinCard = {};
            let winnerCardNum = 0;
            let finalNumber = 0;
            numOrder.some((bingoNumber)=>{
                if (bingoCards.some((card)=>{
                    let foundNumber = card.rows.get(bingoNumber);
                    if(foundNumber!=undefined){
                        card.sum-=bingoNumber;
                        card.rowTrack[foundNumber[0]]+=1;
                        card.colTrack[foundNumber[1]]+=1;
                    }else{return false;}
                    if((card.rowTrack.some((num)=>num==5)||card.colTrack.some((num)=>num==5))&&!card.won){
                        finalNumber = bingoNumber;
                        card.won = true;
                        if(lastWinCard.card==undefined){
                            firstWinCard.card=card;
                            firstWinCard.finalScore=finalNumber*firstWinCard.card.sum;
                        }
                        lastWinCard.card = card;
                        winnerCardNum++;
                        if(winnerCardNum==bingoCards.length){return true;}
                    }
                })
                ){return true;}
            })
            lastWinCard.finalScore = finalNumber * lastWinCard.card.sum; 
            return [firstWinCard,lastWinCard];
    }

    let puzzleInput = parseData(fileToStr(rawInput));
    console.log('The first and last winners are:');
    console.log(winnerBingo(puzzleInput));
    //console.log(lastWinnerBingoScore())
