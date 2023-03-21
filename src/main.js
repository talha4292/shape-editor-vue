import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueKonva from 'vue-konva';
import { 
    faArrowPointer, 
    faArrowsUpDownLeftRight, 
    faLeftRight, 
    faSave
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faArrowPointer, 
    faArrowsUpDownLeftRight, 
    faLeftRight,
    faSave
    )

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(VueKonva)
.mount('#app')
