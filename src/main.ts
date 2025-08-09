import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Import CSS only when needed
import './assets/main.css'

const app = createApp(App)

// Use lazy loading for router and pinia
app.use(router)
app.use(createPinia())

// Mount app immediately
app.mount('#app')
