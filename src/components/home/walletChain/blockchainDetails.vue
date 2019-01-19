<template>
	<el-container>
		<el-header class='header-menu'>区块链钱包明细</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<a :href="export2Excel" class="export2Excel">导出Excel</a>
				<template>
					<span style="color: #666;font-size: 14px;margin-left: 40px;">转账类型：</span>
					<el-select v-model="pBlockchainDetailsData.transferType">
						<el-option v-for="item in transferTypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
				<template>
					<el-date-picker v-model="pTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  :picker-options="timePick">
					</el-date-picker>
				</template>
				<div class="inputbox">
					<input type="text" placeholder="手机号/昵称筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>
			</div>
			<template>
				<el-table :data="blockchainDetailsList" style="width: 100%" stripe>
					<el-table-column prop="createdTime" label="时间">
					</el-table-column>
					<el-table-column prop="uid" label="UID">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名">
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="transferId" label="转账id">
					</el-table-column>
					<el-table-column prop="amount" label="数量">
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status=='0'">成功</span>
							<span v-if="scope.row.status=='1'">失败</span>
						</template>
					</el-table-column>
					<el-table-column label="货币类型">
						<template slot-scope="scope">
							<span v-if="scope.row.tokenType=='1'">ETH</span>
							<span v-if="scope.row.tokenType=='2'">EOS</span>
							<span v-if="scope.row.tokenType=='3'">BGS</span>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pBlockchainDetailsData.currentPage" :page-size="pBlockchainDetailsData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
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
				blockchainDetailsList: [],
				pBlockchainDetailsData: {
					currentPage: 1,
					pageSize: 10,
					keyword: '',
					transferType: "1",
					beginDate:"",
					endDate:"",
				},
				pTime: "",
				timePick: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
				},
				totalCount: 10,
				keyword: "",
				transferType: "链上钱包转到中心钱包",
				transferTypeList: [{
					value: '1',
					label: '链上钱包转到中心钱包'
				}, {
					value: '2',
					label: '链上钱包转到链上钱包'
				}, {
					value: '3',
					label: '链上钱包锁入中心钱包'
				}, {
					value: '4',
					label: 'Dapp游戏支出'
				}, {
					value: '5',
					label: '购买代理人支出'
				}, {
					value: '6',
					label: '买EOS的RAM支出'
				}, {
					value: '7',
					label: '买EOS的CPU和NET支出'
				}]
			}
		},
		mounted() {
			this.export2Excel = this.$baseURL + '/mgrsite/users/chainWalletItem/exportData.do';
			this.init();
		},
		watch: {
			pTime: {
				handler: function(val, oldval) {
					if(val){
						this.pBlockchainDetailsData.beginDate=val[0].toLocaleString().split(' ')[0].replace("/","-").replace("/","-");
						this.pBlockchainDetailsData.endDate=val[1].toLocaleString().split(' ')[0].replace("/","-").replace("/","-");
					}else{
						this.pBlockchainDetailsData.beginDate='';
						this.pBlockchainDetailsData.endDate='';
					}
				},
				deep: true
			},
			pBlockchainDetailsData:{
				handler: function(val, oldval) {
					this.init();
				},
				deep: true
			},
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/users/chainWalletItem.do',
					params: this.pBlockchainDetailsData,
				}).then(res => {
					this.totalCount = res.data.result.totalCount;
					this.blockchainDetailsList = res.data.result.data;
					console.log(res);
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pBlockchainDetailsData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pBlockchainDetailsData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pBlockchainDetailsData.keyword = '';
				this.pBlockchainDetailsData.currentPage = 1;
				this.init();
			},
		},
	}
</script>

<style scoped="scoped">
</style>