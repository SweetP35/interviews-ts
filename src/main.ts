import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'
import './assets/styles/reset.css'
import './assets/styles/main.css'
import { initializeApp } from 'firebase/app'


import App from './App.vue'
import router from './router'
import { toolTipDirective } from './directives/tooltip'
import { phone } from './directives/phone'

const firebaseConfig = {
	apiKey: 'AIzaSyAdpaX5oGleK-UqMZe3aFIzY2AeBeRW5TU',
	authDomain: 'interviews-ts.firebaseapp.com',
	projectId: 'interviews-ts',
	storageBucket: 'interviews-ts.firebasestorage.app',
	messagingSenderId: '954076010177',
	appId: '1:954076010177:web:c681459a8769be781b2640'
}
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VCalendar, {})
app.directive('tooltip', toolTipDirective )
app.directive('phone', phone )
app.mount('#app')
