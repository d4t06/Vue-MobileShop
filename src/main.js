import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './assets/main.css'
import './assets/global.css'
import './assets/themify-icons/themify-icons.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
    moneyFormat(value) {
        const formater = new Intl.NumberFormat("en-US");
        return formater.format(value) + "₫";
    }
}
app.use(router);
app.mount('#app')