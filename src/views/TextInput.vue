<template>
    <div class="text-input-container">
        <span>{{label}}</span>
        <input v-model="model">
    </div>
</template>
<script setup>

import {computed} from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {type: String, default: ''},
    label: {type: String, default: ''},
})

const model = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style scoped>
input {
    width: 300px;
    border-radius: 5px;
    padding: 5px;
    border: solid 1px gray;
}

.text-input-container {
    display: flex;
    flex-direction: column;
    text-align: left;
}
</style>

