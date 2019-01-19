<template>
	<el-container id="app">
		<el-header class='header-box'>
			<div class="logo"></div>
			<h1>bgs后台管理系统</h1>
			<div class="bgUser" v-if="ParData.username">
				<el-dropdown>
					<span class="el-dropdown-link">
				    	{{ParData.username}}
				  	</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item><span @click="handleChangePassword">修改密码</span></el-dropdown-item>
						<el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-header>
		<el-main>
			<router-view :Login="ParData"></router-view>
		</el-main>
		<div class="modal-box password-box" v-if='changePassword.show'>
			<div class="modal-hide" @click="changePassword.show=false">
				<i class="el-icon-close"></i>
			</div>
			<div class="input-box">
				<span>旧密码</span>
				<input type="text" v-model="changePassword.oldPwd" />
			</div>
			<div class="input-box">
				<span>新密码</span>
				<input type="text" v-model="changePassword.newPwd" />
			</div>
			<el-button type="primary" @click="handleConfirm">确定</el-button>
		</div>
		<div class="mark-box-lxl" v-if='changePassword.show'></div>
	</el-container>
</template>
<script>
	export default {
		name: 'App',
		data() {
			return {
				ParData: {
					username: "",
				},
				changePassword: {
					show: false,
					oldPwd: "",
					newPwd: "",
				}
			}
		},
		mounted(){
			this.ParData.username=window.localStorage.getItem('username') || '';
		},
		methods: {
			logout() {
				this.$axios({
					method: 'post',
					url: '/mgrsite/bgUser/logout.do',
					params: this.pLoginData,
				}).then(res => {
					if(!res.data.success)
						return that.$message(res.data.errorMsg);
					window.localStorage.removeItem('username');
					this.$message({
						type: 'success',
						message: res.data.result
					});
					this.$router.push('/')
				}).catch(res => {
					console.log(res)
				});
			},
			handleChangePassword() {
				this.changePassword.oldPwd = "";
				this.changePassword.newPwd = "";
				this.changePassword.show = true;
			},
			handleConfirm() {
				if(!this.changePassword.oldPwd)
					return this.$message('请填写旧密码')
				if(!this.changePassword.newPwd)
					return this.$message('请填写新密码')
				this.$axios({
					method: 'post',
					url: '/mgrsite/bgUser/changePwd.do',
					data: {
						oldPwd: this.changePassword.oldPwd,
						newPwd: this.changePassword.newPwd,
					}
				}).then(res => {
					if(!res.data.success)
						return this.$message(res.data.errorMsg);
					this.$message({
						type: 'success',
						message: res.data.result,
					});
					this.changePassword.show = false;
					this.$router.push('/')
				}).catch(res => {
					console.log(res)
				});
			}
		}
	}
</script>

<style>
	@import url("assets/css/comment.css");
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.header-box button {
		float: right;
		margin-right: 20px;
		margin-top: 10px;
	}
	
	.bgUser {
		float: right;
		margin-right: 20px;
		color: #007AFF;
	}
	.password-box{
		width: 500px;
		margin-left: -250px;
	}
	.password-box .input-box{
		margin-bottom: 20px;
		color: #666;
	}
	.password-box button{
		display: block;
		margin: 20px auto;
	}
	.password-box span{
		width: 80px;
	}
	.password-box input{
		width: calc( 100% - 90px );
		margin-top: 6px;
	}
</style>