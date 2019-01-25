<template>
	<el-container>
		<el-header class='header-menu'>锁仓订单</el-header>
		<el-main class='table-main'>
			<a :href="export2Excel" class="export2Excel">导出Excel</a>
			<div class="search-box">
				<template>
					<span style="color: #666;font-size: 14px;margin-left: 40px;"></span>
					<el-select v-model="pLockedData.tokenType">
						<el-option v-for="item in tokenTypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
				<template>
					<el-date-picker v-model="pTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="timePick">
					</el-date-picker>
				</template>
				<div class="inputbox">
					<input type="text" placeholder="手机号/用户名筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>
			</div>
			<template>
				<el-table :data="lockedList" style="width: 100%" stripe>
					<el-table-column prop="uid" label="用户id">
					</el-table-column>
					<el-table-column prop="nickName" label="昵称">
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="lid" label="锁仓id">
					</el-table-column>
					<el-table-column prop="createdTime" label="锁仓时间">
					</el-table-column>
					<el-table-column prop="period" label="锁仓时长(周期)">
					</el-table-column>
					<el-table-column prop="amount" label="锁仓金额">
					</el-table-column>

					<el-table-column label="收益">
						<template slot-scope="scope">
							<span>{{scope.row.finalProfit}}</span>
							<span v-if='scope.row.profitTokenType==1'>ETH</span>
							<span v-if='scope.row.profitTokenType==2'>EOS</span>
							<span v-if='scope.row.profitTokenType==3'>BGS</span>
						</template>
					</el-table-column>
					<el-table-column label="锁仓类型">
						<template slot-scope="scope">
							<span v-if='scope.row.tokenType==1'>ETH</span>
							<span v-if='scope.row.tokenType==2'>EOS</span>
							<span v-if='scope.row.tokenType==3'>BGS</span>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<span v-if='scope.row.status==1'>收益中</span>
							<span v-if='scope.row.status==2'>归仓中</span>
							<span v-if='scope.row.status==3'>已结束</span>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pLockedData.currentPage" :page-size="pLockedData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
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
				lockedList: [],
				pLockedData: {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					tokenType: "",
					beginDate: "",
					endDate: "",
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
						this.pLockedData.beginDate = val[0].toLocaleString().split(' ')[0].replace("/", "-").replace("/", "-");
						this.pLockedData.endDate = val[1].toLocaleString().split(' ')[0].replace("/", "-").replace("/", "-");
					} else {
						this.pLockedData.beginDate = '';
						this.pLockedData.endDate = '';
					}
				},
				deep: true
			},
			pLockedData: {
				handler: function(val, oldval) {
					this.init();
				},
				deep: true
			},
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/lockOrder/exportData.do';
			this.init();
		},
		methods: {
			init() {
				var that = this;
				this.$axios({
					method: 'get',
					url: '/mgrsite/lockOrder.do',
					params: this.pLockedData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						that.totalCount = res.data.result.totalCount;
						that.lockedList = res.data.result.data;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pLockedData.currentPage = val;
				this.init();
			},

			searchKeyword() {
				this.pLockedData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pLockedData = {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					tokenType: "",
					beginDate: "",
					endDate: "",
				}
				this.pTime = '';
				this.init();
			},
		}
	}
</script>

<style scoped="scoped">

</style>