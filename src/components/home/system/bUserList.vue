<template>
	<el-container>
		<el-header class='header-menu'>后台用户</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<div class="inputbox">
					<el-button @click="$router.push('/home/system/bUserAdd')">新增后台账号</el-button>
				</div>
			</div>
			<template>
				<el-table :data="bUserRoleList" style="width: 100%" stripe>
					<el-table-column prop="bid" label="ID">
					</el-table-column>
					<el-table-column prop="username" label="用户名">
					</el-table-column>
					<el-table-column prop="realName" label="真实姓名">
					</el-table-column>
					<el-table-column label="角色">
						<template slot-scope="scope">
							<span>{{scope.row.rName}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<span v-if='scope.row.state==0'>正常</span>
							<span v-if='scope.row.state==1'>禁用</span>
						</template>
					</el-table-column>
					<el-table-column label="admin">
						<template slot-scope="scope">
							<span v-if='scope.row.admin'>是</span>
							<span v-if='!scope.row.admin'>否</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleChangeEdit(scope.row.bid)" v-if='!scope.row.admin'>更改用户角色</el-button>
							<el-button size="mini" type="danger" @click="handleRest(scope.row.bid)">重置密码</el-button>
							<el-button size="mini" type="danger" @click="handleChangeState(scope.row.bid,1)" v-if='scope.row.state==0&&!scope.row.admin'>禁用</el-button>
							<el-button size="mini" @click="handleChangeState(scope.row.bid,0)" v-if='scope.row.state==1'>恢复</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-main>
		<div class="modal-box" v-if='pRoleData.show'>
			<div class="modal-hide" @click="pRoleData.show=false">
				<i class="el-icon-close"></i>
			</div>
			<div class="input-box">
				<span>选择用户角色</span>
				<el-select v-model="pRoleData.rid" placeholder="请选择">
					<el-option v-for="item in pRoleData.roleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<el-button type='primary' @click='handleChangeRole' class="confirmBtn">保存</el-button>
		</div>
		<div class="mark-box-lxl" v-if='pRoleData.show'></div>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				bUserRoleList: [],
				pRoleDataRid: "",
				pRoleData: {
					show: false,
					rid: "",
					bod: "",
					roleList: [],
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
					url: '/mgrsite/bgUserList.do',
				}).then(res => {
					if(res.status == 200) {
						let dataList = res.data.result;
						that.bUserRoleList =
							dataList.forEach((x, i) => {
								if(x.roles[0]) {
									dataList[i].rName = x.roles[0].name;
								}
							})
						that.bUserRoleList = dataList;
					}
				}).catch(error => {
					console.log(error);
				});
			},
			handleRest(bid) {
				this.$confirm('确定要重置该用户密码吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/mgrsite/bgUser/resetPwd.do',
						data: {
							bid: bid,
						},
					}).then(res => {
						if(res.data.success) {
							this.$message({
								type: 'success',
								message: res.data.result
							});
						} else {
							that.$message(res.data.errorMsg);
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			handleChangeState(bid, state) {
				let hinText = state == 0 ? '确定要恢复该用户吗?' : '确定要禁用该用户吗?'
				this.$confirm(hinText, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/mgrsite/bgUser/changeStatus.do',
						data: {
							bid: bid,
							state: state,
						},
					}).then(res => {
						if(res.data.success) {
							this.$message({
								type: 'success',
								message: res.data.result
							});
							this.init();
						} else {
							this.$message(res.data.errorMsg);
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			handleChangeEdit(bid) {
				this.pRoleData.bid = bid;
				this.$axios({
					method: 'get',
					url: '/mgrsite/bgUser/editBgUserRole.do',
				}).then(res => {
					console.log(res);
					if(res.data.success) {
						res.data.result.roles.forEach((x, i) => {
							this.pRoleData.roleList[i] = {};
							this.$set(this.pRoleData.roleList[i], 'value', x.rid);
							this.$set(this.pRoleData.roleList[i], 'label', x.name);
						})
						this.pRoleData.rid = '';
						this.pRoleData.show = true;
					} else {
						that.$message(res.data.errorMsg);
					}
				});
			},
			handleChangeRole() {
				if(!this.pRoleData.rid)
					return this.$message('请先选择一个角色');
				this.$axios({
					method: 'post',
					url: '/mgrsite/bgUser/saveBgUserRole.do',
					data: {
						bid: this.pRoleData.bid,
						rid: this.pRoleData.rid,
					}
				}).then(res => {
					if(res.data.success) {
						this.$message({
							type: 'success',
							message: res.data.result
						});
						this.pRoleData.show = false;
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
</style>