<template>
	<el-container>
		<el-header class='header-menu'>用户反馈</el-header>
		<el-main class='table-main'>
			<template>
				<el-table :data="feedbackList" style="width: 100%" stripe>
					<el-table-column prop="createTime" label="时间">
					</el-table-column>
					<el-table-column prop="uid" label="UID">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名">
					</el-table-column>
					<el-table-column prop="phoneNumber" label="手机号">
					</el-table-column>
					<el-table-column prop="contact" label="联系方式">
					</el-table-column>
					<el-table-column prop="content" label="反馈内容">
					</el-table-column>
					<!--<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click='handleDeal'>处理</el-button>
						</template>
					</el-table-column>-->
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pFeedbackData.currentPage" :page-size="pFeedbackData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				feedbackList: [],
				pFeedbackData: {
					currentPage: 1,
					pageSize: 8,
					keyword: '',
				},
				totalCount: 8,
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				var that = this;
				this.$axios({
					method: 'get',
					url: '/mgrsite/userFeedbackList.do',
					params: this.pFeedbackData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						that.totalCount = res.data.result.totalCount;
						that.feedbackList = res.data.result.data;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleCurrentChange(val) {
				this.pFeedbackData.currentPage = val;
				this.init();
			},
			handleDeal(){
				this.$message('没有接口')
			}
		}
	}
</script>
<style scoped="scoped">
</style>