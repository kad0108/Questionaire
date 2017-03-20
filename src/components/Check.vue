<template>
	<div class="check">
		<h1 class="title">{{qsnr.title}}</h1>
		<hr>
		<div class="question-wrap">
			<echarts v-for="(form, index) in qsnr.form" :form="form" :index="index" :fillnum="qsnr.fillnum"></echarts>
		</div>
	</div>
</template>
<script>
import Echarts from './Echarts'
export default{
	data () {
		return {
			path: '',
			qsnr: {},
		}
	},
	created () {
		this.path = this.$route.path.replace(/\/check\//, '');
		if(this.path.indexOf('create') == -1){
			let url = '/api/qsnr/getQsnr/' + this.path;
			this.$http.get(url).then(response => {
				this.qsnr = response.body.qsnr;
			}, err => {
				console.log(err);
			})
		}
	},
	components: {
		Echarts
	}
}
</script>
<style>
/* 问卷标题 */
.check .title{
	width: 90%;
	height: 3rem;
	line-height: 3rem;
	border: none;
	font-size: 1.2rem;
	color: #555;
	font-weight: bold;
	margin: 0 auto;
	text-align: center;
	margin-bottom: 1.5rem;
	cursor: default;
}
.check .title:hover{
	background-color: #fef1e8;
}
/* 水平线 */
.check hr{
	border: 1px solid #ccc;
	width: 93%;
	margin: 0 auto;
}
</style>