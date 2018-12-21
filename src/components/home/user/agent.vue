<template>
	<el-container>
		<el-header class='header-menu'>代理人</el-header>
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
				<el-table :data="inviteList" style="width: 100%" stripe>
					<el-table-column prop="createdTime" label="成为代理人时间">
					</el-table-column>
					<el-table-column prop="uid" label="	UID">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名">
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="lowerAmount" label="下级人数">
					</el-table-column>
					<el-table-column label="下级列表">
						<template slot-scope="scope">
							<el-button size="mini" @click="handlewatch(scope.row)">查看列表</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pInviteData.currentPage" :page-size="pInviteData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
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
				inviteList: [],
				pInviteData: {
					currentPage: 1,
					pageSize: 5,
					keyword: '',
				},
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
					url: '/mgrsite/users/agents.do',
					params: this.pInviteData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						this.totalCount = res.data.result.totalCount;
						this.inviteList = res.data.result.data;
						this.inviteList.forEach((x, i) => {
							/*头像*/
							this.inviteList[i].headPhoto = 'data:image/jpeg;base64,' + x.headPhoto;
							/*性别*/
							if(x.sex == 0) this.inviteList[i].sex = '__';
							if(x.sex == 1) this.inviteList[i].sex = '男';
							if(x.sex == 2) this.inviteList[i].sex = '女';
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
				this.pInviteData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pInviteData.keyword = '';
				this.pInviteData.currentPage = 1;
				this.init();
			},
			handlewatch(userData){
				
			}
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