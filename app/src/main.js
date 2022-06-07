import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store'
import vueRouter from "@/router";
import Welcome from "@/components/Welcome.vue";
import Pagination from "@/components/Pagination.vue";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component("Pagination",Pagination)
new Vue({
  store,
  router:vueRouter,
  render: h => h(App),
}).$mount('#app')
