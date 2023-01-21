
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from '../ts/CanvasRender';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender
const points: Point[] = []
onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    canvas.addEventListener("mousedown", (e) => {
        addPoint(new Point(e.offsetX, e.offsetY))
    })
    repaint()
})

function addPoint(p: Point) {
    points.push(p)
    repaint()
}
//---------curve----------
function slope(a: Point, b: Point) {
    return (b.y - a.y) / (b.x - a.x);
}
function curveMaker(render: CanvasRender, points: Point[]) {

    const ctx = render.ctx
    ctx.beginPath();
   
    ctx.stroke();

}
function onDraw(render: CanvasRender) {
    render.clear()
    curveMaker(render,points)
    points.forEach((e) => {
        render.drawCircle(e, 5, { fillStyle: "red", style: "fill" })
    })
}
function repaint() {
    onDraw(render)
}
//only for animation
// function draw() {
//     repaint()
//     window.requestAnimationFrame(draw)
// }
// window.requestAnimationFrame(draw)


</script>

<template>
    <div class="center">
        <canvas ref="_canvas" width="500" height="300"></canvas>
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