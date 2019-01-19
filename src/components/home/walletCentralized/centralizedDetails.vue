<template>
	<el-container>
		<el-header class='header-menu'>中心钱包明细</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<a :href="export2Excel" class="export2Excel">导出Excel</a>
				<template>
					<span style="color: #666;font-size: 14px;margin-left: 40px;">转账类型：</span>
					<el-select v-model="pCentralizedDetailsData.transferType">
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
				<el-table :data="centralizedDetailsList" style="width: 100%" stripe>
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
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pCentralizedDetailsData.currentPage" :page-size="pCentralizedDetailsData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
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
				centralizedDetailsList: [],
				pCentralizedDetailsData: {
					currentPage: 1,
					pageSize: 10,
					keyword: '',
					transferType: "8",
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
					value: '8',
					label: '中心钱包转到链上钱包'
				}, {
					value: '9',
					label: '注册获得BGS'
				}, {
					value: '10',
					label: '邀请获得BGS '
				}, {
					value: '11',
					label: '锁仓获得收益'
				}, {
					value: '12',
					label: '代理获得收益'
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
						this.pCentralizedDetailsData.beginDate=val[0].toLocaleString().split(' ')[0].replace("/","-").replace("/","-");
						this.pCentralizedDetailsData.endDate=val[1].toLocaleString().split(' ')[0].replace("/","-").replace("/","-");
					}else{
						this.pCentralizedDetailsData.beginDate='';
						this.pCentralizedDetailsData.endDate='';
					}
				},
				deep: true
			},
			pCentralizedDetailsData:{
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
					url: '/mgrsite/users/centWalletItem.do',
					params: this.pCentralizedDetailsData,
				}).then(res => {
					this.totalCount = res.data.result.totalCount;
					this.centralizedDetailsList = res.data.result.data;
					console.log(res);
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pCentralizedDetailsData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pCentralizedDetailsData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pCentralizedDetailsData.keyword = '';
				this.pCentralizedDetailsData.currentPage = 1;
				this.init();
			},
		},
	}
</script>

<style scoped="scoped">
	
</style>