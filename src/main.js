import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router';

export function createApp() {
  const app = createSSRApp(App)
  app.use(router); // Ensure router is properly used
  return { app }
}

