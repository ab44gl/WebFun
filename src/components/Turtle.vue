
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
//-----------start here-------------------------------
enum State {
    MOVE_RIGHT, MOVE_LEFT, MOVE_UP,
    MOVE_DOWN, WAIT, START, STOP, SPEED, GOTO
}
class Command {
    constructor(
        public state: State = State.START,
        public data: number = 0
    ) { }
}
class Turtle {
    commandList: Command[] = []
    pos = new Point(50, 50)
    mSpeed = 1
    size = 5
    private commandPointer = 0
    private lastTime = 0
    currentCommand = new Command()
    checkPoint = new Point()
    constructor() {

    }

    private advanceCommand(): Command {
        var command = new Command()
        if (this.commandList.length == 0) {
            //no command
            command.state = State.START
            this.checkPoint.x = this.pos.x
            this.checkPoint.y = this.pos.y
        }
        else if (this.commandPointer == this.commandList.length) {
            //command end
            command.state = State.STOP
        } else {
            command = this.commandList[this.commandPointer]
            this.commandPointer++
            this.checkPoint.x = this.pos.x
            this.checkPoint.y = this.pos.y

        }
        return command
    }

    run(render: CanvasRender) {
        //manage state
        const state = this.currentCommand.state
        if (state == State.START) {
            //check if empty or not
            if (this.commandList.length > 0) {
                //wait
                this.currentCommand = this.advanceCommand()

            }
        }
        else if (state == State.MOVE_RIGHT) {
            this.pos.x += this.mSpeed
            if (this.pos.x >= this.checkPoint.x + this.currentCommand.data) {
                this.currentCommand = this.advanceCommand()
            }
        }
        else if (state == State.MOVE_LEFT) {
            this.pos.x -= this.mSpeed
            if (this.pos.x <= this.checkPoint.x - this.currentCommand.data) {
                this.currentCommand = this.advanceCommand()
            }
        }
        else if (state == State.MOVE_DOWN) {
            this.pos.y += this.mSpeed
            if (this.pos.y >= this.checkPoint.y + this.currentCommand.data) {
                this.currentCommand = this.advanceCommand()
            }
        }
        else if (state == State.MOVE_UP) {
            this.pos.y -= this.mSpeed
            if (this.pos.y <= this.checkPoint.y - this.currentCommand.data) {
                this.currentCommand = this.advanceCommand()
            }
        }
        else if (state == State.SPEED) {
            this.mSpeed = this.currentCommand.data
            this.currentCommand = this.advanceCommand()
        }
        else if (state == State.WAIT) {
            this.lastTime += deltaTime
            if (this.lastTime > this.currentCommand.data * 1000) {
                this.currentCommand = this.advanceCommand()
                this.lastTime = 0
            }
        }
        // else if (state == State.GOTO) {

        //     this.currentCommand = this.advanceCommand()
        // }

        //console.log(command)
        ///draw
        render.drawCircle(this.pos, this.size, {
            fillStyle: "red",
            style: "fill"
        })
    }
    //
    reset() {
        this.commandPointer = 0
        return this
    }
    //action
    right(value: number) {
        this.commandList.push(
            new Command(State.MOVE_RIGHT, value)
        )
        return this
    }
    left(value: number) {
        this.commandList.push(
            new Command(State.MOVE_LEFT, value)
        )
        return this
    }
    up(value: number) {
        this.commandList.push(
            new Command(State.MOVE_UP, value)
        )
        return this
    }
    down(value: number) {
        this.commandList.push(
            new Command(State.MOVE_DOWN, value)
        )
        return this
    }
    wait(value: number) {
        this.commandList.push(
            new Command(State.WAIT, value)
        )
        return this
    }
    speed(value: number) {
        this.commandList.push(
            new Command(State.SPEED, value)
        )
        return this
    }
}
//start
const turtle = ref(new Turtle())


setInterval(() => {
    const x = Math.random() * 200 +100
    const y = Math.random() * 100+100
    turtle.value
        .speed(Math.random() * 5 + 1).right(x).wait(Math.random() * 1).down(y)
        .speed(Math.random() * 5 + 1).wait(Math.random() * 1).left(x).up(y)
}, 1000)
function onDraw(render: CanvasRender) {
    render.clear()
    turtle.value.run(render)

}
function repaint() {
    onDraw(render)
}
//only for animation
var _lastTime = performance.now()
var deltaTime = 0
function draw(t: any) {
    deltaTime = t - _lastTime
    repaint()
    window.requestAnimationFrame(draw)
    _lastTime = t
}
window.requestAnimationFrame(draw)


</script>

<template>
    <div>{{ State[turtle.currentCommand.state] }}  </div>
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