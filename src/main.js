import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import store from './store'

let curTheme = 'default'

import(`./themes/${curTheme}/style.scss`)

    const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(store)
app.mount('#calculator')
