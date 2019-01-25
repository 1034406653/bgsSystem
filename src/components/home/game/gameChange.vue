<template>
	<el-container>
		<el-header class='header-menu'>修改游戏</el-header>
		<el-main class='table-main'>
			<div class="input-box">
				<span>游戏名称</span>
				<input type="text" v-model="pGameChangeData.gameName" />
			</div>
			<div class="input-box">
				<span>游戏图标</span>
				<input class="gamePic" ref="inputer" type="file" accept="image/png, image/jpg" @change="handleFileChange($event)" />
				<div class="gamePicBtn"> 选择图片</div>
				<b>请选用正方形图片，宽高150px左右，格式jpg,png</b>
			</div>
			<div class="input-box">
				<img :src="pGameChangeData.photo" />
			</div>
			<div class="input-box">
				<span>游戏链接</span>
				<input type="text" v-model="pGameChangeData.link" />
			</div>
			<div class="input-box">
				<span>游戏类型</span>
				<el-radio v-model="pGameChangeData.type" label="1">ETH</el-radio>
				<el-radio v-model="pGameChangeData.type" label="2">EOS</el-radio>
			</div>
			<div class="input-box">
				<span>备注</span>
				<textarea v-model="pGameChangeData.text"></textarea>
			</div>
			<el-button type="primary" @click="changeGame">提交</el-button>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pGameChangeData: {
					gameName: "",
					photo: "",
					link: "",
					text: "",
					gid:"",
					type:'1',
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				console.log(this.$route.params);
				if(this.$route.params.pGameChangeData) {
					this.pGameChangeData=this.$route.params.pGameChangeData;
					this.$set(this.pGameChangeData,"type",this.$route.params.pGameChangeData.type.toString())
				}
			},
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
								that.pGameChangeData.photo = that.$baseURL + '/' + res.data.result;
							}
						}).catch(res => {
							this.$message(res);
						});
					}
				} else {
					this.$message('图片格式不正确');
				}
			},
			changeGame() {
				if(!this.pGameChangeData.gameName)
					return this.$message('请填写游戏名称');
				if(!this.pGameChangeData.photo)
					return this.$message('请上传游戏图标');
				if(!this.pGameChangeData.text)
					return this.$message('请填写游戏备注');
				if(!this.pGameChangeData.gid)
					return this.$message('请返回游戏列表，选择游戏进行修改游戏');
				if(!this.pGameChangeData.type)
					return this.$message('请填选择游戏类型');
				this.$axios({
					method: 'post',
					url: '/mgrsite/games/saveOrUpdate.do',
					data: this.pGameChangeData,
				}).then(res => {
					if(res.status == 200) {
						this.$message({
							message: '游戏修改成功',
							type: 'success'
						});
						this.$router.push({
							name: 'Game_gameList',
						})
					}
				}).catch(res => {
					console.log(res);
				});
			}
		},
		activated() {
			this.init();
		},
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