/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import ShareNetwork from 'vue-social-sharing'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

app.use(ShareNetwork)