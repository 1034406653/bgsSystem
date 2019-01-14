<template>
	<el-container>
		<el-header class='header-menu'>代理人</el-header>
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
				<el-table :data="inviteList" style="width: 100%" stripe>
					<el-table-column label="UID">
						<template slot-scope="scope">
							<span @click="navUserList(scope.row.phoneNumber)" style="cursor: pointer;">{{scope.row.uid}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="createdTime" label="成为代理人时间">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名">
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="lowerAmount" label="下级人数">
					</el-table-column>
					<el-table-column prop="totalIncome" label="收益">
					</el-table-column>
					<el-table-column label="下级列表">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleWatch(scope.row)">查看列表</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pInviteData.currentPage" :page-size="pInviteData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
			<div class="lowerList-box" v-if='lowerListShow'>
				<div class="lowerListHide" @click="lowerListShow=false">
					<i class="el-icon-close"></i>
				</div>
				<ul class="listTh">
					<li><span>UID</span><span>用户名</span><span>手机号</span><span>邀请时间</span></li>
				</ul>
				<ul class="listTd">
					<li v-for="item in lowerList">
						<span style="cursor: pointer;" @click="navUserList(item.phoneNumber)">{{item.uid}}</span><span>{{item.nickName}}</span><span>{{item.phoneNumber}}</span><span>{{item.createdTime}}</span>
					</li>
					<li v-if='lowerList<1'>暂无数据~~</li>
				</ul>
			</div>
			<div class="mark-box-lxl" v-if='lowerListShow'></div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				export2Excel: "",
				inviteList: [],
				pInviteData: {
					currentPage: 1,
					pageSize: 5,
					keyword: '',
				},
				totalCount: 10,
				keyword: "",
				lowerListShow: false,
				lowerList: [],
			}
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/users/agents/exportData.do';
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
					console.log(res);
					/*if(res.status == 200) {
						if(!res.data.success)
							return this.$message(res.data.errorMsg);
						this.$message('用户进行实名认证了');
					}*/
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
			handleWatch(userData) {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/lowers.do',
					params: {
						currentPage: 1,
						pageSize: 1000,
						BUID: userData.uid,
					},
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.lowerList = res.data.result.data;
						this.lowerListShow = true;
					}
				});
			},
			navUserList(uid){
				this.$router.push({
					'path':'/home/user/userList',
					'query':{
						uid:uid
					}
				})
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
	.lowerList-box{
		width: 800px;
		height: auto;
		position: fixed;
		top: 100px;
		left: 50%;
		margin-left: -400px;
		background: #fff;
		z-index: 10001;
		box-shadow: 0px 0px 10px #ddd;
		padding: 40px;
	}
	.lowerListHide{
		position: absolute;
		right: 14px;
		top: 14px;
		width: 30px;
		height: 30px;
		color: #aaa;
		font-size: 26px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
	}
	.lowerList-box ul.listTd{
		max-height: 500px;
		overflow: auto;
	}
	.lowerList-box ul li{
		width: 100%;
		height: auto;
		line-height: 30px;
		color: #666;
		font-size: 14px;
		text-align: center;
		overflow: hidden;
	}
	.lowerList-box ul.listTd li:nth-of-type(2n+1){
		background: #ededed;
	}
	.lowerList-box ul.listTh li{
		font-size: 16px;
		line-height: 50px;
	}
	.lowerList-box ul li span{
		width: 25%;
		float: left;
	}
</style>