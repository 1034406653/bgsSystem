<template>
	<el-container id="app">
		<el-header class='header-box'>
			<div class="logo">
				
			</div>
			<h1>bgs后台管理系统</h1>
		</el-header>
		<el-main>
			<keep-alive>
				<router-view/>
			</keep-alive>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	@import url("assets/css/comment.css");
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
</style>