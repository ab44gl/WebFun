export class Point {
    constructor(
        public x: number = 0,
        public y: number = 0,
    ) { }
}
export class Size {
    constructor(
        public width: number,
        public height: number,
    ) { }
}
export class Rect {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
    ) {

    }
}
export class Vector2 {
    constructor(
        public x: number = 0,
        public y: number = 0
    ) { }

    lengthSqr() {
        return this.x * this.x + this.y * this.y
    }
    length() {
        return Math.sqrt(this.lengthSqr())
    }
    normalize() {
        const mag = this.length()
        const vec = this.clone()
        if (Math.abs(mag) < 1e-9) {
            vec.x = 0
            vec.y = 0
        } else {
            vec.x /= mag
            vec.y /= mag
        }
        return vec
    }
    angle() {
        return Math.atan2(this.y, this.x)
    }
    rotate(degree: number) {
        var cos = Math.cos(degree);
        var sin = Math.sin(degree);
        var vector = new Vector2();
        vector.x = this.x * cos - this.y * sin;
        vector.y = this.x * sin + this.y * cos;
        return vector;
    }
    clone() {
        return new Vector2(this.x, this.y)
    }

}
