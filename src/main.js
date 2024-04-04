import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// global css
import '@/styles/index.scss' 

import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';

//import theme
import './theme/index.scss'

//import unocss
import 'uno.css'

//i18n
import { setupI18n } from '@/lang'



//svg-icon
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
import directive from '@/directives'

//import router intercept
import './permission'

//import element-plus
import 'element-plus/dist/index.css'
const app = createApp(App)


//import element-plus svg icon
import ElSvgIcon from "@/lib/el-svg-icon"
app.use(ElSvgIcon)
//router
app.use(router)

//pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

//i18n
app.use(setupI18n)
app.component('SvgIcon', svgIcon)
directive(app)


//element-plus
app.use(ElementPlus)

app.mount('#app')
