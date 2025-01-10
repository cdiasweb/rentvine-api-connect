<template>
    <div style="display: flex; flex-direction: column">
        <b>
            Access Token
        </b>
        <br>
            <input type="password" v-model="token">
        <br>
        <br>
        <button @click="handleLogin">Login</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router/index.js";

defineProps({
  msg: String,
})

const token = ref("");

const count = ref(0)

const handleLogin = () => {
    if (import.meta.env.VITE_APP_LOGIN_TOKEN == token.value) {
        window.localStorage.setItem('authToken', token.value);
        router.push('/Home');
    } else {
        alert('Invalid token.');
    }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
