<template>
	<el-container>
		<el-header class='header-menu'>审核成功</el-header>
		<el-main class='table-main'>
			<a :href="export2Excel" class="export2Excel">导出Excel</a>
			<div class="search-box">
				<template>
					<span style="color: #666;font-size: 14px; margin-left: 40px;">货币类型：</span>
					<el-select v-model="pWithdrawSuccessData.tokenType">
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
				<el-table :data="withdrawSuccessList" style="width: 100%" stripe>
					<el-table-column prop="auditTime" label="审核时间">
					</el-table-column>
					<el-table-column prop="auditor" label="审核人">
					</el-table-column>
					<el-table-column prop="createdTime" label="申请时间">
					</el-table-column>
					<el-table-column prop="uid" label="UID">
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
					<el-table-column prop="amount" label="金额">
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pWithdrawSuccessData.currentPage" :page-size="pWithdrawSuccessData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				export2Excel: "",
				withdrawSuccessList: [],
				pWithdrawSuccessData: {
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
						this.pWithdrawSuccessData.beginDate = val[0].toLocaleString().split(' ')[0].replace("/", "-").replace("/", "-");
						this.pWithdrawSuccessData.endDate = val[1].toLocaleString().split(' ')[0].replace("/", "-").replace("/", "-");
					} else {
						this.pWithdrawSuccessData.beginDate = '';
						this.pWithdrawSuccessData.endDate = '';
					}
				},
				deep: true
			},
			pWithdrawSuccessData: {
				handler: function(val, oldval) {
					this.init();
				},
				deep: true
			},
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/withdrawMoney/pass/exportData.do';
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/withdrawMoney/pass.do',
					params: this.pWithdrawSuccessData,
				}).then(res => {
					console.log(res);
					this.totalCount = res.data.result.totalCount;
					this.withdrawSuccessList = res.data.result.data;
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pWithdrawSuccessData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pWithdrawSuccessData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pWithdrawSuccessData = {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					beginDate: "",
					endDate: "",
					tokenType: "",
				};
				this.pTime = '';
				this.init();
			},
		},
	}
</script>
<style scoped="scoped">

</style>