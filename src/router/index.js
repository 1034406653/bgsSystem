import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Index from '@/components/home/index/index'
import User_userList from '@/components/home/user/userList'
import User_inviter from '@/components/home/user/inviter'
import User_agent from '@/components/home/user/agent'
import Game_gameList from '@/components/home/game/gameList'
import Game_gameAdd from '@/components/home/game/gameAdd'
import Game_gameChange from '@/components/home/game/gameChange'
import Wallet_blockchainUser from '@/components/home/walletChain/blockchainUser'
import Wallet_blockchainDetails from '@/components/home/walletChain/blockchainDetails'
import Wallet_centralizedUser from '@/components/home/walletCentralized/centralizedUser'
import Wallet_centralizedDetails from '@/components/home/walletCentralized/centralizedDetails'
import Wallet_withdrawIng from '@/components/home/withdraw/withdrawIng'
import Wallet_withdrawSuccess from '@/components/home/withdraw/withdrawSuccess'
import Wallet_withdrawFalse from '@/components/home/withdraw/withdrawFalse'
import Finance_locked from '@/components/home/finance/locked'
import Finance_locking from '@/components/home/finance/locking'
import System_feedback from '@/components/home/system/feedback'
import System_function from '@/components/home/system/function'
import System_notification from '@/components/home/system/notification'
import System_operation_log from '@/components/home/system/operation_log'
import System_bUserList from '@/components/home/system/bUserList'
import System_bUserAdd from '@/components/home/system/bUserAdd'
import System_bRoleList from '@/components/home/system/bRoleList'
import System_bRoleAdd from '@/components/home/system/bRoleAdd'
import System_bMenuList from '@/components/home/system/bMenuList'
import System_bMenuAdd from '@/components/home/system/bMenuAdd'
import System_textList from '@/components/home/system/textList'
import System_textAdd from '@/components/home/system/textAdd'
import System_textChange from '@/components/home/system/textChange'

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
			redirect: '/home/user/userList',
			children: [
				{
					path: '/home/index/index',
					name: 'Index',
					component: Index,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/user/userList',
					name: 'User_userList',
					component: User_userList,
					meta: {
						keepAlive: true
					}
				},
				{
					path:'/home/user/inviter',
					name:'User_inviter',
					component: User_inviter,
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
						keepAlive: false
					}
				},
				{
					path: '/home/game/gameAdd',
					name: 'Game_gameAdd',
					component: Game_gameAdd,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/game/gameChange',
					name: 'Game_gameChange',
					component: Game_gameChange,
					meta: {
						keepAlive: false
					}
				},
				/*钱包*/
				{
					path: '/home/walletChain/blockchainUser',
					name: 'Wallet_blockchainUser',
					component: Wallet_blockchainUser,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/walletChain/blockchainDetails',
					name: 'Wallet_blockchainDetails',
					component: Wallet_blockchainDetails,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/walletCentralized/centralizedUser',
					name: 'Wallet_centralizedUser',
					component: Wallet_centralizedUser,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/walletCentralized/centralizedDetails',
					name: 'Wallet_centralizedDetails',
					component: Wallet_centralizedDetails,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/withdraw/withdrawIng',
					name: 'Wallet_withdrawIng',
					component: Wallet_withdrawIng,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/withdraw/withdrawSuccess',
					name: 'Wallet_withdrawSuccess',
					component: Wallet_withdrawSuccess,
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/home/withdraw/withdrawFalse',
					name: 'Wallet_withdrawFalse',
					component: Wallet_withdrawFalse,
					meta: {
						keepAlive: true
					}
				},
				/*金融*/
				{
					path: '/home/finance/locking',
					name: 'Finance_locking',
					component: Finance_locking,
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
					path: '/home/system/bUserList',
					name: 'System_bUserList',
					component: System_bUserList,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/system/bUserAdd',
					name: 'System_bUserAdd',
					component: System_bUserAdd,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/system/bRoleList',
					name: 'System_bRoleList',
					component: System_bRoleList,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/system/bRoleAdd',
					name: 'System_bRoleAdd',
					component: System_bRoleAdd,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/system/bMenuList',
					name: 'System_bMenuList',
					component: System_bMenuList,
					meta: {
						keepAlive: false
					}
				},
				
				{
					path: '/home/system/bMenuAdd',
					name: 'System_bMenuAdd',
					component: System_bMenuAdd,
					meta: {
						keepAlive: false
					}
				},
				
				{
					path: '/home/system/textList',
					name: 'System_textList',
					component: System_textList,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/system/textAdd',
					name: 'System_textAdd',
					component: System_textAdd,
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/home/system/textChange',
					name: 'System_textChange',
					component: System_textChange,
					meta: {
						keepAlive: false
					}
				},
			]
		},
	]
})