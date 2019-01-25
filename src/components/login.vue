<template>
	<div class="login-content">
		<div class="login-popup">
			<div class="login-head">登录</div>
			<div class="formDiv">
				<div><i class="login-username-icon"></i><input type="text" placeholder="请输入账号" class="userName" @keyup.enter="goHome" v-model="pLoginData.username" /></div>
				<div><i class="login-password-icon"></i><input type="password" placeholder="请输入密码" class="passWord" @keyup.enter="goHome" v-model="pLoginData.password" /></div>
				<div class="sub" @click="goHome">登录</div>
			</div>
			<div class="login-bg"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Login',
		props: ['Login'],
		data() {
			return {
				pLoginData: {
					username: "",
					password: ""
				}
			}
		},
		mounted(){
			window.localStorage.removeItem('username');
			this.Login.username = '';
		},
		methods: {
			goHome() {
				var that = this;
				if(this.pLoginData.username.length < 1)
					return this.$message('请填写账号');
				if(this.pLoginData.password.length < 1)
					return this.$message('请填写密码');
				this.$axios({
					method: 'post',
					url: '/mgrsite/bgUser/login.do',
					params: this.pLoginData,
				}).then(res => {
					console.log(res)
					if(!res.data.success)
						return that.$message(res.data.errorMsg);
					let menusLxl = res.data.result.menuIds;
					this.Login.username = res.data.result.bgUser.username;
					setTimeout(() => {
						window.localStorage.setItem("username", res.data.result.bgUser.username);
						window.localStorage.setItem("realName", res.data.result.bgUser.realName);
						window.localStorage.setItem("menusLxl", menusLxl);
						this.$router.push({
							path: "/home"
						})
					},500)
				}).catch(res => {
					console.log(res)
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login-content {
		position: absolute;
		top: 61px;
		left: 0;
		bottom: 0;
		right: 0;
		background: url(../assets/img/login-bg.jpg);
		background-size: 100% 100%;
	}
	
	.login-popup {
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -250px;
		margin-top: -220px;
		width: 500px;
		height: 440px;
	}
	
	.login-popup .login-head {
		width: 100%;
		height: 76px;
		line-height: 76px;
		text-align: center;
		color: #FFFFFF;
		font-size: 30px;
		background: #19b3e5;
		border-radius: 20px 20px 0 0;
	}
	
	.login-content .formDiv {
		left: 48px;
		top: 116px;
		position: absolute;
		width: 404px;
		height: auto;
		z-index: 1;
	}
	
	.login-content .formDiv>div {
		width: 100%;
		height: 50px;
		background: #fff;
		margin-bottom: 20px;
		overflow: hidden;
	}
	
	.login-content .formDiv>div i {
		float: left;
		width: 48px;
		height: 50px;
	}
	
	.login-content .formDiv div input {
		width: 300px;
		height: 50px;
		border: none;
		color: #666;
		line-height: 14px;
		font-size: 14px;
		border: none;
		float: left;
		padding: 18px 0;
		background-color: #fff;
	}
	
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px white inset !important;
		background-color: rgb(0, 0, 0) !important;
		background-image: none !important;
		color: rgb(0, 0, 0) !important;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
	}
	
	.login-content .formDiv>div .login-username-icon {
		background: url(../assets/img/username-icon.png) no-repeat center center;
	}
	
	.login-content .formDiv>div .login-password-icon {
		background: url(../assets/img/password-icon.png) no-repeat center center;
	}
	
	.login-bg {
		width: 100%;
		height: 350px;
		background: black;
		background-size: 100% 100%;
		opacity: 0.5;
		position: absolute;
		left: 0;
		top: 76px;
		border-radius: 0 0 20px 20px;
	}
	
	.login-content .formDiv .sub {
		width: 100%;
		height: 50px;
		background: #19b3e5;
		color: #fff;
		font-size: 24px;
		line-height: 50px;
		text-align: center;
		border: none;
		cursor: pointer;
		margin-top: 50px;
	}
</style>