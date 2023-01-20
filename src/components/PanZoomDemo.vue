
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from '../ts/CanvasRender';
import { Point, Rect, Size } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender

onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("wheel", onMouseScroll)
    repaint()
})

var zoom = 1
var isDown = true
var zoomPoint = new Point(75, 75)
var origin = new Point(
    0, 0
)

//mouse
function onMouseDown(event: MouseEvent) {
    // repaint()
    isDown = true

}
function onMouseUp(e: MouseEvent) {
    //repaint()
    isDown = false
}
function onMouseScroll(event: WheelEvent) {
    const delta = (event.deltaY/53)*0.1
    var newZoom = zoom + delta
    var changeZoom = newZoom - zoom
    console.log(changeZoom)
    if (changeZoom != 0) {
        origin.x += - zoomPoint.x *changeZoom
        origin.y += - zoomPoint.y * changeZoom
        zoom = newZoom
    }

    repaint()
}
function onMouseMove(event: MouseEvent) {
    zoomPoint = new Point(event.offsetX, event.offsetY)
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
    ctx.translate(origin.x, origin.y)
    ctx.scale(zoom, zoom)
    //  console.log(origin)

    render.drawRect(
        new Rect(50, 50, 50, 50), { style: "fill" }
    )
    render.drawRect(
        new Rect(150, 150, 80, 50), { style: "fill" }
    )
    render.drawCircle(new Point(50, 120), 20, { style: "fill" })
    ctx.restore()
    render.drawCircle(zoomPoint, 5, { fillStyle: "red", style: "fill" })

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
    justify-content: center;
    align-items: center;

}
</style>