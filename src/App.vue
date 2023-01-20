<script setup lang='ts'>
import { ref } from 'vue';
import EasingDemo from './components/EasingDemo.vue';
import PanZoomDemo from './components/PanZoomDemo.vue';
const selected = ref(0)
</script>

<template>
    <div>
        <select v-model="selected">
            <option disabled value="">Demos</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
        </select>
    </div>
    <div>
        <PanZoomDemo v-if="selected==0"/>
        <EasingDemo v-else-if="selected==1"/>
    </div>
</template>

<style scoped>

</style>