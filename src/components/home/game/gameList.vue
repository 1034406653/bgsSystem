<template>
	<el-container>
		<el-header class='header-menu'>游戏列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<template>
					<el-select v-model="gameType">
						<el-option v-for="item in gameTypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>	
				</template>
				<div class="inputbox">
					<el-button @click="$router.push('/home/game/gameAdd')">新增游戏</el-button>
				</div>
			</div>
			<template>
				<el-table :data="gameList" style="width: 100%" stripe>
					<el-table-column prop="sort" label="排序">
					</el-table-column>
					<el-table-column prop="gameName" label="游戏名">
					</el-table-column>
					<el-table-column label="头像">
						<template slot-scope="scope">
							<img :src="scope.row.photo" class="headPhoto" />
						</template>
					</el-table-column>
					<el-table-column prop="link" label="连接">
					</el-table-column>
					<el-table-column prop="text" label="文本信息">
					</el-table-column>
					<el-table-column prop="joindate" label="接入时间">
					</el-table-column>
					<el-table-column prop="status" label="类型">
						<template slot-scope="scope">
							<span v-if='scope.row.type==1'>ETH</span>
							<span v-if='scope.row.type==2'>EOS</span>
							<span v-if='scope.row.type==3'>EOS</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if='scope.row.status==0'>下架</span>
							<span v-if='scope.row.status==1'>上架</span>
						</template>
					</el-table-column>
					<!--<el-table-column prop="status" label="返额">
						<template slot-scope="scope">
							<el-button size="mini" @click='handleWatchMoney'>查看</el-button>
						</template>
					</el-table-column>-->
					<el-table-column label="操作" width='280'>
						<template slot-scope="scope">
							<el-button size="mini" @click="handleTop(scope.row.gid,scope.row.gameName,scope.row.sort)">置顶</el-button>
							<el-button size="mini" @click="handleEdit(scope.row.gid,scope.row.gameName,scope.row.photo,scope.row.link,scope.row.text,scope.row.type)">修改</el-button>
							<el-button size="mini" type="danger" @click="handlechangeStatus(scope.row.gid,0)" v-if='scope.row.status==1'>下架</el-button>
							<el-button size="mini" @click="handlechangeStatus(scope.row.gid,1)" v-if='scope.row.status==0'>上架</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pGameData.currentPage" :page-size="pGameData.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
			<div class="modal-box" v-show='gameTop.show'>
				<div class="modal-hide" @click="gameTop.show=false">
					<i class="el-icon-close"></i>
				</div>
				<div class="gameTop-title">
					请选择一个游戏进行位置互换
				</div>
				<div class="gameTop-main">
					<div class="gameTop-left">
						<b>{{gameTop.game1Id}},</b>&nbsp;<span>{{gameTop.game1Name}},</span>&nbsp;<span>序号:{{gameTop.game1Sort}}</span>
					</div>
					<div class="gameTop-center">
						<i class="el-icon-sort" style="transform:rotate(90deg);"></i>
					</div>
					<div class="gameTop-right">
						<template>
							<el-select v-model="gameTop.game2Id">
								<el-option v-for="item in gameTop.gameTopGameList" :key="item.label" :value="item.value" :label="item.label">
								</el-option>
							</el-select>
						</template>
					</div>
					<el-button size="mini" @click="gameTopConfirm">确定</el-button>
				</div>
			</div>
			<div class="mark-box-lxl" v-show='gameTop.show'></div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				gameTypeList: [{
					value: '1',
					label: 'ETH'
				}, {
					value: '2',
					label: 'EOS'
				}, {
					value: '3',
					label: '活动'
				}],
				gameType: '2',
				gameList: [],
				pGameData: {
					currentPage: 1,
					pageSize: 6,
					type: 2,
				},
				totalCount: 6,
				gameTop: {
					show: false,
					game1Id: "",
					game1Name: "",
					game1Sort: "",
					gameTopGameList: [],
					game2Id: '',
				}
			}
		},
		watch: {
			gameType(val, oldval) {
				this.pGameData.type = val;
				this.pGameData.currentPage = 1;
				this.init();
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/games.do',
					data: this.pGameData,
				}).then(res => {
					console.log(res);
					if(res.status == 200) {
						this.totalCount = res.data.result.totalCount;
						this.gameList = res.data.result.data;
					}
				});
			},
			handleWatchMoney() {
				this.$message('接口未通');
			},
			handleCurrentChange(val) {
				this.init();
			},
			handlechangeStatus(gid, status) {
				let that = this;
				let hintText = status == 0 ? '确定要下架该游戏吗?' : '确定要上架该游戏吗?'
				this.$confirm(hintText, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios({
						method: 'post',
						url: '/mgrsite/games/changeStatus.do',
						params: {
							gid: gid,
							status: status,
						},
					}).then(res => {
						if(res.data.success) {
							that.init();
							that.$message({
								type: 'success',
								message: res.data.result
							});
						} else {
							that.$message(res.data.errorMsg);
						}
					});
					/**/
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			handleTop(gid, gameName, gameSort) {
				this.gameTop.game1Id = gid;
				this.gameTop.game1Name = gameName;
				this.gameTop.game1Sort = gameSort;
				this.gameTop.show = true;
				this.$axios({
					method: 'get',
					url: '/mgrsite/games.do',
					params: {
						currentPage: 1,
						pageSize: 1000,
						type: this.pGameData.type,
					},
				}).then(res => {
					if(res.status == 200) {
						this.gameTop.game2Id = '';
						this.gameTop.gameTopGameList = [];
						res.data.result.data.forEach((x, i) => {
							this.gameTop.gameTopGameList[i] = {};
							this.$set(this.gameTop.gameTopGameList[i], "value", x.gid)
							this.$set(this.gameTop.gameTopGameList[i], "label", x.gid + ',' + x.gameName + ",序号:" + x.sort)
						})
					}
				});

			},
			handleEdit(gid, gameName, photo, link, text, type) {
				let pGameChangeData = {
					gameName: gameName,
					photo: photo,
					type:  type,
					link: link,
					text: text,
					gid: gid,
				}
				this.$router.push({
					name: "Game_gameChange",
					params: {
						pGameChangeData: pGameChangeData
					},
				})
			},
			gameTopConfirm() {
				if(!this.gameTop.game2Id)
					return this.$message('请先选择一个游戏');
				this.$axios({
					method: 'post',
					url: '/mgrsite/games/updateSort.do',
					params: {
						gid1: this.gameTop.game1Id,
						gid2: this.gameTop.game2Id,
					},
				}).then(res => {
					if(res.status == 200) {
						console.log(res);
						this.init();
						this.gameTop.show = false;
						this.$message({
							message: res.data.result,
							type: 'success'
						});
					} else {
						this.$message(res.data.errorMsg);
					}
				});
			}
		},
		activated() {
			if(this.$route.params.type == 'newAdd') {
				this.pGameData.currentPage = 1;
			}else{
				this.init();
			}
		},

	}
</script>

<style scoped="scoped">
	.headPhoto {
		width: 80px;
		
	}
	
	.gameTop-title {
		width: 100%;
		text-align: center;
		line-height: 40px;
		padding-bottom: 30px;
	}
	
	.gameTop-main {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	
	.gameTop-left {
		float: left;
		width: 40%;
	}
	
	.gameTop-center {
		float: left;
		width: 10%;
	}
	
	.gameTop-right {
		float: left;
		width: 40%;
	}
	
	.button {
		float: left;
		width: 10%;
	}
	
	.modal-box {
		height: 500px;
	}
</style>