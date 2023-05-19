import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from '@/plugins/i18n.js'

import {
  LayoutPlugin,
  ModalPlugin,
  DropdownPlugin,
  NavbarPlugin,
  ImagePlugin,
  ButtonPlugin,
  ButtonGroupPlugin,
  FormPlugin,
  FormCheckboxPlugin,
  FormDatepickerPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  FormRadioPlugin,
  CardPlugin,
  FormSelectPlugin,
  InputGroupPlugin,
  TooltipPlugin,
  TablePlugin,
  PaginationPlugin,
  PopoverPlugin,
  ProgressPlugin,
  SpinnerPlugin,
  BadgePlugin
} from 'bootstrap-vue'

Vue.use(BadgePlugin)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(DropdownPlugin)
Vue.use(NavbarPlugin)
Vue.use(ImagePlugin)
Vue.use(ButtonPlugin)
Vue.use(ButtonGroupPlugin)
Vue.use(FormPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormDatepickerPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormRadioPlugin)
Vue.use(CardPlugin)
Vue.use(FormSelectPlugin)
Vue.use(InputGroupPlugin)
Vue.use(TooltipPlugin)
Vue.use(TablePlugin)
Vue.use(PaginationPlugin)
Vue.use(PopoverPlugin)
Vue.use(ProgressPlugin)
Vue.use(SpinnerPlugin)

// Set base URL based on environment
let baseUrl = './api/'

if (process.env.VUE_APP_BASE_URL) {
  baseUrl = process.env.VUE_APP_BASE_URL
}

store.commit('ON_SERVER_URL_CHANGED', baseUrl)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
