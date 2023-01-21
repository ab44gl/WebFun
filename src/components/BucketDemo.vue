
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { CanvasRender } from '../ts/CanvasRender';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
var canvas: HTMLCanvasElement
var render: CanvasRender
onMounted(() => {
    canvas = _canvas.value!
    render = new CanvasRender(canvas)
    repaint()
})
//---------start here--------------------

enum Command {
    MOVE_UP, MOVE_RIGHT, MOVE_DOWN, START, STOP
}
var command = Command.START
var howMuch = 200
var pos = new Point()
var startTimer = 0
function onDraw(render: CanvasRender) {
    const w = canvas.width
    const h = canvas.height
    const padWidth = 100
    const padHeight = 20
    const hdistance = 200
    const speed = 5
    const stopPoint = [
        new Point(w * 0.25, h - padHeight),
        new Point(w * 0.25, h - (hdistance + padHeight)),
        new Point(w * 0.75, h - (hdistance + padHeight)),
        new Point(w * 0.75, h - padHeight)
    ]
    //command
    {
        if (command == Command.START) {
            pos = stopPoint[0]
            command = Command.MOVE_UP
        }
        else if (command == Command.MOVE_UP) {
            pos.y -= speed
            if (pos.y <= stopPoint[1].y) {
                command = Command.MOVE_RIGHT
            }
        }
        else if (command == Command.MOVE_RIGHT) {
            pos.x += speed
            if (pos.x > stopPoint[2].x) {
                command = Command.MOVE_DOWN
            }
        }
        else if (command == Command.MOVE_DOWN) {
            pos.y += speed
            if (pos.y > stopPoint[3].y) {
                command = Command.STOP
                pos = stopPoint[3]
            }
        }
        else if (command == Command.STOP) {
            //after 2 second restart
            startTimer += deltaTime
            console.log(startTimer)
            if (startTimer > 2000) {
                command = Command.START
                startTimer = 0
            }
        }
    }
    render.clear()
    //vertical line
    render.drawRect(new Rect(w * 0.5, 0, 1, h))
    render.drawRect(new Rect(w * 0.25, 0, 1, h))
    render.drawRect(new Rect(w * 0.75, 0, 1, h))
    //horizontal line
    render.drawRect(new Rect(w * 0.25, h - (hdistance + padHeight), w * 0.5, 1))
    //pad
    render.drawRect(new Rect(w * 0.25 - padWidth * 0.5, h - padHeight, padWidth, padHeight))
    render.drawRect(new Rect(w * 0.75 - padWidth * 0.5, h - padHeight, padWidth, padHeight))
    //draw stop
    stopPoint.forEach((e) => {
        render.drawCircle(e, 5, { style: "fill", fillStyle: "red" })
    })
    //box
    render.drawCircle(pos, 10)
}
function repaint() {
    onDraw(render)
}
//only for animation
var lastTime = performance.now()
var deltaTime = 0
function draw(t: any) {
    deltaTime = t - lastTime
    repaint()
    window.requestAnimationFrame(draw)
    lastTime = t
}
window.requestAnimationFrame(draw)


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