<template>
	<el-container>
		<el-header class='header-menu'>用户列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<a :href="export2Excel" class="export2Excel">导出Excel</a>
				<div class="inputbox">
					<input type="text" placeholder="手机号/用户名筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>
			</div>
			<template>
				<el-table :data="userList" style="width: 100%" stripe>
					<el-table-column prop="uid" label="ID">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名">
					</el-table-column>
					<el-table-column label="头像">
						<template slot-scope="scope">
							<img :src="scope.row.headPhoto" class="headPhoto" />
						</template>
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="sex" label="性别" width="100">
					</el-table-column>
					<el-table-column prop="invitedCode" label="邀请码">
					</el-table-column>
					<el-table-column prop="inviter" label="邀请人">
					</el-table-column>
					<el-table-column prop="isAgency" label="代理人">
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if='scope.row.state==0'>正常</span>
							<span v-if='scope.row.state==1'>禁用</span>
						</template>
					</el-table-column>
					<el-table-column label="实名认证">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleRealname(scope.row.uid)" v-if='scope.row.status==2'>查看</el-button>
							<span v-if='scope.row.status==1'>否</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleBlock(scope.row.uid)" v-if='scope.row.state==0'>禁用</el-button>
							<el-button size="mini" @click="handleRecover(scope.row.uid)" v-if='scope.row.state==1'>恢复</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pUserData.currentPage" :page-size="pUserData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
			<div class="modal-box" v-if='realName.show'>
				<div class="modal-hide" @click="realName.show=false">
					<i class="el-icon-close"></i>
				</div>
				<div class="input-box">
					<span>UID</span>
					<p>{{realName.realAuth.uid}}</p>
				</div>
				<div class="input-box">
					<span>身份证正面：</span>
					<img :src="realName.realAuth.idcardFront" />
				</div>
				<div class="input-box">
					<span>身份证反面：</span>
					<img :src="realName.realAuth.idcardBack" />
				</div>
				<div class="input-box">
					<span>身份证号：</span>
					<p>{{realName.realAuth.idcardNumber}}</p>
				</div>
				<div class="input-box">
					<span>真实姓名：</span>
					<p>{{realName.realAuth.realName}}</p>
				</div>
			</div>
			<div class="mark-box-lxl" v-if='realName.show'></div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				export2Excel: "",
				userList: [],
				pUserData: {
					currentPage: 1,
					pageSize: 5,
					keyword: '',
				},
				totalCount: 10,
				keyword: "",
				realName: {
					show: false,
					realAuth: {
						"uid": "",
						"realName": "",
						"idcardNumber": "",
						"idcardFront": "",
						"idcardBack": "",
					}
				}
			}
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/users/exportData.do';
			this.init();
		},
		methods: {
			init() {
				var that = this;
				this.$axios({
					method: 'get',
					url: '/mgrsite/users.do',
					params: this.pUserData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						that.totalCount = res.data.result.totalCount;
						that.userList = res.data.result.data;
						that.userList.forEach((x, i) => {
							/*头像*/
							that.userList[i].headPhoto = 'data:image/jpeg;base64,' + x.headPhoto;
							/*性别*/
							if(x.sex == 0) that.userList[i].sex = '女';
							if(x.sex == 1) that.userList[i].sex = '男';
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pUserData.currentPage = val;
				this.init();
			},
			handleRealname(userData) {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/realAuth.do',
					params: {
						UID: userData
					},
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						if(!res.data.success)
							return this.$message(res.data.errorMsg);
						this.realName.realAuth = res.data.result;
						this.realName.realAuth.idcardFront = 'data:image/jpeg;base64,' + this.realName.realAuth.idcardFront;
						this.realName.realAuth.idcardBack = 'data:image/jpeg;base64,' + this.realName.realAuth.idcardFront;
						this.realName.show = true;
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
				console.log(userData);
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
							UID: userData,
							state: 1,
						},
					}).then(res => {
						console.log(res);
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
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			handleRecover(userData) {
				console.log(userData);
				let that = this;
				this.$confirm('确定要解禁该用户吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
						method: 'post',
						url: '/mgrsite/users/changeStatus.do',
						params: {
							UID: userData,
							state: 0,
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
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},

		},
		activated() {
			if(this.$route.query.uid) {
				this.pUserData.keyword = this.$route.query.uid || '';
				this.keyword = this.pUserData.keyword;
				this.init();
			}
		}
	}
</script>

<style scoped="scoped">
</style>