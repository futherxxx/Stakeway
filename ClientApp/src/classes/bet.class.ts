export class Bet {
    constructor() {
        this.srNo=0;
        this.lines=0;
        this.type='';
        this.numbers=[];
        this.stack=0;
    }
    srNo:number;
    lines:number;
    type:string;
    numbers:Array<number>;
    stack:number;
}