export class Easing{
    /**
        x:[0,1] 
        out:[0,1]
     */
    static easeInSine(x:number){
        return 1 - Math.cos((x * Math.PI) / 2);
    }
}
