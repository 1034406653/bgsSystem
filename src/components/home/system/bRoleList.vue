<template>
	<el-container>
		<el-header class='header-menu'>角色管理</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<div class="inputbox">
					<el-button @click="$router.push('/home/system/bRoleAdd')">创建角色</el-button>
				</div>
			</div>
			<template>
				<el-table :data="bRoleLimitList" style="width: 100%" stripe>
					<el-table-column prop="name" label="角色名称">
					</el-table-column>
					<el-table-column prop="menus" label="菜单" >	
					</el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.row.rid)">编辑</el-button>
							<el-button size="mini" type='danger' @click="handleDelete(scope.row.rid)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				bRoleLimitList: [],
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				var that = this;
				this.$axios({
					method: 'get',
					url: '/mgrsite/rolePage.do',
				}).then(res => {
					console.log(res.data.result);
					if(res.status == 200) {
						let listData=res.data.result;
						listData.forEach(function(x,i){
							let menuList='';
							listData[i].menus.forEach((y,z)=>{
								menuList+=y.text+',';
							})
							listData[i].menus=menuList;
						})
						that.bRoleLimitList = listData;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleDelete(rid){
				this.$confirm('确定要删除该角色吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/mgrsite/role/delete.do',
						data: {
							rid: rid,
						},
					}).then(res => {
						if(res.data.success) {
							this.$message({
								type: 'success',
								message: res.data.result
							});
							this.init();
						} else {
							this.$message(res.data.errorMsg);
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
		}
	}
</script>

<style scoped="scoped">

</style>