import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'
import './assets/global.css'

const app = createApp(App)

app.config.globalProperties.$filter = {
    moneyFormat(value) {
        const formatter = new Intl.NumberFormat("en-US");
        return formatter.format(value) + "₫";
    }
}
app.use(createPinia())
app.use(router);
app.mount('#app')