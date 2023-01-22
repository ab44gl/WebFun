
<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
import { Demo } from '../ts/Demo';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
const demo = new class extends Demo {
    constructor() {
        super()
        //this.setAnimation(true)
    }
    protected onUpdate(): void {
        const render=this.render
        render.clear()
        render.drawRect(new Rect(10,10,100,100))
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