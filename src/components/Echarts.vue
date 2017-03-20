<template>
	<div class="chart question">
		<h2>Q{{index+1}}.{{form.title}}</h2>
		<div v-if="form.type==='radio'" class="pie" ref="chart"></div>
		<div v-if="form.type==='checkbox'" class="bar" ref="chart"></div>
		<div v-if="form.type==='textarea'" class="tbar" ref="chart"></div>
	</div>
</template>
<script>
import echarts from 'echarts';
export default {
	props: {
		form: Object,
		index: Number,
		fillnum: Number,
	},
	data () {
		return {
			
		}
	},
	mounted () {
		if(this.form.type === 'radio'){
			let data = [];
			this.form.options.forEach(function(item, i){
				data.push({
					name: item.name,
					value: item.num,
				})
			})
			// for(var i = 0; i < this.form.options.length; i++){
			// 	data.push({
			// 		name: this.form.options[i].name,
			// 		value: this.form.options[i].num,
			// 	})
			// }
			this.setPie(data);
		}else if(this.form.type === 'checkbox'){
			let name = [];
			let val = [];
			let fillnum = this.fillnum
			this.form.options.forEach(function(item, i){
				name.push(item.name);
				val.push((item.num / fillnum * 100).toFixed(2));
			})
			this.setBar(name, val);
		}else{
			let name = [];
			let val = [];
			name.push('有效回答');
			val.push((this.form.num / this.fillnum * 100).toFixed(2));
			this.setBar(name, val);
		}
	},
	methods: {
		setPie (data) {
			let myChart = echarts.init(this.$refs.chart);
			myChart.setOption({
				// legend: {
				// 	data: ['饼图'],
				// },
				tooltip : {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
				series: [{
					name: '饼图',
					type: 'pie',
					radius: '55%',
					data: data,
					itemStyle: {
					    emphasis: { // hover时的阴影样式
					        shadowBlur: 200,
					        shadowColor: 'rgba(0, 0, 0, 0.5)'
					    }
					},
				}]
			})
		},
		setBar (name, val) {
			let myChart = echarts.init(this.$refs.chart);
			myChart.setOption({
				tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        },
			        formatter: '{b}: {c} %'
			    },
				xAxis: {
					type: 'value',
					axisLabel :{  
					    interval:0   
					},
					// min: 100,
					splitLine: {lineStyle:{type:'dashed'}},// 坐标轴分割线
				},
				yAxis: {
					type: 'category',
					data: name,
				},
				series: [{
					type: 'bar',
					data: val
				}]
			})
		}
	}
}
</script>
<style>
.chart{
	border-bottom: 1px solid #ccc;
}
.chart h2{
	font-size: 1rem;
}
.chart .pie{
	width: 30rem;
	height: 20rem;
}
.chart .bar{
	width: 100%;
	height: 20rem;
}
.chart .tbar{
	width: 100%;
	height: 10rem;
}
</style>