import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Index from '@/components/home/index/index'
import User_userList from '@/components/home/user/userList'
import User_agent from '@/components/home/user/agent'
import Game_gameList from '@/components/home/game/gameList'
import Wallet_blockchain from '@/components/home/wallet/blockchain'
import Wallet_centralized from '@/components/home/wallet/centralized'
import Wallet_withdraw from '@/components/home/wallet/withdraw'
import Finance_agent from '@/components/home/finance/agent'
import Finance_locked from '@/components/home/finance/locked'
import System_basic from '@/components/home/system/basic'
import System_feedback from '@/components/home/system/feedback'
import System_function from '@/components/home/system/function'
import System_notification from '@/components/home/system/notification'
import System_operation_log from '@/components/home/system/operation_log'
import System_role from '@/components/home/system/role'
import System_textList from '@/components/home/system/textList'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			redirect: '/home/index/index',
			children: [
				/*首页*/
				{
					path: '/home/index/index',
					name: 'Index',
					component: Index,
					meta: {
						keepAlive: true
					}
				},
				/*用户*/
				{
					path: '/home/user/userList',
					name: 'User_userList',
					component: User_userList,
					meta: {
						keepAlive: true
					}
				},
				{
					path:'/home/user/agent',
					name:'User_agent',
					component: User_agent,
					meta: {
						keepAlive: true
					}
				},
				/*游戏*/
				{
					path: '/home/game/gameList',
					name: 'Game_gameList',
					component: Game_gameList,
					meta: {
						keepAlive: true
					}
				},
				/*钱包*/
				{
					path: '/home/wallet/blockchain',
					name: 'Wallet_blockchain',
					component: Wallet_blockchain,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/wallet/centralized',
					name: 'Wallet_centralized',
					component: Wallet_centralized,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/wallet/withdraw',
					name: 'Wallet_withdraw',
					component: Wallet_withdraw,
					meta: {
						keepAlive: true
					}
				},
				/*金融*/
				{
					path: '/home/finance/agent',
					name: 'Finance_agent',
					component: Finance_agent,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/finance/locked',
					name: 'Finance_locked',
					component: Finance_locked,
					meta: {
						keepAlive: true
					}
				},
				/*系统管理*/
				{
					path: '/home/system/basic',
					name: 'System_basic',
					component: System_basic,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/system/feedback',
					name: 'System_feedback',
					component: System_feedback,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/system/function',
					name: 'System_function',
					component: System_function,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/system/notification',
					name: 'System_notification',
					component: System_notification,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/system/operation_log',
					name: 'System_operation_log',
					component: System_operation_log,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/system/role',
					name: 'System_role',
					component: System_role,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/system/textList',
					name: 'System_textList',
					component: System_textList,
					meta: {
						keepAlive: true
					}
				},
			]
		},
	]
})