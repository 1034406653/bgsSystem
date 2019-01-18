<template>
	<el-container>
		<el-header class='header-menu'>解仓列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">

				<template>
					<span style="color: #666;font-size: 14px;margin-left: 40px;"></span>
					<el-select v-model="pLockingData.tokenType">
						<el-option v-for="item in tokenTypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
				<div class="inputbox">
					<input type="text" placeholder="手机号/用户名筛选" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>
			</div>
			<template>
				<el-table :data="lockingList" style="width: 100%" stripe>
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
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleSelect(scope.row)">选择</el-button>
							<el-button size="mini" @click="handleTransfer(scope.row)">转账</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pLockingData.currentPage" :page-size="pLockingData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>

		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				lockingList: [],
				pLockingData: {
					currentPage: 1,
					pageSize: 10,
					keyword: '',
					tokenType: "",
				},
				totalCount: 10,
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
				}]
			}
		},
		watch: {
			pLockingData: {
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
				var that = this;
				this.$axios({
					method: 'get',
					url: '/mgrsite/waitUnlockOrder.do',
					params: this.pLockingData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						that.totalCount = res.data.result.totalCount;
						that.lockingList = res.data.result.data;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleSelect() {
				this.$message('没有接口')
			},
			handleTransfer() {
				this.$message('没有接口')
			},
			handleCurrentChange(val) {
				this.pLockingData.currentPage = val;
				this.init();
			},

			searchKeyword() {
				this.pLockingData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pLockingData.keyword = '';
				this.pLockingData.currentPage = 1;
				this.pLockingData.tokenType = '';
				this.init();
			},
		}
	}
</script>

<style scoped="scoped">

</style>