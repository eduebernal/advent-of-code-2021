const fs = require('fs')
const rawInput = './16/example.txt'

    function fileToStr(file){
        return fs.readFileSync(file,'utf8');
    }

    function parseData(str){
        return str.split('').map(num=>{
            let n = parseInt(num,16).toString(2);
            n = '0000'.substr(n.length)+n;
            return n;
        }).join('');
    }

    function packetDecoder(str){
        let versionNum = [];
        let types = [];
        let values = [];
        let code = [];

        function decodeLitValue(){
            let litValue = [];
            let cutLength = 0;
            while(str.slice(0,1)=='1'){
                litValue.push(str.slice(1,5));
                str = str.slice(5);
                cutLength+=5;
            }
            litValue.push(str.slice(1,5));
            str = str.slice(5);
            cutLength+=5;
            let value = parseInt(litValue.join(''),2);
            values.push(value);
            return cutLength;
        }
        function decodeMode(){
            if(str.slice(0,1)=='0'){
                let packetNum = 0;
                let spLength = parseInt(str.slice(1,16),2);
                str = str.slice(16);
                while(spLength>0){
                    spLength-=decodeVer();
                    packetNum++;
                }
                console.log('Subpackets')
                console.log(packetNum);
            }else{
                let packetNum = parseInt(str.slice(1,12),2)
                console.log('Subpackets')
                console.log(packetNum);
                str = str.slice(12);
                while(packetNum>0){
                    decodeVer();
                    packetNum--;
                }

            }
        }
        function decodeVer(){
            let cutLength = 0;
            versionNum.push(parseInt(str.slice(0,3),2));
            str = str.slice(3);
            cutLength+=3;
            let typeID = parseInt(str.slice(0,3),2);
            types.push(typeID);
            str = str.slice(3);
            cutLength+=3;
            if (typeID==4){
                cutLength+=decodeLitValue();
            }
            else{
                decodeMode();
            }
            return cutLength;
        }
        decodeVer();
        console.log('The sum of version numbers is:')
        console.log(versionNum.filter(num=>!Number.isNaN(num)).reduce((a,b)=>a+b));
        console.log('Packet types:')
        console.log(types.filter(num=>!Number.isNaN(num)));
        console.log('Literal values:')
        console.log(values);
        console.log('Result code:')
        console.log(code);
    }

    let puzzleInput = parseData(fileToStr(rawInput));
    packetDecoder(puzzleInput);