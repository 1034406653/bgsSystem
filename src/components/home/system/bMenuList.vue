<template>
	<el-container>
		<el-header class='header-menu'>菜单列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<div class="inputbox">
					<el-button @click="$router.push('/home/system/bMenuAdd')">创建菜单</el-button>
				</div>
			</div>
			<template>
				<el-table :data="bMenuList" style="width: 100%" stripe>
					<el-table-column prop="rid" label="角色ID">
					</el-table-column>
					<el-table-column prop="sn" label="角色编号">
					</el-table-column>
					<el-table-column prop="name" label="角色名称">
					</el-table-column>
					<el-table-column prop="permissions" label="权限">
					</el-table-column>
					<el-table-column prop="menus" label="菜单">
					</el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.row.rid)">编辑</el-button>
							<el-button size="mini" type='danger' @click="handleDelete(scope.row.rid)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination-box">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="pbMenuData.currentPage" :page-size="pbMenuData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
				</div>
			</template>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				bMenuList: [],
				pbMenuData: {
					currentPage: 1,
					pageSize: 6,
				},
				totalCount: 6,
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
					url: '/mgrsite/menuPage.do',
					params: this.pbMenuData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						that.bMenuList = res.data.result;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pbMenuData.currentPage = val;
				this.init();
			},
			handleDelete(rid) {
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
							that.$message(res.data.errorMsg);
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