<template>
	<el-container>
		<el-header class='header-menu'>文本列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<el-button @click="$router.push('/home/system/textAdd')">新增文本</el-button>
			</div>
			<template>
				<el-table :data="textlist" style="width: 100%" stripe>
					<el-table-column prop="tid" label="文本id">
					</el-table-column>
					<el-table-column prop="title" label="文本标题">
					</el-table-column>
					<el-table-column prop="type" label="类型">
					</el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<el-button size="mini" type="info" @click="handleTextDetails(scope.row.title,scope.row.text)">查看</el-button>
							<el-button size="mini" type="info" @click="handleTextChange(scope.row)">修改</el-button>
							<el-button size="mini" type="danger" @click="handleTextDelete(scope.row.tid)" v-if='scope.row.type==0'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-main>
		<div class="modal-box" v-if='textBox.show'>
			<div class="modal-hide" @click="textBox.show=false">
				<i class="el-icon-close"></i>
			</div>
			<div class="title">{{textBox.title}}</div>
			<div class="content" v-html="textBox.text"></div>
		</div>
		<div class="mark-box-lxl" v-if='textBox.show'></div>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pTextListData: {
					page: 1,
					page_size: 100,
				},
				textlist: [],
				textBox: {
					show: false,
					title: "",
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'get',
					url: '/mgrsite/textList.do',
					params: this.pTextListData,
				}).then(res => {
					if(res.status == 200) {
						this.textlist = res.data.result;
					}
				}).catch(res => {
					console.log(res)
				});
			},
			handleTextChange(textData) {
				this.$router.push({
					name:"System_textChange",
					params:textData,
				})
			},
			handleTextDelete(tid) {
				this.$confirm('确定要删除改文本吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/mgrsite/text/delete.do',
						data: {
							tid: tid
						},
					}).then(res => {
						if(res.status == 200) {
							this.$message({
								type: 'success',
								message: res.data.result
							});
							this.init();
						}
					}).catch(res => {
						console.log(res)
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

			},
			handleTextDetails(title, text) {
				this.textBox.show = true;
				this.textBox.title = title;
				this.textBox.text = text;
			}
		},
		activated() {
			this.init();
		}
	}
</script>

<style scoped="scoped">
	.headPhoto {
		width: 60px;
		height: 60px;
		display: inline-block;
	}
	.title{
		text-align: center;
		font-size: 18px;
		color: #666;
	}
	.content{
		
		font-size: 14px;
		color: #666;
	}
</style>