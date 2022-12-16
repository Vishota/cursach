import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import ('./assets/css/themes/default.css')
import './assets/css/sizes.css'
import './assets/css/common.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
