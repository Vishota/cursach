import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/styles.css'
import './assets/css/sizes.css'
import './assets/css/themes/default.css'

import * as f from './assets/js/f'

import * as paths from './assets/json/paths.json'

const app = createApp(App)

const loadProps = [
    f.loadAsJson(paths.json.about)
        .then(about => {
            app.config.globalProperties.about = about
        }),
    f.loadLang(paths.json.langs, paths.json.lang_default)
        .then(lang => {
            app.config.globalProperties.lang = lang
        })
]

await Promise.all(loadProps)

app.use(router)

app.mount('#app')
