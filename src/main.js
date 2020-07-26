import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './rem.js'
//import Mint from "mint-ui"
import "mint-ui/lib/style.css"
import FastClick from "fastclick"
//按需引入
import { Swipe, SwipeItem,Field,Button,Navbar, TabItem,TabContainer, TabContainerItem,Cell, } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

FastClick.attach(document.body)
//Vue.use(Mint)


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
