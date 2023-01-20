
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from '../ts/CanvasRender';
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

function onDraw(render: CanvasRender) {
    render.drawRect(new Rect(50, 50, 100, 50))
}
//only for animation
// function draw() {
//     repaint()
//     window.requestAnimationFrame(draw)
// }
// window.requestAnimationFrame(draw)


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