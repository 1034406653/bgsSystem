// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import Es6Promise from 'es6-promise'
import qs from 'qs'
   
require('es6-promise/auto')
Es6Promise.polyfill()

/*ui框架*/
Vue.use(ElementUI);

/*运行环境*/
Vue.config.productionTip = false;

/*axios配置*/
Vue.prototype.$axios = axios;
Vue.prototype.$baseURL = 'http://192.168.0.115';
axios.defaults.baseURL = 'http://192.168.0.115';
axios.interceptors.request.use(config => {
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	return config;
}, error => {
	return Es6Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(data => {
	if(data.data.code === 1002) {
		console.log("请求出问题了")
		router.push({
			path: "/acount/login"
		})
	}
	return data;
}, error => {
	console.log()
	return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})