<template>
	<div class="error">
		<p>抱歉，您访问的页面不存在...</p>
		<router-link tag="button" :to="{name: 'home'}" class="btn">返回首页</router-link>
	</div>
</template>
<style>
.error{
	color: rgb(25,97,127);
	padding: 5rem;
}
.error p{
	font-size: 2rem;
	margin-bottom: 2rem;
}
.error .btn{
	color: inherit;
}
.error .btn:hover{
	color: #fff;
	background-color: rgb(25,97,127);
	border-color: rgb(25,97,127);
}
</style>