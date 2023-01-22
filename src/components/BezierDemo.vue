
<script setup lang='ts'>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { CanvasRender } from '../ts/CanvasRender';
import { Demo } from '../ts/Demo';
import { Point, Rect } from '../ts/Utils';

const _canvas = ref<HTMLCanvasElement>()
const _state = ref("main")
class Line {
    constructor(
        public a: Point,
        public b: Point,
        public percent: number = 30
    ) {

    }
    draw(render: CanvasRender) {
        const dx = this.b.x - this.a.x
        const dy = this.b.y - this.a.y
        render.drawLine(this.a, this.b)
        render.drawCircle(new Point(
            this.a.x + dx * this.percent / 100,
            this.a.y + dy * this.percent / 100
        ), 3)
    }
}
const demo = new class extends Demo {
    constructor() {
        super()
        // this.setAnimation(true)
    }
    protected onUpdate(): void {
        const render = this.render
        render.clear()
        //this.stepDemo()
        //this.circleWithSinCos()
        this.bezierfun()
    }
    //
    stepDemo() {
        const stepPercent = 80
        const a = new Point(20, 110)
        const b = new Point(220, 60)
        const c = new Point(70, 250)
        const rad = 5
        const lineAB = new Line(a, b, 50)
        const lineAC = new Line(a, c)
        //draw 
        const ctx = this.render.ctx
        lineAB.draw(this.render)
        lineAC.draw(this.render)
        this.render.drawCircle(a, rad, { fillStyle: "red", style: "fill" })
        this.render.drawCircle(b, rad, { fillStyle: "red", style: "fill" })
        this.render.drawCircle(c, rad, { fillStyle: "red", style: "fill" })


    }
    circleWithSinCos() {
        const origin = new Point(150, 150)
        const radius = 50
        for (var t = 0; t < Math.PI; t += 0.1) {
            const x = Math.cos(t) * radius + origin.x
            const y = Math.sin(t) * radius + origin.y
            this.render.drawCircle(new Point(x, y), 1, {})
        }
    }
    bezierfun() {
        const cubic = (weights: Point[], t: number = 0) => {
            const t3 = Math.pow(1 - t, 3)
            const t2 = Math.pow(1 - t, 2)
            const t1 = 1 - t
            return new Point(
                weights[0].x * t3 + weights[1].x * 3 * t2 * t + weights[2].x * 3 * t1 * t * t + weights[3].x * Math.pow(t, 3),
                weights[0].y * t3 + weights[1].y * 3 * t2 * t + weights[2].y * 3 * t1 * t * t + weights[3].y * Math.pow(t, 3)
            )
        }
        const cubic2 = (w: Point[], ratio: number[], t: number = 0) => {
            const t2 = t * t
            const t3 = t2 * t
            const mt = 1 - t
            const mt2 = mt * mt
            const mt3 = mt2 * mt
            const f = [
                ratio[0] * mt3,
                3 * ratio[1] * mt2 * t,
                3 * ratio[2] * mt * t2,
                ratio[3] * t3
            ]
            const basis = f[0] + f[1] + f[2] + f[3]
            return new Point(
                (f[0] * w[0].x + f[1] * w[1].x + f[2] * w[2].x + f[3] * w[3].x) / basis,
                (f[0] * w[0].y + f[1] * w[1].y + f[2] * w[2].y + f[3] * w[3].y) / basis
            )
        }
        const weights = [
            new Point(110, 150),
            new Point(25, 190),
            new Point(210, 250),
            new Point(210, 30),
        ]
        const ctx = this.render.ctx
        ctx.save()
        const points: Point[] = []
        for (var t = 0; t <= 1; t += 0.01) {
            const p = cubic(weights, t)
            // this.render.drawCircle(p, 1)
            points.push(p)
        }
        this.render.drawConnectedLines(points, {})
        weights.forEach((e) => {
            this.render.drawCircle(e, 5, { fillStyle: "blue", style: "fill" })
        })
        ctx.restore()
        //second
        ctx.save()
        ctx.translate(100, 50)
        {
            const points: Point[] = []
            const ratio=[1,1,1,0.01]
            for (var t = 0; t <= 1+0.01; t += 0.01) {
                const p = cubic2(weights,ratio, t)
                // this.render.drawCircle(p, 1)
                points.push(p)
            }
            this.render.drawConnectedLines(points, {})
            weights.forEach((e) => {
                this.render.drawCircle(e, 5, { fillStyle: "red", style: "fill" })
            })
        }
        ctx.restore()

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

watch(_state, () => {
    demo.repaint()
})

</script>

<template>
    <p>
        <select v-model="_state">
            <option>main</option>
            <option>normal</option>
        </select>
    </p>
    <div class="center">
        <canvas ref="_canvas" width="500" height="400"></canvas>
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