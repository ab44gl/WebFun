<script setup lang='ts'>
import { ref } from 'vue';
import BucketDemo from './components/BucketDemo.vue';
import CurveThroughPoints from './components/CurveThroughPoints.vue';
import EasingDemo from './components/EasingDemo.vue';
import PanZoomDemo from './components/PanZoomDemo.vue';
import Turtle from './components/Turtle.vue';
const selected = ref(4)
</script>

<template>
    <div>
        <select v-model="selected">
            <option disabled value="">Demos</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>
    </div>
    <div>
        <PanZoomDemo v-if="selected == 0" />
        <EasingDemo v-else-if="selected == 1" />
        <CurveThroughPoints v-else-if="selected == 2" />
        <BucketDemo v-else-if="selected == 3" />
        <Turtle v-else-if="selected == 4" />
    </div>
</template>

<style scoped>

</style>