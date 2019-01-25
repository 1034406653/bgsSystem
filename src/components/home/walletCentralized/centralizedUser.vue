<template>
	<el-container>
		<el-header class='header-menu'>用户钱包</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<a :href="export2Excel" class="export2Excel">导出Excel</a>
				<div class="inputbox">
					<input type="text" placeholder="手机号/昵称筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>
			</div>
			<template>
				<el-table :data="centralizedList" style="width: 100%" stripe>	
					
					<el-table-column prop="userBasic.nickName" label="用户名">
					</el-table-column>
					<el-table-column prop="userBasic.phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="ethtoken.amount" label="ETH钱包余额">
					</el-table-column>
					<el-table-column prop="eostoken.amount" label="EOS钱包余额">
					</el-table-column>
					<el-table-column prop="bgstoken.amount" label="BGS钱包余额">
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pCentralizedData.currentPage" :page-size="pCentralizedData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
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
				centralizedList: [],
				pCentralizedData: {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
				},
				totalCount: 6,
				keyword: "",
			}
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/users/centWallet/exportData.do';
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/centWallet.do',
					params: this.pCentralizedData,
				}).then(res => {
					console.log(res);
					this.totalCount = res.data.result.totalCount;
					this.centralizedList = res.data.result.data;
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pCentralizedData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pCentralizedData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pCentralizedData = {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
				};
				this.init();
			},
		},
	}
</script>

<style scoped="scoped">

</style>