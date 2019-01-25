<template>
	<el-container>
		<el-header class='header-menu'>系统日志</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<div class="inputbox">
					<template>
						<el-date-picker v-model="pTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="timePick">
						</el-date-picker>
					</template>
					<input type="text" placeholder="操作人/操作方法" v-model="keyword" />
					<el-button icon="el-icon-search" circle @click='searchKeyword'></el-button>
					<el-button icon="el-icon-refresh" circle @click='refreshKeyword'></el-button>
				</div>

			</div>
			<template>
				<el-table :data="operationLogList" style="width: 100%" stripe>
					<el-table-column prop="sid" label="日志id">
					</el-table-column>
					<el-table-column prop="opuserId" label="操作人id">
					</el-table-column>
					<el-table-column prop="optime" label="操作时间">
					</el-table-column>
					<el-table-column prop="ipaddr" label="操作ip">
					</el-table-column>
					<el-table-column prop="function" label="操作方法">
					</el-table-column>
					<el-table-column prop="opusername" label="操作人">
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pOperationLogData.currentPage" :page-size="pOperationLogData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				operationLogList: [],
				pOperationLogData: {
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					beginDate:"",
					endDate:"",
				},
				totalCount: 6,
				keyword: "",
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
					if(val){
						this.pOperationLogData.beginDate=val[0].toLocaleString().split(' ')[0].replace("/","-").replace("/","-");
						this.pOperationLogData.endDate=val[1].toLocaleString().split(' ')[0].replace("/","-").replace("/","-");
					}else{
						this.pOperationLogData.beginDate='';
						this.pOperationLogData.endDate='';
					}
				},
				deep: true
			},
			pOperationLogData:{
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
					url: '/mgrsite/systemlogList.do',
					params: this.pOperationLogData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						that.totalCount = res.data.result.totalCount;
						that.operationLogList = res.data.result.data;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pOperationLogData.currentPage = val;
				this.init();
			},
			searchKeyword() {
				this.pOperationLogData.keyword = this.keyword;
				this.init();
			},
			refreshKeyword() {
				this.keyword = '';
				this.pOperationLogData={
					currentPage: 1,
					pageSize: 6,
					keyword: '',
					beginDate:"",
					endDate:"",
				};
				this.pTime='';
				this.init();
			},
		},
	}
</script>

<style scoped="scoped">

</style>