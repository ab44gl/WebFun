
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
    const width = canvas.width
    const height = canvas.height
    ///render.clear()
    const drawEase = (v: number) => {
        render.drawCircle(
            new Point(i * width, height - v * height), 1, { style: "fill" }
        )
    }
    //easing
    drawEase(Easing.easeInSine(i))
    drawEase(Easing.easeOutSine(i))
    drawEase(Easing.easeInOutSine(i))
    //quad
    drawEase(Easing.easeInQuad(i))
    drawEase(Easing.easeOutQuad(i))
    drawEase(Easing.easeInOutQuad(i))
    //cubic
    drawEase(Easing.easeInCubic(i))
    drawEase(Easing.easeOutCubic(i))
    drawEase(Easing.easeInOutCubic(i))
    //quart
    drawEase(Easing.easeInQuart(i))
    drawEase(Easing.easeOutQuart(i))
    drawEase(Easing.easeInOutQuart(i))
    //quint
    drawEase(Easing.easeInQuint(i))
    drawEase(Easing.easeOutQuint(i))
    drawEase(Easing.easeInOutQuint(i))
    //expo
    drawEase(Easing.easeInExpo(i))
    drawEase(Easing.easeOutExpo(i))
    drawEase(Easing.easeInOutExpo(i))
    //circ
    drawEase(Easing.easeInCirc(i))
    drawEase(Easing.easeOutCirc(i))
    drawEase(Easing.easeInOutCirc(i))
    //back
    drawEase(Easing.easeInBack(i))
    drawEase(Easing.easeOutBack(i))
    drawEase(Easing.easeInOutBack(i))
    //elastic
    drawEase(Easing.easeInElastic(i))
    drawEase(Easing.easeOutElastic(i))
    drawEase(Easing.easeInOutElastic(i))
    //bounce
    drawEase(Easing.easeInBounce(i))
    drawEase(Easing.easeOutBounce(i))
    drawEase(Easing.easeInOutBounce(i))
    //

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