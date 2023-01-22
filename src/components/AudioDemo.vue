<script setup lang='ts'>
import { ref, watch } from 'vue';
// create web audio api context
var audioCtx: AudioContext
var oscillator: OscillatorNode
function start() {
    audioCtx = new (window.AudioContext)();


    var volume = audioCtx.createGain();
    volume.connect(audioCtx.destination);
    //these sines are the same, exept for the last connect statement.
    //Now they are connected to the volume gain module and not to the au
    var sinea = audioCtx.createOscillator();
    sinea.frequency.value = 440;
    sinea.type = "sine";
    sinea.start();
    sinea.connect(volume);
    var sineb = audioCtx.createOscillator();
    sineb.frequency.value = 523.25;
    sineb.type = "sine";
    sineb.start();
    sineb.connect(volume);
    var sinec = audioCtx.createOscillator();
    sinec.frequency.value = 698.46;
    sinec.type = "sine";
    sinec.start();
    sinec.connect(volume);
    volume.gain.value = 0.2;
}

const value = ref(1)
watch(value, () => {
    oscillator.frequency.setValueAtTime(value.value, audioCtx.currentTime); // value in hertz

})
</script>

<template>

    <div>
        <button @click="start()">start</button>
        <input type="range" min="0" max="1000" v-model="value">
    </div>
    {{ value }}
</template>

<style scoped>
div {
    padding: 50px;
}

input {
    width: 100%;
}
</style>