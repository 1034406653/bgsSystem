<template>
	<el-container>
		<el-header class='header-menu'>新增游戏</el-header>
		<el-main class='table-main'>
			<div class="input-box">
				<span>游戏名称</span>
				<input type="text" v-model="pGameAddData.gameName" />
			</div>
			<div class="input-box">
				<span>游戏图标</span>
				<input class="gamePic" ref="inputer" type="file" accept="image/png, image/jpg" @change="handleFileChange($event)" />
				<div class="gamePicBtn"> 选择图片</div>
				<b>请选用正方形图片，宽高150px左右，格式jpg,png</b>
			</div>
			<div class="input-box">
				<img :src="pGameAddData.photo" />
			</div>
			<div class="input-box">
				<span>游戏链接</span>
				<input type="text" v-model="pGameAddData.link" />
			</div>
			<div class="input-box">
				<span>游戏类型</span>
				<el-radio v-model="pGameAddData.type" label="1">ETH</el-radio>
				<el-radio v-model="pGameAddData.type" label="2">EOS</el-radio>
			</div>
			<div class="input-box">
				<span>游戏状态</span>
				<el-radio v-model="pGameAddData.status" label="1">上架</el-radio>
				<el-radio v-model="pGameAddData.status" label="0">下架</el-radio>
			</div>
			<div class="input-box">
				<span>备注</span>
				<textarea v-model="pGameAddData.text"></textarea>
			</div>
			<el-button type="primary" @click="addGame">提交</el-button>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pGameAddData: {
					gameName: "",
					photo: "",
					type: '1',
					link: "",
					text: "",
					status: '1',
				}
			}
		},
		methods: {
			handleFileChange(event) {
				let that = this;
				let imgFile = event.currentTarget.files[0];

				let imgType = imgFile.type.split('/')[1];
				if(imgType == 'png' || imgType == 'jpg' || imgType == 'JPG' || imgType == 'PNG') {
					let reader = new FileReader();
					reader.readAsDataURL(imgFile);
					reader.onload = function(e) {
						let base64 = this.result.split(';base64,')[1];
						that.$axios({
							method: 'post',
							url: '/mgrsite/fireUpload.do',
							data: {
								pic: base64,
								suffix: imgType,
							},
						}).then(res => {
							if(res.status == 200) {
								that.pGameAddData.photo = that.$baseURL + '/' + res.data.result;
							}
						}).catch(res => {
							this.$message(res);
						});
					}
				} else {
					this.$message('图片格式不正确');
				}
			},
			addGame() {
				if(this.pGameAddData.gameName.length < 1)
					return this.$message('请填写游戏名称');
				if(this.pGameAddData.photo.length < 1)
					return this.$message('请上传游戏图标');
				/*if(this.pGameAddData.link.length < 1)
					return this.$message('请填写游戏连接');*/
				if(this.pGameAddData.text.length < 1)
					return this.$message('请填写游戏备注');
				this.$axios({
					method: 'post',
					url: '/mgrsite/games/saveOrUpdate.do',
					data: this.pGameAddData,
				}).then(res => {
					if(res.status == 200) {
						this.$message({
							message: '游戏上传成功',
							type: 'success'
						});
						this.$router.push({
							name:'Game_gameList',
							params:{
								type:'newAdd'
							},
						})
					}
				}).catch(res => {
					console.log(res);
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.input-box {
		width: 600px;
		margin: 0 auto;
		margin-bottom: 20px;
		position: relative;
	}
	
	.input-box span {
		width: 100px;
	}
	
	.input-box input {
		width: calc( 100% - 101px);
		margin-top: 6px;
		color: #333;
	}
	
	.input-box textarea {
		width: calc( 100% - 101px);
		height: 100px;
		padding: 10px 20px;
		color: #333;
		font-size: 14px;
		border: 1px solid #ddd;
		border-radius: 5px;
		outline: none;
	}
	
	.input-box label {
		margin-top: 12px;
	}
	
	button {
		display: block;
		margin: 20px auto;
	}
	
	.input-box .gamePic {
		width: 100px;
		height: 30px;
		position: absolute;
		left: 101px;
		top: 5px;
		opacity: 0;
		display: block;
		margin: 0;
		z-index: 10;
		cursor: pointer;
	}
	
	.input-box .gamePicBtn {
		width: 100px;
		height: 30px;
		position: absolute;
		left: 101px;
		top: 5px;
		border: 1px solid #ddd;
		border-radius: 5px;
		text-align: center;
		line-height: 28px;
	}
	
	.input-box b {
		position: absolute;
		left: 210px;
		line-height: 40px;
		color: #999;
		font-size: 12px;
		font-weight: normal;
	}
	
	.input-box img {
		width: 100px;
		margin-left: 101px;
	}
</style>