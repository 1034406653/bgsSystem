<template>
	<el-container>
		<el-header class='header-menu'>提现申请列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<template>
					<span style="color: #666;font-size: 14px;">货币类型：</span>
					<el-select v-model="pWithdrawIngData.tokenType">
						<el-option v-for="item in tokenTypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
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
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini"  @click="handleCheck(scope.row)">审核</el-button>
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
					pageSize: 8,
					keyword: '',
					beginDate:"",
					endDate:"",
					tokenType:"",
				},
				totalCount: 8,
				keyword:"",
				tokenTypeList: [{
					value: '1',
					label: 'ETH'
				}, {
					value: '2',
					label: 'EOS'
				}, {
					value: '3',
					label: 'BGS'
				}]
				
			}
		},
		watch:{
				pWithdrawIngData:{
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
				this.pWithdrawIngData.keyword = '';
				this.pWithdrawIngData.currentPage = 1;
				this.pWithdrawIngData.tokenType = '';
				this.init();
			},
			handleCheck(){
				this.$message('没有接口');
			}
		},
	}
</script>
<style scoped="scoped">
</style>