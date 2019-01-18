<template>
	<el-container>
		<el-header class='header-menu'>创建后台账号</el-header>
		<el-main class='table-main'>
			<div class="input-box">
				<span>用户名</span>
				<input type="text" v-model="pRoleData.username" />
			</div>
			<div class="input-box">
				<span>密码</span>
				<input type="text" v-model="pRoleData.password" />
			</div>
			<div class="input-box">
				<span>真实姓名</span>
				<input type="text" v-model="pRoleData.realName" />
			</div>
			<el-button type="primary" @click="addRole">提交</el-button>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pRoleData: {
					admin: false,
					password: "",
					realName: '',
					username: "",
					state: 0,
				}
			}
		},
		methods: {
			addRole() {
				if(this.pRoleData.username.length < 1)
					return this.$message('请填写用户名');
				if(this.pRoleData.password.length < 1)
					return this.$message('请填写密码');
				if(this.pRoleData.realName.length < 1)
					return this.$message('真实姓名');
				this.$axios({
					method: 'post',
					url: '/mgrsite/bgUser/newBguser.do',
					data: this.pRoleData,
				}).then(res => {
					console.log(res);
					if(res.data.success) {
						this.$message({
							type:"success",
							message:res.data.result,
						});
						this.$router.push('/home/system/role')
					}else{
						this.$message(res.data.errorMsg);
					}
				}).catch(res => {
					console.log(res);
					this.$message(res);
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.input-box {
		width: 600px;
		margin: 0 auto;
		margin-bottom: 20px;
		position: relative;
	}
	
	.input-box span {
		width: 100px;
	}
	
	.input-box input {
		width: calc( 100% - 101px);
		margin-top: 6px;
		color: #333;
	}
	
	.input-box textarea {
		width: calc( 100% - 101px);
		height: 100px;
		padding: 10px 20px;
		color: #333;
		font-size: 14px;
		border: 1px solid #ddd;
		border-radius: 5px;
		outline: none;
	}
	
	.input-box label {
		margin-top: 12px;
	}
	
	button {
		display: block;
		margin: 20px auto;
	}
	
	.input-box .gamePic {
		width: 100px;
		height: 30px;
		position: absolute;
		left: 101px;
		top: 5px;
		opacity: 0;
		display: block;
		margin: 0;
		z-index: 10;
		cursor: pointer;
	}
	
	.input-box .gamePicBtn {
		width: 100px;
		height: 30px;
		position: absolute;
		left: 101px;
		top: 5px;
		border: 1px solid #ddd;
		border-radius: 5px;
		text-align: center;
		line-height: 28px;
	}
	
	.input-box b {
		position: absolute;
		left: 210px;
		line-height: 40px;
		color: #999;
		font-size: 12px;
		font-weight: normal;
	}
	
	.input-box img {
		width: 100px;
		margin-left: 101px;
	}
</style>