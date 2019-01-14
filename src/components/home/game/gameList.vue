<template>
	<el-container>
		<el-header class='header-menu'>游戏列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<div class="inputbox">
					<el-button @click='addGame'>新增游戏</el-button>
				</div>
			</div>
			<template>
				<el-table :data="gameList" style="width: 100%" stripe>
					<el-table-column prop="gid" label="ID">
					</el-table-column>
					<el-table-column prop="gameName" label="游戏名">
					</el-table-column>
					<el-table-column label="头像">
						<template slot-scope="scope">
							<img :src="scope.row.photo" class="headPhoto" />
						</template>
					</el-table-column>

					<el-table-column prop="link" label="连接">
					</el-table-column>
					<el-table-column prop="text" label="文本信息">
					</el-table-column>
					<el-table-column prop="joindate" label="接入时间">
					</el-table-column>
					<el-table-column prop="sort" label="排序">
					</el-table-column>
					<el-table-column prop="status" label="类型">
						<template slot-scope="scope">
							<span v-if='scope.row.type==1'>ETH</span>
							<span v-if='scope.row.type==2'>EOS</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if='scope.row.status==0'>下架</span>
							<span v-if='scope.row.status==1'>上架</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="返额">
						<template slot-scope="scope">
							<el-button size="mini">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column label="操作" width='280'>
						<template slot-scope="scope">
							<el-button size="mini" @click="handleTop(scope.row)">置顶</el-button>
							<el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
							<el-button size="mini" type="danger" @click="handleDown(scope.row)" v-if='scope.row.status==1'>下架</el-button>
							<el-button size="mini" @click="handleUp(scope.row)" v-if='scope.row.status==0'>上架</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pUserData.currentPage" :page-size="pUserData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {

				gameList: [],
				pUserData: {
					currentPage: 1,
					pageSize: 5,
				},
				totalCount: 10,
			}
		},
		mounted() {

			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/games.do',
					params: this.pUserData,
				}).then(res => {

					if(res.status == 200) {
						this.totalCount = res.data.result.totalCount;
						this.gameList = res.data.result.data;

					}
				});
			},
			handleCurrentChange(val) {
				this.init();
			},
			handleRealname(userData) {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/realAuth.do',
					params: {
						UID: userData.uid
					},
				}).then(res => {
					if(res.status == 200) {
						if(!res.data.success)
							return this.$message(res.data.errorMsg);
						this.$message('用户进行实名认证了');
					}
				});
			},
			searchKeyword() {
				this.pUserData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pUserData.keyword = '';
				this.pUserData.currentPage = 1;
				this.init();
			},
			handleDown(gameData) {
				let that = this;
				this.$confirm('确定要下架该游戏吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
						method: 'post',
						url: '/mgrsite/games/changeStatus.do',
						params: {
							gid: gameData.uid
						},
					}).then(res => {
						if(res.data.success) {
							that.init();
							that.$message({
								type: 'success',
								message: res.data.result
							});
						} else {
							that.$message(res.data.errorMsg);
						}
					});
					/**/
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			handleRecover(userData) {
				
			},
			addGame() {

			}
		},
		activated() {
			if(this.$route.query.uid) {
				this.pUserData.keyword = this.$route.query.uid || '';
				this.keyword = this.pUserData.keyword;
				this.init();
			}
		},

	}
</script>

<style scoped="scoped">
	.headPhoto {
		width: 60px;
		height: 60px;
		display: inline-block;
	}
</style>