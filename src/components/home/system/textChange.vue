<template>
	<el-container>
		<el-header class='header-menu'>文本修改</el-header>
		<el-main class="table-main">
			<div class="inputBox">
				<span class="inputLabel">文本标题：</span>
				<input type="text" class="textTitle" v-model="pTextChangeData.title" />
			</div>
			<div v-if='pTextChangeData.tid!=4'>
				<quill-editor v-model="pTextChangeData.text" ref="myQuillEditor" :options="editorOption">
				</quill-editor>
			</div>
			<div class="inputBox" v-if='pTextChangeData.tid==4'>
				<span class="inputLabel">微信号：</span>
				<input type="text" class="textTitle" v-model="pTextChangeData.text" />
			</div>
			<el-button type="primary" @click="handleTextAdd">提交</el-button>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				editorOption: {},
				pTextChangeData: {
					id: "",
					title: "",
					text: "",
					type: "0",
				}
			}
		},
		mounted() {
			console.log(this.$route.params)
			if(this.$route.params) {
				this.pTextChangeData = this.$route.params;
				console.log(this.pTextChangeData)
			} else {
				this.$message('请返回文本列表，选择一个文本进行修改')
			}
		},
		methods: {
			handleTextAdd() {
				if(!this.pTextChangeData.title)
					return this.$message('请填写标题')
				if(!this.pTextChangeData.text)
					return this.$message('请填写内容')
				this.$axios({
					method: 'post',
					url: '/mgrsite/text/saveOrUpdate.do',
					data: this.pTextChangeData,
				}).then(res => {
					if(res.status == 200) {
						this.$message({
							type: 'success',
							message: res.data.result
						});
						this.$router.push('/home/system/textList')
					}
				}).catch(res => {
					console.log(res)
				});
			}
		}
	}
</script>
<style scoped="scoped">
	.inputLabel {
		color: #666;
		font-size: 16px;
	}
	
	.textTitle {
		width: 300px;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		padding: 0 15px;
	}
	
	.inputBox {
		width: 100%;
		margin-bottom: 20px;
		overflow: hidden;
	}
	
	button {
		display: block;
		margin: 20px auto;
	}
</style>