<template>
	<el-container class="mainPage">
		<el-aside width="200px" class="mainPage-left">
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened="isunique" :router="isrouter" text-color="#808080" active-text-color="#409eff">
				<el-menu-item index="/home/index/index">
					<template slot="title">
						<span>一、</span>
						<span slot="title">主页</span>
					</template>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<span>二、</span>
						<span slot="title">用户</span>
					</template>
					<el-menu-item index="/home/user/userList">
						<span>2.1、</span>
						<span slot="title">用户列表</span>
					</el-menu-item> 
					<el-menu-item index="/home/user/inviter">
						<span>2.2、</span>
						<span slot="title">邀请好友</span>
					</el-menu-item> 
					<el-menu-item index="/home/user/agent">
						<span>2.3、</span>
						<span slot="title">代理人</span>
					</el-menu-item>
				</el-submenu>
				<el-menu-item index="/home/game/gameList">
					<span>三、</span>
					<span slot="title">游戏</span>
				</el-menu-item>
				<el-submenu index="4">
					<template slot="title">
						<span>四、</span>
						<span slot="title">钱包</span>
					</template>
					<el-menu-item index="/home/wallet/blockchainUser">
						<span>4.1、</span>
						<span slot="title">区块链用户钱包</span>
					</el-menu-item>
					<el-menu-item index="/home/wallet/blockchainDetails">
						<span>4.2、</span>
						<span slot="title">区块链钱包明细</span>
					</el-menu-item>
					<el-menu-item index="/home/wallet/centralizedUser">
						<span>4.3、</span>
						<span slot="title">中心化钱包</span>
					</el-menu-item>
					<el-menu-item index="/home/wallet/centralizedDetails">
						<span>4.4、</span>
						<span slot="title">中心化钱包明细</span>
					</el-menu-item>
					<el-menu-item index="/home/wallet/withdrawIng">
						<span>4.5、</span>
						<span slot="title">提现申请列表</span>
					</el-menu-item>
					<el-menu-item index="/home/wallet/withdrawSuccess">
						<span>4.6、</span>
						<span slot="title">提现成功列表</span>
					</el-menu-item>
					<el-menu-item index="/home/wallet/withdrawFalse">
						<span>4.7、</span>
						<span slot="title">提现失败列表</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<span>五、</span>
						<span slot="title">金融</span>
					</template>
					<el-menu-item index="/home/finance/locked">
						<span>5.1、</span>
						<span slot="title">锁仓订单</span>
					</el-menu-item>
					<el-menu-item index="/home/finance/locking">
						<span>5.2、</span>
						<span slot="title">解仓列表</span>
					</el-menu-item>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<span>六、</span>
						<span slot="title">系统管理</span>
					</template>
					<el-menu-item index="/home/system/basic">
						<span>6.1、</span>
						<span slot="title">基本设置</span>
					</el-menu-item>
					<el-menu-item index="/home/system/function">
						<span>6.2、</span>
						<span slot="title">功能设置</span>
					</el-menu-item>
					<el-menu-item index="/home/system/notification">
						<span>6.3、</span>
						<span slot="title">消息推送</span>
					</el-menu-item>
					<el-menu-item index="/home/system/feedback">
						<span>6.4、</span>
						<span slot="title">用户反馈</span>
					</el-menu-item>
					<el-menu-item index="/home/system/textList">
						<span>6.5、</span>
						<span slot="title">文本列表</span>
					</el-menu-item>
					<el-menu-item index="/home/system/bUserList">
						<span>6.6、</span>
						<span slot="title">用户列表</span>
					</el-menu-item>
					<el-menu-item index="/home/system/bRoleList">
						<span>6.7、</span>
						<span slot="title">角色列表</span>
					</el-menu-item>
					<el-menu-item index="/home/system/bMenuList">
						<span>6.8、</span>
						<span slot="title">菜单列表</span>
					</el-menu-item>
					<el-menu-item index="/home/system/operation_log">
						<span>6.9、</span>
						<span slot="title">
							后台操作日志
						</span>
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
			}
		},
		mounted() {

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