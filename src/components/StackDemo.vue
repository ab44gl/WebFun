
<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
import { Demo } from '../ts/Demo';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
const _state = ref("start")
const demo = new class extends Demo {
    rad = 10
    stack: number[] = []
    dataPointer = 0
    state = "start"//running end
    lastTimer = 0
    speed = 5
    commandStack: string[] = []
    commandPointer = 0
    push() {
        this.commandStack.push("push")
        this.stack.push(-50)
    }
    pop() {

        if (this.dataPointer > 0) {
            this.commandStack.push("pop")
        }
    }
    constructor() {
        super()
        this.setAnimation(true)
    }
    protected onUpdate(): void {
        const render = this.render
        render.clear()
        //logic
        const to = this.h - (this.rad + (this.dataPointer) * this.rad * 2)
        if (this.state == "start") {
            if (this.commandStack.length > 0) {
                if (this.commandPointer == this.commandStack.length) {
                    //end or all animated
                    this.state = "end"
                } else {
                    //wait some minute
                    this.lastTimer += this.frameTime
                    if (this.lastTimer > 100 || this.commandPointer == 0) {
                        this.lastTimer = 0
                        this.state = "running"

                    }
                }
            }
        }
        else if (this.state == "running") {
            //may be stack clear while running #corner case
            if (this.commandStack.length > 0) {
                const command = this.commandStack[this.commandPointer]
                if (command == "push") {
                    this.stack[this.dataPointer] += this.speed
                    //if reached stop and animate next
                    if (this.stack[this.dataPointer] >= to) {
                        this.stack[this.dataPointer] = to
                        this.dataPointer++
                        this.state = "start"
                        this.commandPointer++
                    }
                } else {
                    this.stack[this.dataPointer - 1] -= this.speed
                    //if reached stop and animate next
                    if (this.stack[this.dataPointer - 1] <= -50) {
                        this.stack[this.dataPointer - 1] = -50
                        this.dataPointer--
                        this.state = "start"
                        this.commandPointer++
                    }
                }
            }
        }
        else if (this.state == "end") {
            //check if some added
            if (this.commandPointer < this.commandStack.length) {
                this.state = "start"
            }
        }
        //line
        render.drawRect(
            new Rect(
                this.w * 0.5, 0, 1, this.h
            ), { style: "fill" }
        )
        this.stack.forEach((e) => {
            // render.drawCircle(
            //     new Point(
            //         this.w * 0.5, e
            //     ), this.rad
            // )
            //rectangle
            const width = 300
            render.drawRect(
                new Rect(
                    this.w * 0.5 - width * 0.5, e - this.rad, width, this.rad * 2
                ), { style: "stroke" }
            )
        })
        _state.value = this.state
    }

    protected oncreate(): void {
        this.repaint()
    }
    protected onDestroy(): void {
    }
    protected onKeyDown(e: KeyboardEvent): void {
        if (e.key == " ") {
            this.push()
        }
        if (e.key == "r") this.pop()
    }
}()
onMounted(() => {
    demo.create(_canvas.value!)
})
onUnmounted(() => {
    demo.destroy()
})



</script>

<template>
    <div>{{ _state }}</div>
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