<template>
	<el-container>
		<el-header class='header-menu'>用户列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<a :href="export2Excel" class="export2Excel">导出Excel</a>
				<div class="inputbox">
					<input type="text" placeholder="手机号/用户名筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword' ></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword' ></el-button>
				</div>
			</div>
			<template>
				<el-table :data="userList" style="width: 100%" stripe>
					<el-table-column prop="uid" label="ID" width="150">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名" width="150">
					</el-table-column>
					<el-table-column label="头像" width="90">
						<template slot-scope="scope">
							<img :src="scope.row.headPhoto" class="headPhoto" />
						</template>
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号" width="150">
					</el-table-column>
					<el-table-column prop="sex" label="性别" width="100">
					</el-table-column>
					<el-table-column prop="invitedCode" label="邀请码" width="100">
					</el-table-column>
					<el-table-column prop="inviter" label="邀请人" width="100">
					</el-table-column>
					<el-table-column prop="isAgency" label="代理人" width="100">
					</el-table-column>
					<el-table-column prop="status" label="状态" width="100">
						<template slot-scope="scope">
							<span v-if='scope.row.status==0'>正常</span>
							<span v-if='scope.row.status==1'>禁用</span>
						</template>
					</el-table-column>
					<el-table-column label="实名认证" prop="isAgency" width="100">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleRealname(scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleBlock(scope.row)" v-if='scope.row.status==0'>禁用</el-button>
							<el-button size="mini" @click="handleRecover(scope.row)" v-if='scope.row.status==1'>恢复</el-button>
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
				export2Excel:"",
				userList: [],
				pUserData: {
					currentPage: 1,
					pageSize: 5,
					keyword: '',
				},
				tableData: [{
						"index": 1,
						"phone_Num": "453453",
						"school_Name": "撒的发生"
					},
					{
						"index": 1,
						"phone_Num": "453453",
						"school_Name": "撒的发生"
					},
					{
						"index": 1,
						"phone_Num": "453453",
						"school_Name": "撒的发生"
					},
					{
						"index": 1,
						"phone_Num": "453453",
						"school_Name": "撒的发生"
					},
				],
				totalCount: 10,
				keyword: "",
			}
		},
		mounted() {
			this.export2Excel=this.$baseURL+'/mgrsite/users/exportData.do';
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users.do',
					params: this.pUserData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						this.totalCount = res.data.result.totalCount;
						this.userList = res.data.result.data;
						this.userList.forEach((x, i) => {
							/*头像*/
							this.userList[i].headPhoto = 'data:image/jpeg;base64,' + x.headPhoto;
							/*性别*/
							if(x.sex == 0) this.userList[i].sex = '__';
							if(x.sex == 1) this.userList[i].sex = '男';
							if(x.sex == 2) this.userList[i].sex = '女';
						})
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
			handleBlock(userData) {
				let that = this;
				this.$confirm('确定要禁用该用户吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
						method: 'post',
						url: '/mgrsite/users/changeStatus.do',
						params: {
							UID: userData.uid
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
				console.log(userData)
			},
		}
	}
</script>

<style scoped="scoped">
	.headPhoto {
		width: 60px;
		height: 60px;
		display: inline-block;
	}
</style>