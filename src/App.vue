<script setup lang='ts'>
import { ref } from 'vue';
import AudioDemo from './components/AudioDemo.vue';
import BezierDemo from './components/BezierDemo.vue';
import BucketDemo from './components/BucketDemo.vue';
import CurveThroughPoints from './components/CurveThroughPoints.vue';
import EasingDemo from './components/EasingDemo.vue';
import GridDemo from './components/GridDemo.vue';
import PanZoomDemo from './components/PanZoomDemo.vue';
import StackDemo from './components/StackDemo.vue';
import Turtle from './components/Turtle.vue';
const demos = [
    "PanZoom",
    "Easing",
    "CurveThroughPoints",
    "Bucket",
    "Turtle",
    "Grid",
    "Bezier",
    "Stack"
]
const selected = ref(demos[7])
</script>

<template>
    <div>
        <select v-model="selected">
            <option disabled value="">Demos</option>
            <option>{{ demos[0]}}</option>
            <option>{{ demos[1]}}</option>
            <option>{{ demos[2]}}</option>
            <option>{{ demos[3]}}</option>
            <option>{{ demos[4]}}</option>
            <option>{{ demos[5]}}</option>
            <option>{{ demos[6]}}</option>
            <option>{{ demos[7]}}</option>
        </select>
    </div>
    <div>
        <PanZoomDemo v-if="selected == demos[0]" />
        <EasingDemo v-else-if="selected == demos[1]" />
        <CurveThroughPoints v-else-if="selected == demos[2]" />
        <BucketDemo v-else-if="selected == demos[3]" />
        <Turtle v-else-if="selected == demos[4]" />
        <GridDemo v-else-if="selected == demos[5]" />
        <BezierDemo v-else-if="selected == demos[6]" />
        <StackDemo v-else-if="selected == demos[7]" />
    </div>
</template>

<style scoped>

</style>