
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from './ts/CanvasRender';
import { Rect } from './ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender
onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    repaint()
})
function repaint(){
    onDraw(render)
}
function onDraw(render: CanvasRender) {
    render.clear()
    render.drawRect(
        new Rect(0, 0, 100, 100)
    )
}
//only for animation
// function draw(){
//    repaint()
//     window.requestAnimationFrame(draw)
// }
// window.requestAnimationFrame(draw)
</script>

<template>
    <canvas ref="_canvas" width="300" height="300">

    </canvas>
</template>

<style scoped>
canvas {
    border: 1px solid black;
}
</style>