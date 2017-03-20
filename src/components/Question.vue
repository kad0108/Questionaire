<template>
	<div class="question-wrap">
    	<div class="question" v-for="(item, id) in form">
    		<ul>
    			<li class="question-title">
    				<span>Q{{id+1}}.</span>
    				<input type="text" v-if="item.type !== 'textarea'" v-model="item.title" class="question-title" onfocus="this.select()">
    				<span v-else class="question-title">文本题</span>
    			</li>
    			<ol v-if="item.type === 'textarea'">
    				<li>
    					<textarea class="textarea" v-model="item.title"></textarea>
    				</li>
    				<li class="required">
    					<input type="checkbox" id="required" v-model="item.required" value="required">
    					<label for="required">此题是否必填</label>
    				</li>
    			</ol>
    			<ol v-else>
    				<li v-for="(option, index) in item.options" class="options">
	    				<span :class="item.type"></span>
	    				<input type="text" v-model="option.name" onfocus="this.select()">
	    				<span class="delOption" @click="delOption(id, index)">x</span>
	    			</li>
	    			<li class="addOption" @click="addOption(id)">+</li>
    			</ol>
    			<li class="operate">
    				<span @click="up(id)">上移</span>
    				<span @click="down(id)">下移</span>
    				<span @click="reuse(id)">复用</span>
    				<span @click="delQuestion(id)">删除</span>
    			</li>
    		</ul>
    	</div>
    </div>
</template>
<script>
export default {
	props: {
		form: Array
	},
	data () {
		return {
		}
	},
	methods: {
		// 上移
		up (id) {
			if(id != 0){
				let data = this.form[id];
				this.form.splice(id, 1);
				this.form.splice(id-1, 0, data);
			}
		},
		// 下移
		down (id) {
			if(id != this.form.length-1){
				let data = this.form[id];
				this.form.splice(id, 1);
				this.form.splice(id+1, 0, data);
			}
		},
		// 复用
		reuse (id) {
			let oldData = this.form[id];
			let newData = {};
			for(let key in oldData){
				if(oldData[key] instanceof Array){
					var newOptions = [];
					oldData[key].forEach(function(oldOption){
						let newOption = {};
						for(let k in oldOption){
							newOption[k] = oldOption[k];
						}
						newOptions.push(newOption);
					})
					newData[key] = newOptions;
				}
				else newData[key] = oldData[key];
			}
			this.form.splice(id+1, 0, newData);
		},
		// 删除问题
		delQuestion (id) {
			this.form.splice(id, 1);
		},
		// 添加选项
		addOption (id) {
			let options = this.form[id].options;
			options.push({name: '选项' + (options.length+1), num: 0});
		},
		// 删除选项
		delOption (id, index) {
			this.form[id].options.splice(index, 1);
		},
	}
}
</script>
<style>
/* 问题模块 */
.question-wrap{
	width: 90%;
	margin: 2rem auto;
	font-size: 1rem;
}
/* 单个问题 */
.question{
	padding: 1rem 1.5rem;
	text-align: left;
}
.question:hover{
	background-color: #fef1e8;
}
.question:hover input{
	background-color: #fef1e8;
}
.question:hover .operate{
	visibility: visible;
}
.question input{
	border: none;
	padding-left: .2rem;
}
.question input::-webkit-input-placeholder{
	color: black;
}
.question span{
	cursor: default;
}
.question li{
	list-style: none;
	line-height: 1.6rem;
}
.question li input{
	height: 1.6rem;
	font-size: 1rem;
}
.question .delOption{
	visibility: hidden;
	cursor: pointer;
}
.question .options{
	margin-left: 2rem;
}
.question .options:hover .delOption{
	visibility: visible;
}
.question .addOption{
	width: 50%;
	text-align: center;
	border: 1px dashed #888;
	cursor: pointer;
	margin-left: 2rem;
}
.question .operate{
	text-align: right;
	font-size: 1rem;
	visibility: hidden;
}
.question .operate span{
	cursor: pointer;
	margin-right: .5rem;
}
.question .radio{
	display: inline-block;
	width: .7rem;
	height: .7rem;
	border: 1px solid black;
	border-radius: 50%;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
}
.question .checkbox{
	display: inline-block;
	width: .7rem;
	height: .7rem;
	border: 1px solid black;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
}
.question .textarea{
	width: 90%;
	max-width: 90%;
	height: 5rem;
	margin-left: 2rem;
}
.question .required{
	display: flex;
	align-items: center;
	margin-left: 2rem;
}
</style>