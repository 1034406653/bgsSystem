<template>
	<el-container>
		<el-header class='header-menu'>邀请好友</el-header>
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
					<el-table-column label="用户名">
						<template slot-scope="scope">
							<span @click="navUserList(scope.row.phoneNumber)" style="cursor: pointer;">{{scope.row.nickName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="lowerAmount" label="下级人数">
					</el-table-column>
					<el-table-column label="下级列表">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleWatch(scope.row.inviterID)">查看列表</el-button>
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
						<span style="cursor: pointer;" @click="navUserList(item.phoneNumber)">{{item.uid}}</span><span>{{item.nickName}}</span><span>{{item.phoneNumber}}</span><span>{{item.invitingTime}}</span>
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
			this.export2Excel = this.$baseURL + '/mgrsite/users/inviters/exportData.do';
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/inviters.do',
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
			handleWatch(inviterID) {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/lowers.do',
					params: {
						currentPage: 1,
						pageSize: 1000,
						inviterID: inviterID,
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
</style>