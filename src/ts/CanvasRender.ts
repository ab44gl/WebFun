import { Point, Rect } from "./Utils";

export interface Paint {
    lineWidth?: number,
    strokeStyle?: string,
    fillStyle?: string,
    style?: "fill" | "stroke"
}
export class CanvasRender {
    private ctx: CanvasRenderingContext2D
    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!
    }
    
    public get w() : number {
        return this.canvas.width
    }
    public get h() : number {
        return this.canvas.height
    }
    
    drawRect(rect: Rect, paint: Paint={}) {
        this.setPaint(paint)
        if (paint.style == "fill") {
            this.ctx.fillRect(
                rect.x, rect.y,
                rect.width, rect.height,
            )
        }
        this.ctx.strokeRect(
            rect.x, rect.y,
            rect.width, rect.height,
        )
    }
    drawCircle(p: Point, r: number, paint: Paint={}) {
        this.setPaint(paint)
        this.ctx.beginPath()
        this.ctx.arc(
            p.x, p.y, r, 0, 2 * Math.PI
        )
        if (paint.style == "fill") {
            this.ctx.fill()

        } else {
            this.ctx.stroke()
        }

    }
    clear(){
        this.ctx.clearRect(0,0,this.w,this.h)
    }

    private setPaint(paint: Paint) {
        this.ctx.lineWidth = paint.lineWidth == null ?
            1 : paint.lineWidth
        this.ctx.strokeStyle = paint.strokeStyle == null ?
            "black" : paint.strokeStyle
        this.ctx.fillStyle = paint.fillStyle == null ?
            "black" : paint.fillStyle
    }

}