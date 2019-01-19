<template>
	<el-container>
		<el-header class='header-menu'>区块链钱包</el-header>
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
				<el-table :data="blockchainList" style="width: 100%" stripe>
					<el-table-column prop="userBasic.uid" label="ID">
					</el-table-column>
					<el-table-column prop="userBasic.nickName" label="用户名">
					</el-table-column>
					<el-table-column prop="userBasic.phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="ethtoken.ethaddress" label="ETH地址">
					</el-table-column>
					<el-table-column prop="ethtoken.amount" label="ETH钱包余额">
					</el-table-column>
					<el-table-column prop="ethtoken.canLock" label="ETH锁定金">
					</el-table-column>
					<el-table-column prop="eostoken.eosaccountName" label="EOS地址">
					</el-table-column>
					<el-table-column prop="eostoken.amount" label="EOS钱包余额">
					</el-table-column>
					<el-table-column prop="eostoken.canLock" label="EOS锁定金">
					</el-table-column>
					<el-table-column prop="bgstoken.ethaddress" label="BGS地址">
					</el-table-column>
					<el-table-column prop="bgstoken.amount" label="BGS钱包余额">
					</el-table-column>
					<el-table-column prop="bgstoken.canLock" label="BGS锁定金">
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pBlockchainData.currentPage" :page-size="pBlockchainData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
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
				blockchainList: [],
				pBlockchainData: {
					currentPage: 1,
					pageSize: 8,
					keyword: '',
					
				},
				totalCount: 8,
				keyword: "",
			}
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/users/chainWallet/exportData.do';
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/chainWallet.do',
					params: this.pBlockchainData,
				}).then(res => {
					this.totalCount = res.data.result.totalCount;
					this.blockchainList = res.data.result.data;
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pBlockchainData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pBlockchainData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pBlockchainData.keyword = '';
				this.pBlockchainData.currentPage = 1;
				this.init();
			},
		},
	}
</script>

<style scoped="scoped">
</style>