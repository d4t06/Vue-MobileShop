import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './assets/global.css'
import './assets/themify-icons/themify-icons.css'

const app = createApp(App)

app.config.globalProperties.$filter = {
    moneyFormat(value) {
        const formater = new Intl.NumberFormat("en-US");
        return formater.format(value) + "₫";
    }
}
app.use(router);
app.mount('#app')