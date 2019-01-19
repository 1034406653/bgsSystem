<template>
	<el-container class="mainPage">
		<el-aside width="200px" class="mainPage-left">
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened="isunique" :router="isrouter" text-color="#808080" active-text-color="#409eff">
				<el-submenu index="1" v-if='menus.mid1'>
					<template slot="title">
						<span slot="title">主页</span>
					</template>
					<el-menu-item index="/home/index/index">
						<span slot="title">个人中心</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="2" v-if='menus.mid2'>
					<template slot="title">
						<span slot="title">用户</span>
					</template>
					<el-menu-item index="/home/user/userList" v-if='menus.mid10'>
						<span slot="title">用户列表</span>
					</el-menu-item>
					<el-menu-item index="/home/user/inviter" v-if='menus.mid11'>
						<span slot="title">邀请好友</span>
					</el-menu-item>
					<el-menu-item index="/home/user/agent" v-if='menus.mid12'>
						<span slot="title">代理人</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="3" v-if='menus.mid3'>
					<template slot="title">
						<span slot="title">游戏管理</span>
					</template>
					<el-menu-item index="/home/game/gameList" v-if='menus.mid13'>
						<span slot="title">游戏列表</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="4" v-if='menus.mid4'>
					<template slot="title">
						<span slot="title">链上钱包</span>
					</template>
					<el-menu-item index="/home/walletChain/blockchainUser" v-if='menus.mid14'>
						<span slot="title">用户钱包</span>
					</el-menu-item>
					<el-menu-item index="/home/walletChain/blockchainDetails" v-if='menus.mid15'>
						<span slot="title">钱包明细</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="5" v-if='menus.mid5'>
					<template slot="title">
						<span slot="title">中心钱包</span>
					</template>
					<el-menu-item index="/home/walletCentralized/centralizedUser" v-if='menus.mid16'>
						<span slot="title">用户钱包</span>
					</el-menu-item>
					<el-menu-item index="/home/walletCentralized/centralizedDetails" v-if='menus.mid17'>
						<span slot="title">钱包明细</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="6" v-if='menus.mid6'>
					<template slot="title">
						<span slot="title">提现管理</span>
					</template>
					<el-menu-item index="/home/withdraw/withdrawIng" v-if='menus.mid18'>
						<span slot="title">申请列表</span>
					</el-menu-item>
					<el-menu-item index="/home/withdraw/withdrawSuccess" v-if='menus.mid19'>
						<span slot="title">审核成功</span>
					</el-menu-item>
					<el-menu-item index="/home/withdraw/withdrawFalse" v-if='menus.mid20'>
						<span slot="title">审核失败</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="7" v-if='menus.mid7'>
					<template slot="title">
						<span slot="title">锁仓管理</span>
					</template>
					<el-menu-item index="/home/finance/locked" v-if='menus.mid21'>
						<span slot="title">锁仓订单</span>
					</el-menu-item>
					<el-menu-item index="/home/finance/locking" v-if='menus.mid22'>
						<span slot="title">解仓列表</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="8" v-if='menus.mid8'>
					<template slot="title">
						<span slot="title">系统管理</span>
					</template>
					<el-menu-item index="/home/system/textList" v-if='menus.mid23'>
						<span slot="title">文本列表</span>
					</el-menu-item>
					<el-menu-item index="/home/system/function" v-if='menus.mid24'>
						<span slot="title">功能设置</span>
					</el-menu-item>
					<el-menu-item index="/home/system/feedback" v-if='menus.mid25'>
						<span slot="title">用户反馈</span>
					</el-menu-item>
					<el-menu-item index="/home/system/bUserList" v-if='menus.mid26'>
						<span slot="title">后台用户</span>
					</el-menu-item>
					<el-menu-item index="/home/system/bRoleList" v-if='menus.mid27'>
						<span slot="title">角色管理</span>
					</el-menu-item>
					<el-menu-item index="/home/system/operation_log" v-if='menus.mid30'>
						<span slot="title">系统日志</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-main>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				'routerPath': '/home/index/index',
				'isunique': true,
				'isrouter': true,
				'menus': {},
			}
		},
		mounted() {
			this.menus = {
				"mid1": false,
				"mid2": false,
				"mid3": false,
				"mid4": false,
				"mid5": false,
				"mid6": false,
				"mid7": false,
				"mid8": false,
				"mid9": false,
				"mid10": false,
				"mid11": false,
				"mid12": false,
				"mid13": false,
				"mid14": false,
				"mid15": false,
				"mid16": false,
				"mid17": false,
				"mid18": false,
				"mid19": false,
				"mid20": false,
				"mid21": false,
				"mid22": false,
				"mid23": false,
				"mid24": false,
				"mid25": false,
				"mid26": false,
				"mid27": false,
				"mid28": false,
				"mid29": false,
			}
			let menusLxl = window.localStorage.getItem('menusLxl');
			menusLxl.split(',').forEach((x, i) => {
				let midName = 'mid' + x;
				this.menus[midName] = true;
			})
		},
		methods: {
			menuInit() {
				console.log(this.$route.path)
			}
		},
	}
</script>

<style>
	.el-submenu .el-menu-item {
		min-width: 0;
	}
	
	.el-submenu .el-menu {
		width: 100%;
		overflow: hidden;
		color: #fff;
	}
	
	.mainPage-left {
		padding: 20px 4px;
		box-sizing: border-box;
	}
	
	.el-menu {
		border-right: none;
		background: transparent;
	}
	
	.el-menu li {
		width: 100%;
		border-radius: 5px;
		margin: 1px 0;
	}
	
	.el-menu-item:focus,
	.el-menu-item:hover {
		background: transparent !important;
	}
	
	.el-submenu__title:hover {
		background: transparent !important;
	}
	
	.el-submenu__title {
		border-radius: 5px;
		box-sizing: border-box;
	}
	
	.el-submenu__title i {
		color: #808080;
	}
	
	.mainPage {
		position: absolute;
		top: 61px;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.mainPage-left {
		box-shadow: 4px 4px 10px #ddd;
	}
</style>