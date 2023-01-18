
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from './ts/CanvasRender';
import { Easing } from './ts/Easing';
import { Point, Rect } from './ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender
function repaint(){
    onDraw(render)
}
onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    repaint()
})
var step=1/100
var i=0
function onDraw(render: CanvasRender) {
    render.clear()
    const x=Easing.easeInSine(i)
    render.drawRect(
        new Rect(x*500, 100, 100, 100)
    )
    render.drawCircle(
        new Point(x*500,x*300),10,{style:"fill"}
    )
    i+=step
    if(i>1 || i<=0){
        step=-step
    }
    //console.log(Easing.easeInSine(i))
}
//only for animation
function draw(){
   repaint()
    window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

//test
// for (let i = 0; i <=1; i+=step) {
//     console.log(Easing.easeInSine(i))
// }
console.log(Easing.easeInSine(0))
console.log(Easing.easeInSine(1))
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