import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* import store from './store' */
import vueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import './assets/css/index.css'
const app = createApp(App)
app.use(ElementPlus)
/* app.use(store) */
app.use(router)
app.use(vueAxios);
app.mount('#app')