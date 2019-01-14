<template>
	<el-container>
		<el-header class='header-menu'>文本列表</el-header>
		<el-main class="table-main">
			<template>
				<el-select v-model="selectValue" placeholder="请选择" style="margin-bottom: 20px;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</template>
			<quill-editor v-model="editorContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
			</quill-editor>
		</el-main>
	</el-container>

</template>

<script>
	import { quillEditor } from 'vue-quill-editor'
	export default {
		data() {
			return {
				editorContent: null,
				editorOption: {},
				options: [{
					value: '选项1',
					label: '注册协议'
				}, {
					value: '选项2',
					label: '项目介绍'
				}, {
					value: '选项3',
					label: '锁仓协议'
				}],
				selectValue:"",
			}
		},
		methods: {
			onEditorBlur() { //失去焦点事件
			},
			onEditorFocus() { //获得焦点事件
			},
			onEditorChange() { //内容改变事件
			}
		}
	}
</script>
<style>
	.ql-container{
		min-height: 500px;
	}
</style>