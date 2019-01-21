<template>
	<el-container>
		<el-header class='header-menu'>基础设置</el-header>
		<div class="search-box">
			<el-button @click='handleWalletBack'>钱包回收</el-button>
		</div>
		<el-main class='table-main'>
			<template>
				<el-table :data="bFunctionList" style="width: 100%" stripe>
					<el-table-column prop="explain" label="中文解释">
					</el-table-column>
					<el-table-column prop="confName" label="参数名">
					</el-table-column>
					<el-table-column prop="confValue" label="参数">
					</el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<el-button size="mini" @click='handleConfig(scope.row)'>修改</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-main>
		<div class="modal-box" v-if='changeConfig.show'>
			<div class="modal-hide" @click="changeConfig.show=false">
				<i class="el-icon-close"></i>
			</div>
			<div class="input-box">
				<span>中文解释</span>
				<span>{{changeConfig.config.explain}}</span>
			</div>
			<div class="input-box">
				<span>参数名</span>
				<span>{{changeConfig.config.confName}}</span>
			</div>
			<div class="input-box">
				<span>参数</span>
				<input type="text" v-model="changeConfig.config.confValue" />
			</div>
			<el-button type='primary' @click='handleChangeConfig' class="confirmBtn">保存</el-button>
		</div>
		<div class="mark-box-lxl" v-if='changeConfig.show'></div>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				bFunctionList: [],
				changeConfig: {
					show: false,
					config: {
						confName: "",
						confValue: "",
						explain: "",
					}
				}
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
					url: '/mgrsite/conf.do',
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						this.bFunctionList = res.data.result;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleConfig(config) {
				this.changeConfig.config = config;
				this.changeConfig.show = true;
			},
			handleChangeConfig() {
				if(!this.changeConfig.config.confValue)
					return this.$message('请填写参数');
				this.$axios({
					method: 'post',
					url: '/mgrsite/updateConf.do',
					data: {
						confName: this.changeConfig.config.confName,
						confValue: this.changeConfig.config.confValue,
					},
				}).then(res => {
					if(res.status == 200) {
						this.$message({
							type: 'success',
							message: res.data.result
						});
						this.changeConfig.show = false;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleWalletBack() {
				this.$confirm('确定要回收钱包吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/mgrsite/recycleEOSWallet.do',
					}).then(res => {
						console.log(res);
						if(res.data.status==0) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
						} else {
							this.$message(res.data.msg);
						}
					});
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.confirmBtn {
		display: block;
		margin: 0 auto;
		margin-top: 50px;
	}
</style>