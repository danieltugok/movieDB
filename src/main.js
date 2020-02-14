import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import Content from './components/Content'
import Sobre from './components/Sobre'
import Details from './components/Details'
import Search from './components/Search'



Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false


const router = new VueRouter({
  routes:[
    {path:'/', component: Content },
    {path:'/sobre', component: Sobre },
    {path:'/details/:id', component: Details },
    {path:'/search/:value', component: Search }
  ]
});



new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
