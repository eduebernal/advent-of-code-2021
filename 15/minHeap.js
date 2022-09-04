const path = require("path");

module.exports = class MinHeap{
    constructor(){
        this.heap = [];
        this.map = new Map;
    }
    leftChild = (index)=>index*2+1;
    rightChild = (index)=>index*2+2;
    parent = (index)=>Math.floor((index-1)/2);
    swap = function(indexOne,indexTwo){
        [this.heap[indexOne],this.heap[indexTwo]]=[this.heap[indexTwo],this.heap[indexOne]];
    }
    peek = function(){return this.heap[0]};
    insert = function ({node,cost,pathWeight,neighbors}){
        this.map.set(node,{cost:cost,pathWeight:pathWeight,neighbors:neighbors});
        this.heap.push([node,this.map.get(node).pathWeight]);
        let index = this.heap.length-1;
        while(index!==0&&this.heap[index][1]<this.heap[this.parent(index)][1]){
            this.swap(index,this.parent(index));
            index = this.parent(index);
        }
    }
    extractMin = function(){
        const root = this.heap.shift();
        this.heap.unshift(this.heap[this.heap.length-1]);
        this.heap.pop();
        this.heapify(0);
        return root;
    }
    heapify = function(index){
        let left = this.leftChild(index);
        let right = this.rightChild(index);
        let biggest = index;
        if(left<this.heap.length&&this.heap[biggest][1]>this.heap[left][1]){
            biggest = left;
        }
        if(right<this.heap.length&&this.heap[biggest][1]>this.heap[right][1]){
            biggest = right;
        }
        if(biggest!=index){
            this.swap(biggest,index);
            this.heapify(biggest);
        }
    }
}