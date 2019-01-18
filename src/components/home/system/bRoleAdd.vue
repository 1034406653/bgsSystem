<template>
	<el-container>
		<el-header class='header-menu'>新增角色</el-header>
		<el-main class='table-main'>
			<div class="input-box">
				<span>用户名</span>
				<input type="text" v-model="pRoleAddData.username" />
			</div>
			<div class="input-box">
				<span>密码</span>
				<input type="text" v-model="pRoleAddData.password" />
			</div>
			<div class="input-box">
				<span>真实姓名</span>
				<input type="text" v-model="pRoleAddData.realName" />
			</div>
			<div class="input-box" v-if="menuListShow">
				<span>选择菜单</span>
				<el-checkbox-group v-model="checkedMenus" @change="handleCheckedCitiesChange">
					<el-checkbox v-for="city in menus" :label="city" :key="city">{{city}}</el-checkbox>
				</el-checkbox-group>
			</div>
			<el-button type="primary" @click="addRole">提交</el-button>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pRoleAddData: {
					sn: '0',
					name: "",
					pids: [],
					mids: [],
				},
				pRoleAddDataRid: "",
				menuListShow: false,
				menuList: [],
				/*复选*/
				checkedMenus: ['上海', '北京'],
				menus: ['上海', '北京', '广州', '深圳'],
				isIndeterminate: true
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/menuPage.do',
					params:{
						currentPage:1,
						pageSize:100,
					}
				}).then(res => {
					console.log(res);
					
				});
			},
			addRole() {
				if(this.pRoleAddData.username.length < 1)
					return this.$message('请填写用户名');
				if(this.pRoleAddData.password.length < 1)
					return this.$message('请填写密码');
				if(this.pRoleAddData.realName.length < 1)
					return this.$message('真实姓名');
				if(this.pRoleAddData.rid.length < 1)
					return this.$message('请选择用户角色');
				this.$axios({
					method: 'post',
					url: '/mgrsite/role/saveOrUpdate.do',
					data: this.pRoleAddData,
				}).then(res => {
					if(res.data.success) {
						this.$message({
							type: 'success',
							message: res.data.result
						});
						this.$router.push('/home/system/bUserRole')
					} else {
						this.$message(res.data.errorMsg);
					}
				}).catch(res => {
					this.$message(res);
				});
			},
			/*复选*/
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.menus.length;
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
		margin: 40px auto;
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