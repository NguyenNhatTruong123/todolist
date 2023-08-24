import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia"

import './assets/main.css'
const storePinia = createPinia();
const app = createApp(App);
app.use(storePinia);
app.mount('#app')
