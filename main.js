import App from './App'


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  const urlPre="192.168.168.105"
  app.provide('urlPre',urlPre)
  return {
    app
  }
}
// #endif