<template>
	<div class="fill">
		<h1 class="title">{{qsnr.title}}</h1>
		<hr>
		<div class="question-wrap">
			<div class="question" v-for="(item, id) in qsnr.form">
				<li class="question-title">
    				<span>Q{{id+1}}.</span>
    				<span class="question-title">{{item.title}}</span>
    			</li>
    			<li>
    				<ol v-if="item.type === 'textarea'">
    					<li>
    						<textarea class="textarea" v-model="content"></textarea>
    					</li>
    					<li class="required" v-if="item.required.length">*此题必填</li>
    				</ol>
    				<ol v-else>
    					<li v-for="(option, index) in item.options" class="options">
    						<input v-if="item.type==='radio'" type="radio" v-model="item.chosen" :value="index">
    						<input v-else type="checkbox" v-model="item.chosen" :value="index">
    						<span>{{option.name}}</span>
    					</li>
    				</ol>
    			</li>
			</div>
		</div>
		<button class="btn" @click="submit">提交问卷</button>
		<Modal :ifShowModal="ifShowModal" @hideModal="hideModal" :hint="hint"></Modal>
	</div>
</template>
<script>
import store from '../store'
import Modal from './Modal'
export default{
	data () {
		return {
			path: '',
			title: '',
			qsnr: {},
			ifShowModal: false,
			hint: '',
			content: '',
		}
	},
	created () {
		this.path = this.$route.path.replace(/\/fill\//, '');
		if(this.path){
			let url = '/api/qsnr/fillQsnr/' + this.path;
			this.$http.get(url).then(response => {
				this.qsnr = response.body.qsnr;
			}, err => {
				console.log(err);
			})
		}
	},
	methods: {
		submit () {
			this.hint = 'fill';
			this.ifShowModal = true;
		},
		setForm () {
			this.qsnr.form.forEach((item, i) => { // item是每道题
				if(item.type === 'textarea'){
					if(this.content.trim() !== '') {
						item.content.push(this.content);
						item.num++;
					}
					this.content = '';
				}else{
					if(item.type === 'radio' && item.chosen !== -1) {
						item.options[item.chosen].num++;
					}
					for(var j = 0; j < item.chosen.length; j++){
						item.options[item.chosen[j]].num++;
					}
					item.type === 'radio' ? item.chosen = -1 : item.chosen = [];
				}
			})
			this.qsnr.fillnum++;
		},
		hideModal (state) {
			if(state !== 'cancel'){
				this.setForm();
				console.log(this.qsnr);
				var data = {
					qsnr: this.qsnr,
					state: 'publish'
				};
				let url = '/api/qsnr/updateQsnr/' + this.path;
				this.$http.post(url, data).then(response => {
					this.ifShowModal = false;
					this.$router.push({name: 'list'});
				}, err => {
					console.log(err);
				})
			}else{
				this.ifShowModal = false;
			}
		}
	},
	components: {
		Modal
	}
}
</script>
<style>
/* 问卷标题 */
.fill .title{
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
.fill .title:hover{
	background-color: #fef1e8;
}
/* 水平线 */
.fill hr{
	border: 1px solid #ccc;
	width: 93%;
	margin: 0 auto;
}
.fill ol li{
	display: flex;
	-webkit-align-items: center;
}
.fill ol li span{
	margin-left: .5rem;
}
</style>