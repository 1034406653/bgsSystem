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
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
require('es6-promise/auto')
Es6Promise.polyfill()
/*ui框架*/
Vue.use(ElementUI);
/*运行环境*/
Vue.config.productionTip = false;

/*axios配置*/
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
Vue.prototype.$baseURL = 'http://admin.bgsgame.com/bgs/';
axios.defaults.baseURL = 'http://admin.bgsgame.com/bgs/';
/*Vue.prototype.$baseURL = 'http://192.168.0.115';
axios.defaults.baseURL = 'http://192.168.0.115';*/
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
	if(config.url != 'http://bgsgame.com/bgs/api/upload/upload_img') {
		let params = config.data || {};
		config.data = qs.stringify(params);
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	return config;
}, error => {
	return Es6Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(data => {
	if(data.data.errorMsg == "请登录") {
		window.localStorage.removeItem('username');
		router.push({
			path: "/"
		})
	}
	return data;
}, error => {
	console.log(error)
	return Es6Promise.reject(error)
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