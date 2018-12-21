<template>
	<el-container>
		<el-header class='header-menu'>
			系统管理 / 基本设置 / 首页轮播
		</el-header>
		<el-main>
			<div class="el-main-header">
				<el-button size="medium" type="primary" @click="addBanner">新增轮播图片</el-button>
			</div>
			<template>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="bannerName" label="名称" width="150">
					</el-table-column>
					<el-table-column prop="pic" label="图片" width="150">
					</el-table-column>
					<el-table-column prop="urlData" label="连接" width="150">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">

							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							<el-button size="mini" type="danger" @click="handleDown(scope.$index, scope.row)">下架</el-button>
						</template>
					</el-table-column>

				</el-table>
			</template>
			<!--新增轮播图-->
			<el-dialog :title="dialogTitle" :visible.sync="centerDialogVisible" width="60%" center>
				<template>
					<el-form label-width="100px" class="demo-ruleForm">
						<el-form-item label="密码" prop="pass">
							<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPass">
							<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="年龄" prop="age">
							<el-input v-model.number="ruleForm2.age"></el-input>
						</el-form-item>
					</el-form>
				</template>
				<span slot="footer" class="dialog-footer">
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			  </span>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				
				tableData: [{
						date: '2016-05-02',
						pic: '王小虎',
						urlData: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						pic: '王小虎',
						urlData: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						pic: '王小虎',
						urlData: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						pic: '王小虎',
						urlData: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						pic: '王小虎',
						urlData: '上海市普陀区金沙江路 1518 弄'
					},
					{
						date: '2016-05-02',
						pic: '王小虎',
						urlData: '上海市普陀区金沙江路 1518 弄'
					},
				],
				centerDialogVisible: false,
				dialogTitle: "新增轮播图",
				ruleForm2: {
					pass: '',
					checkPass: '',
					age: ''
				},
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
				this.$confirm('确定要删除该轮播吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleDown(index, row) {
				console.log(index, row);
				this.$confirm('确定要下架该轮播吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			addBanner() {
				this.centerDialogVisible = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>

</style>