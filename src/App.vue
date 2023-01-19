
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from './ts/CanvasRender';
import { Point, Rect, Size } from './ts/Utils';
class Camera {
    // constants
    private ORIGIN = new Point()
    private SQUARE_SIZE = 20;
    private ZOOM_SENSITIVITY = 500; // bigger for lower zoom per scroll
    private MAX_SCALE = 100;
    private MIN_SCALE = 0.1;

    // "props"
    private initialScale = 1;
    private initialOffset = new Point(0, 0);
    // "state"
    private mousePos = this.ORIGIN;
    private lastMousePos = this.ORIGIN;
    private offset = this.initialOffset;
    private scale = this.initialScale;
    private isDown = false
    ///pan zoom
    private diffPoints(p1: Point, p2: Point) {
        return new Point(
            p1.x - p2.x,
            p1.y - p2.y,
        )
    };

    private addPoints(p1: Point, p2: Point) {
        return new Point(
            p1.x + p2.x,
            p1.y + p2.y,
        )
    };

    private scalePoint(p1: Point, scale: number) {
        return new Point(
            p1.x / scale,
            p1.y / scale
        );
    }
    constructor(private canvas: HTMLCanvasElement) {
        canvas.addEventListener("pointerdown", (e) => { this.mouseDown(e) })
        window.addEventListener("pointerup", (e) => { this.mouseUp(e) })
        canvas.addEventListener("mousemove", (e) => { this.mouseMove(e) })
        canvas.addEventListener("wheel", (e) => { this.mouseWheel(e) })
    }
    private mouseDown(event:PointerEvent) {
        this.isDown = true
        // set initial mouse position in case user hasn't moved mouse yet
        this.mousePos = this.calculateMouse(event, canvas);
        canvas.setPointerCapture(event.pointerId)
    }
    private mouseUp(event:PointerEvent) {
        this.isDown = false
        canvas.releasePointerCapture(event.pointerId)
    }
    private mouseMove(event: MouseEvent) {
        if (this.isDown) {
            // update mouse position
            const newMousePos = this.calculateMouse(event, canvas);
            this.lastMousePos = this.mousePos;
            this.mousePos = newMousePos;
            const mouseDiff = this.scalePoint(this.diffPoints(this.mousePos, this.lastMousePos), this.scale);
            this.offset = this.addPoints(this.offset, mouseDiff);
        }
    }
    private mouseWheel(event: WheelEvent) {
        event.preventDefault();

        // update mouse position
        const newMousePos = this.calculateMouse(event, canvas);
        this.lastMousePos = this.mousePos;
        this.mousePos = newMousePos;

        // calculate new scale/zoom
        const zoom = 1 - event.deltaY / this.ZOOM_SENSITIVITY;
        const newScale = this.scale * zoom;
        if (this.MIN_SCALE > newScale || newScale > this.MAX_SCALE) {
            return;
        }

        // offset the canvas such that the point under the mouse doesn't move
        const lastMouse = this.scalePoint(this.mousePos, this.scale);
        const newMouse = this.scalePoint(this.mousePos, newScale);
        const mouseOffset = this.diffPoints(lastMouse, newMouse);
        this.offset = this.diffPoints(this.offset, mouseOffset);
        this.scale = newScale;
    }
    private calculateMouse(event: MouseEvent | WheelEvent, canvas: HTMLCanvasElement): Point {
        const viewportMousePos = { x: event.pageX, y: event.pageY };
        const boundingRect = canvas.getBoundingClientRect();
        const topLeftCanvasPos = { x: boundingRect.left, y: boundingRect.top };
        return new Point(event.offsetX, event.offsetY)
        //return diffPoints(viewportMousePos, topLeftCanvasPos);
    }
    update(render: CanvasRender) {
        const ctx = render.ctx
        ctx.scale(this.scale * devicePixelRatio, this.scale * devicePixelRatio);
        ctx.translate(this.offset.x, this.offset.y);

    }

}
const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender
var camera: Camera
onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("wheel", onMouseScroll)
    camera = new Camera(canvas)
    repaint()
})



//mouse
function onMouseDown(event: MouseEvent) {


}
function onMouseUp(e: MouseEvent) {
}
function onMouseScroll(event: WheelEvent) {
    repaint()
}
function onMouseMove(event: MouseEvent) {
    repaint()

}
///drawing
function repaint() {
    onDraw(render)
}

function onDraw(render: CanvasRender) {
    render.clear()
    const ctx = render.ctx

    ctx.save()
    camera.update(render)
    render.drawRect(
        new Rect(0, 0, render.w, render.h)
    )
    render.drawRect(
        new Rect(20, 20, 20, 20), { style: "fill" }
    )
    render.drawCircle(new Point(50, 100), 20, { style: "fill" })

    ctx.restore()
}
// calculate mouse position on canvas relative to top left canvas point on page

//only for animation
// function draw(){
//    repaint()
//     window.requestAnimationFrame(draw)
// }
// window.requestAnimationFrame(draw)
</script>

<template>
    <div class="center">
        <canvas ref="_canvas" width="300" height="300"></canvas>
    </div>
</template>

<style scoped>
canvas {
    border: 1px solid black;
}

.center {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;

}
</style>