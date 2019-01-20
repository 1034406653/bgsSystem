<template>
	<el-container>
		<el-header class='header-menu'>新增角色</el-header>
		<el-main class='table-main'>
			<div class="input-box">
				<span>角色名称</span>
				<input type="text" v-model="pRoleAddData.name" />
			</div>
			<div class="input-box">
				<span>选择菜单</span>
				<div class="menuTree">
					<el-tree :data="data2" show-checkbox node-key="mid" ref="tree" highlight-current :props="defaultProps">
					</el-tree>
				</div>
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
					mids: '',
				},
				/*选择菜单*/
				data2: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
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
					params: {
						currentPage: 1,
						pageSize: 100,
					}
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						this.data2 = res.data.result.data;
					}
				});
			},
			addRole() {
				this.pRoleAddData.mids=this.$refs.tree.getCheckedKeys().join(',');
				console.log(this.pRoleAddData);
				if(this.pRoleAddData.name.length < 1)
					return this.$message('请填写用角色名称');
				if(this.pRoleAddData.mids.length < 1)
					return this.$message('请选择至少一个菜单');
				this.$axios({
					method: 'post',
					url: '/mgrsite/role/saveOrUpdate.do',
					params: this.pRoleAddData,
				}).then(res => {
					if(res.data.success) {
						this.$message({
							type: 'success',
							message: res.data.result
						});
						this.$router.push('/home/system/bRoleList')
					} else {
						this.$message(res.data.errorMsg);
					}
				}).catch(res => {
					this.$message(res);
				});
			},
		}
	}
</script>

<style scoped="scoped">
	.input-box {
		width: 100%;
		margin: 0 auto;
		margin-bottom: 20px;
		position: relative;
		padding: 0 40px;
	}
	
	.input-box span {
		width: 150px;
	}
	
	.input-box input {
		width: calc( 100% - 151px);
		max-width: 500px;
		margin-top: 6px;
		color: #333;
	}
	
	.input-box .menuTree {
		width: calc( 100% - 151px);
		max-width: 500px;
		margin-top: 6px;
		color: #333;
		display: inline-block;
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