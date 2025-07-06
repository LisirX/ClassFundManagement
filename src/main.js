import { createApp } from 'vue'

// 引入全局 Bootstrap 样式
import 'bootstrap/dist/css/bootstrap.min.css'

// 引入自定义的全局样式
import './assets/main.css'

import App from './App.vue'

// 引入 Bootstrap 的 JS 功能 (可选, 如果需要下拉菜单等交互)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


createApp(App).mount('#app')