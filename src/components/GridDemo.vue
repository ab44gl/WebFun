
<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
import { Demo } from '../ts/Demo';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
const demo = new class extends Demo {
    grid = {
        width: 50,
        height: 50,
        color1: "black",
        color2: "#ffff9999"
    }
    constructor() {
        super()
        //this.setAnimation(true)
    }
    protected onUpdate(): void {
        this.render.clear()
        //draw grid
        const row = this.h / this.grid.height
        const col = this.w / this.grid.width
        for (var y = 0; y <= row; y++) {
            for (var x = 0; x <= col; x++) {
                //even
                if ((x + y) % 2 == 0) {
                    this.render.drawRect(
                        new Rect(
                            x*this.grid.width, y*this.grid.height, this.grid.width, this.grid.height
                        ),
                        {
                            style: "fill",
                            fillStyle: this.grid.color1
                        }
                    )
                }
                else {
                    this.render.drawRect(
                        new Rect(
                            x*this.grid.width, y*this.grid.height, this.grid.width, this.grid.height
                        ),
                        {
                            style: "fill",
                            fillStyle: this.grid.color2
                        }
                    )
                }
            }
        }
    }
    protected oncreate(): void {
        this.repaint()
    }
    protected onDestroy(): void {
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