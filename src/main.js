import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
    moneyFormat(value) {
        const formater = new Intl.NumberFormat("en-US");
        return formater.format(value) + "₫";
    }
}

app.mount('#app')