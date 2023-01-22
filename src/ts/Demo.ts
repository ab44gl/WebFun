import { POP_SCOPE_ID } from "@vue/compiler-core";
import { onMounted, onUnmounted } from "vue";
import { CanvasRender } from "./CanvasRender";
import { Point } from "./Utils";

export class Demo {
    private _render?: CanvasRender
    private animId = 0
    private _canvas?: HTMLCanvasElement
    protected frameTime = 16
    private _lastTime = performance.now()

    public get render(): CanvasRender {
        return this._render!
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas!
    }

    public get w(): number {
        return this.canvas.width
    }

    public get h(): number {
        return this.canvas.height
    }
    protected setAnimation(canAnim: boolean) {
        if (canAnim) {
            this.animId = window.requestAnimationFrame((e) => {
                this._onFrame(e)
            })
        } else {
            window.cancelAnimationFrame(this.animId)
        }
    }
    constructor() { }
    protected _onFrame(t: number) {
        const diff=t-this._lastTime
        this.frameTime =diff
        this.onUpdate()
        this.animId = window.requestAnimationFrame((e) => {
            this._onFrame(e)
        })
        this._lastTime=t
    }
    create(canvas: HTMLCanvasElement) {
        this._canvas = canvas
        this._render = new CanvasRender(canvas)
        window.addEventListener("keydown", (e) => {
            this.onKeyDown(e)
        })
        this.oncreate()
    }
    destroy() {
        window.cancelAnimationFrame(this.animId)
        this.onDestroy()
    }
    protected oncreate() {
    }
    protected onDestroy() { }
    protected onUpdate() {
        this.render.clear()
        this.render.drawCircle(new Point(100, 100), 100)
    }
    repaint() {
        this.onUpdate()
    }
    protected onMouseDown(e: MouseEvent) { }
    protected onKeyDown(e: KeyboardEvent) { }
    protected onMouseMove(e: MouseEvent) { }
}