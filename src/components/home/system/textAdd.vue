<template>
	<el-container>
		<el-header class='header-menu'>新增常见问题</el-header>
		<el-main class="table-main">
			<div class="inputBox">
				<span class="inputLabel">文本标题：</span>
				<input type="text"  class="textTitle" v-model="pTextAddData.title" />
			</div>
			<quill-editor v-model="pTextAddData.text" ref="myQuillEditor" :options="editorOption">
			</quill-editor>
			<el-button type="primary" @click="handleTextAdd">提交</el-button>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				editorOption: {},
				pTextAddData:{
					title:"",
					text:"",
					type:"0",
				}
			}
		},
		methods: {
			handleTextAdd(){
				if(!this.pTextAddData.title)
					return this.$message('请填写标题')
				if(!this.pTextAddData.text)
					return this.$message('请填写内容')
				this.$axios({
					method: 'post',
					url: '/mgrsite/text/saveOrUpdate.do',
					data: this.pTextAddData,
				}).then(res => {
					if(res.status==200){
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
	.inputLabel{
		color: #666;
		font-size: 16px;
	}
	.textTitle{
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
	.inputBox{
		width: 100%;
		margin-bottom: 20px;
		overflow: hidden;
	}
	button{
		display: block;
		margin: 20px auto;
	}
</style>