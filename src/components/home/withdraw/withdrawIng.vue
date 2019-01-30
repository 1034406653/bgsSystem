<template>
	<el-container>
		<el-header class='header-menu'>申请列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<template>
					<span style="color: #666;font-size: 14px;">货币类型：</span>
					<el-select v-model="pWithdrawIngData.tokenType">
						<el-option v-for="item in tokenTypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
				<template>
					<el-date-picker v-model="pTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="timePick">
					</el-date-picker>
				</template>
				<div class="inputbox">
					<input type="text" placeholder="手机号/昵称筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>
			</div>
			<template>
				<el-table :data="withdrawIngList" style="width: 100%" stripe>
					<el-table-column prop="createdTime" label="时间">
					</el-table-column>
					<el-table-column prop="uid" label="UID(用户ID)">
					</el-table-column>
					<el-table-column prop="uid" label="WID(提现ID)">
					</el-table-column>
					<el-table-column prop="nickName" label="昵称">
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column label="货币类型">
						<template slot-scope="scope">
							<span v-if="scope.row.tokenType=='1'">ETH</span>
							<span v-if="scope.row.tokenType=='2'">EOS</span>
							<span v-if="scope.row.tokenType=='3'">BGS</span>
						</template>
					</el-table-column>
					<el-table-column prop="amount" label="数量">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleCheck(scope.row)">审核</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pWithdrawIngData.currentPage" :page-size="pWithdrawIngData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				withdrawIngList: [],
				pWithdrawIngData: {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					beginDate: "",
					endDate: "",
					tokenType: "",
				},
				totalCount: 6,
				keyword: "",
				tokenTypeList: [{
					value: '1',
					label: 'ETH'
				}, {
					value: '2',
					label: 'EOS'
				}, {
					value: '3',
					label: 'BGS'
				}],
				pTime: "",
				timePick: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
				},
			}
		},
		watch: {
			pTime: {
				handler: function(val, oldval) {
					if(val) {
						this.pWithdrawIngData.beginDate = val[0].toLocaleString().split(' ')[0].replace("/", "-").replace("/", "-");
						this.pWithdrawIngData.endDate = val[1].toLocaleString().split(' ')[0].replace("/", "-").replace("/", "-");
					} else {
						this.pWithdrawIngData.beginDate = '';
						this.pWithdrawIngData.endDate = '';
					}
				},
				deep: true
			},
			pWithdrawIngData: {
				handler: function(val, oldval) {
					this.init();
				},
				deep: true
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/withdrawMoney/apply.do',
					params: this.pWithdrawIngData,
				}).then(res => {
					console.log(res)
					this.totalCount = res.data.result.totalCount;
					this.withdrawIngList = res.data.result.data;
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pWithdrawIngData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pWithdrawIngData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pWithdrawIngData = {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					beginDate: "",
					endDate: "",
					tokenType: "",
				}
				this.pTime = '';
				this.init();
			},
			handleCheck(itemData) {
				console.log(itemData);
				let pCheckData = {};
				pCheckData.UID = itemData.uid;
				pCheckData.WID = itemData.wid;
				pCheckData.tokenType = itemData.tokenType;
				pCheckData.tokenAmount = itemData.amount;
				if(pCheckData.tokenType == 1) {
					pCheckData.gasPrice = 0.00010
				}
				if(pCheckData.tokenType == 2) {
					pCheckData.gasPrice = 0
				}
				if(pCheckData.tokenType == 3) {
					pCheckData.gasPrice = 0.00027
				}
				pCheckData.auditor = window.localStorage.getItem('realName') || '找不到用户真实姓名';
				this.$prompt('请填写备注', {
					confirmButtonText: '同意',
					cancelButtonText: '拒绝',
				}).then(({
					value
				}) => {
					pCheckData.remark = value || '无备注';
					pCheckData.status = 1;
					this.$axios({
						method: 'post',
						url: '/mgrsite/withdrawMoney/audit.do',
						data: pCheckData,
					}).then(res => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '审核成功'
						});
						this.init();
					}).catch(error => {
						this.$message(error);
					});
				}).catch((value) => {
					pCheckData.remark = value || '无备注';
					pCheckData.status = 2;
					this.$axios({
						method: 'post',
						url: '/mgrsite/withdrawMoney/audit.do',
						data: pCheckData,
					}).then(res => {
						console.log(res);
						this.$message('你拒绝了该申请');
						this.init();
					}).catch(error => {
						this.$message(error);
					});
				});

			}
		},
	}
</script>
<style scoped="scoped">

</style>