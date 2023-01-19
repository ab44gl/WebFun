
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from '../ts/CanvasRender';
import { Easing } from '../ts/Easing';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender
function repaint() {
    onDraw(render)
}
onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    repaint()
})
var step = 1 / 500
var i = 0
function onDraw(render: CanvasRender) {
    ///render.clear()
    const drawEase = (v:number) => {
        render.drawCircle(
            new Point(i * 500, 300 - v * 300), 1, { style: "fill" }
        )
    }
    //easing
    drawEase(Easing.easeInSine(i))
    drawEase(Easing.easeOutSine(i))
    drawEase(Easing.easeInOutSine(i))
    //quad
    drawEase(Easing.easeInQuad(i))
    drawEase(Easing.easeOutQuad(i))
    //bounce
    drawEase(Easing.easeInBounce(i))
    drawEase(Easing.easeOutBounce(i))
    drawEase(Easing.easeInOutBounce(i))

    i += step
    if (i > 1 || i <= 0) {
        render.clear()
        step = -step
    }
    //console.log(Easing.easeInSine(i))
}
//only for animation
function draw() {
    repaint()
    window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

//test
// for (let i = 0; i <=1; i+=step) {
//     console.log(Easing.easeInSine(i))
// }
console.log(Easing.easeInSine(0))
console.log(Easing.easeInSine(0.5))

console.log(Easing.easeInQuad(1))
console.log(Easing.easeInQuad(0.5))
console.log(Easing.easeInQuad(0))
</script>

<template>
    <canvas ref="_canvas" width="500" height="300">

    </canvas>
</template>

<style scoped>
canvas {
    border: 1px solid black;
}
</style>