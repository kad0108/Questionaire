// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import '../static/style.css';

Vue.use(VueResource);
Vue.config.productionTip = false


Vue.http.interceptors.push(function(request, next){
	// 请求发送前的处理逻辑
	request.headers.set('X-CSRF-TOKEN', store.fetch().token);

	next(function(response){
		// 响应后传给then之前的处理逻辑
		// token过期判断？
	})
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
