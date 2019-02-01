<template>
	<el-container>
		<el-header class='header-menu'>基础设置</el-header>
		<div class="search-box">
			<el-button @click='handleWalletBack'>钱包回收</el-button>
		</div>

		<el-main class='table-main'>
			<template>
				<el-table :data="iosList" style="width: 100%" stripe>
					<el-table-column prop="IOS_APP_LOG" label="IOS更新日志">
					</el-table-column>
					<el-table-column prop="IOS_APP_VERSION" label="app版本">
					</el-table-column>
					<el-table-column prop="IOS_IOS_ID" label="appid">
					</el-table-column>
					<el-table-column prop="IOS_IS_FORCE" label="是否强制更新">
					</el-table-column>
					<el-table-column prop="IOS_IS_GROUNDING" label="是否隐藏苹果拒绝上架的东西">
					</el-table-column>
					<el-table-column prop="IOS_VERSION_SIZE" label="安装包大小">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click='handleChangeIos(scope.row)'>更新</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-main>
		<el-main class='table-main'>
			<template>
				<el-table :data="androidList" style="width: 100%" stripe>
					<el-table-column prop="ANDROID_APP_LOG" label="Android更新日志">
					</el-table-column>
					<el-table-column prop="ANDROID_APP_PATH" label="apk路径">
					</el-table-column>
					<el-table-column prop="ANDROID_APP_VERSION" label="app版本">
					</el-table-column>
					<el-table-column prop="ANDROID_IS_FORCE" label="是否强制更新">
					</el-table-column>
					<el-table-column prop="ANDROID_VERSION_SIZE" label="安装包大小">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click='handleChangeAndroid(scope.row)'>更新</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-main>

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
		
		<div class="modal-box" v-if='changeIos.show'>
			<div class="modal-hide" @click="changeIos.show=false">
				<i class="el-icon-close"></i>
			</div>
			<div class="input-box">
				<span>版本号</span>
				<input type="text" v-model='changeIos.config.appVersion' />
			</div>
			<div class="input-box">
				<span>appid</span>
				<input type="text" v-model='changeIos.config.iosId' />
			</div>
			<div class="input-box">
				<span>是否强制更新</span>
				<el-radio v-model="changeIos.config.isForce" label="0">否</el-radio>
				<el-radio v-model="changeIos.config.isForce" label="1">是</el-radio>
			</div>
			<div class="input-box">
				<span>是否隐藏苹果拒绝上架内容</span>
				<el-radio v-model="changeIos.config.isGrounding" label="0">否</el-radio>
				<el-radio v-model="changeIos.config.isGrounding" label="1">是</el-radio>
			</div>
			<div class="input-box">
				<span>安装包大小</span>
				<input type="text" v-model='changeIos.config.versionSize' />
			</div>
			<div class="input-box">
				<span>更新日志</span>
				<textarea v-model="changeIos.config.appLog"></textarea>
			</div>
			<el-button type='primary' @click='handleIosUpdate' class="confirmBtn">确定更新IOS版本</el-button>
		</div>
		<div class="mark-box-lxl" v-if='changeIos.show'></div>
		
		<div class="modal-box" v-if='changeAndroid.show'>
			<div class="modal-hide" @click="changeAndroid.show=false">
				<i class="el-icon-close"></i>
			</div>
			<div class="input-box">
				<span>版本号</span>
				<input type="text" v-model='changeAndroid.config.appVersion' />
			</div>
			<div class="input-box">
				<span>apk路径</span>
				<input type="text" v-model='changeAndroid.config.appPath' />
			</div>
			<div class="input-box">
				<span>是否强制更新</span>
				<el-radio v-model="changeAndroid.config.isForce" label="0">否</el-radio>
				<el-radio v-model="changeAndroid.config.isForce" label="1">是</el-radio>
			</div>
			<div class="input-box">
				<span>安装包大小</span>
				<input type="text" v-model='changeAndroid.config.versionSize' />
			</div>
			<div class="input-box">
				<span>更新日志</span>
				<textarea v-model="changeAndroid.config.appLog"></textarea>
			</div>
			<el-button type='primary' @click='handleAndroidUpdate' class="confirmBtn">确定更新Android版本</el-button>
		</div>
		<div class="mark-box-lxl" v-if='changeAndroid.show'></div>
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
				},
				iosList: [],
				changeIos: {
					show: false,
					
					config: {
						appLog: "",
						appVersion: "",
						iosId: "",
						isForce: '0',
						isGrounding: '0',
						versionSize: "",
					}
				},
				
				
				androidList: [],
				changeAndroid:{
					show: false,
					config: {
						appLog: "",
						appPath: "",
						appVersion: '',
						isForce: '0',
						versionSize: "",
					}
				},
				
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
					if(res.data.success) {
						this.bFunctionList = res.data.result;
					}
				}).catch(error => {
					console.log(error);
				});
				this.$axios({
					method: 'get',
					url: '/mgrsite/appUpdate/android.do',
				}).then(res => {
					if(res.data.success) {
						this.androidList[0] = {};
						this.$set(this.androidList, 0, {
							ANDROID_APP_LOG: res.data.result[0].confValue,
							ANDROID_APP_PATH: res.data.result[1].confValue,
							ANDROID_APP_VERSION: res.data.result[2].confValue,
							ANDROID_IS_FORCE: res.data.result[3].confValue,
							ANDROID_VERSION_SIZE: res.data.result[4].confValue,
							
						})
					}
				}).catch(error => {
					console.log(error);
				});
				this.$axios({
					method: 'get',
					url: '/mgrsite/appUpdate/ios.do',
				}).then(res => {
					if(res.data.success) {
						this.iosList[0] = {};
						this.$set(this.iosList, 0, {
							IOS_APP_LOG: res.data.result[0].confValue,
							IOS_APP_VERSION: res.data.result[1].confValue,
							IOS_IOS_ID: res.data.result[2].confValue,
							IOS_IS_FORCE: res.data.result[3].confValue,
							IOS_IS_GROUNDING: res.data.result[4].confValue,
							IOS_VERSION_SIZE: res.data.result[5].confValue
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleConfig(config) {
				this.changeConfig.config.confName = config.confName;
				this.changeConfig.config.confValue = config.confValue;
				this.changeConfig.config.explain = config.explain;
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
					if(res.data.success) {
						this.$message({
							type: 'success',
							message: res.data.result
						});
						this.init();
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
						if(res.data.success) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
						} else {
							this.$message(res.data.errorMsg);
						}
					});
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			handleChangeIos() {
				this.changeIos.show = true;
				this.changeIos.config={
						appLog: "",
						appVersion: "",
						iosId: "",
						isForce: '0',
						isGrounding: '0',
						versionSize: "",
					}
			},
			handleIosUpdate(){	
				console.log(this.changeIos);
				this.$axios({
						method: 'post',
						url: '/mgrsite/appUpdate/updateIos.do',
						data:this.changeIos.config,
					}).then(res => {
						console.log(res);
						if(res.data.success) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.changeIos.show = false;
							this.init();
						} else {
							this.$message(res.data.errorMsg);
						}
					});
			},
			handleChangeAndroid() {
				this.changeAndroid.show = true;
				this.changeAndroid.config={
						appLog: "",
						appPath: "",
						appVersion: '',
						isForce: '0',
						versionSize: "",
					}
			},
			handleAndroidUpdate(){	
				console.log(this.changeAndroid);
				this.$axios({
						method: 'post',
						url: '/mgrsite/appUpdate/updateAndroid.do',
						data:this.changeAndroid.config,
				}).then(res => {
						if(res.data.success) {
							this.$message({
								type: 'success',
								message: '操作成功'
							});
							this.changeAndroid.show = false;
							this.init();
						} else {
							this.$message(res.data.errorMsg);
						}
					});
			},
		}
	}
</script>
<style scoped="scoped">
	.confirmBtn {
		display: block;
		margin: 0 auto;
		margin-top: 50px;
	}
	.input-box{
		padding: 10px 0;
	}
	textarea {
		width: 400px;
		height: 100px;
		margin-top: 10px;
		outline: none;
		border: 1px solid #ddd;
		font-size: 14px;
		border-radius: 5px;
		margin-top: 6px;
		color: #666;
		padding: 10px 20px;
	}
	.el-radio{
		margin-top: 10px;
	}
</style>