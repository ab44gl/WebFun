export class Easing {
    /**
        x:[0,1] 
        out:[0,1]
     */
    static easeInSine(x: number) {
        return 1 - Math.cos((x * Math.PI) / 2);
    }
    static easeOutSine(x: number): number {
        return Math.sin((x * Math.PI) / 2);
    }
    static easeInOutSine(x: number): number {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }
    //quad
    static easeInQuad(x: number): number {
        return x * x;
    }
    static easeOutQuad(x: number): number {
        return 1 - (1 - x) * (1 - x);
    }
    static easeInOutQuad(x: number): number {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
    //bounce
    static easeInBounce(x: number): number {
        return 1 - Easing.easeOutBounce(1 - x);
    }

    static easeOutBounce(x: number): number {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }
    static easeInOutBounce(x: number): number {
        return x < 0.5
            ? (1 - Easing.easeOutBounce(1 - 2 * x)) / 2
            : (1 + Easing.easeOutBounce(2 * x - 1)) / 2;
    }




}
