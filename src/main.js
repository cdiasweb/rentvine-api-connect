import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
// Import Bootstrap JS (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.js';

const app = createApp(App);
app.use(router);
app.mount('#app')
