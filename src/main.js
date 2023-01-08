import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import store from './store'
import { vMaska } from 'maska'

let curTheme = 'default'

import(`./themes/${curTheme}/style.scss`)

const app = createApp(App)

components.forEach(component => {
	app.component(component.name, component)
})

app.directive('maska', vMaska)
app.use(store)
app.mount('#calculator')
