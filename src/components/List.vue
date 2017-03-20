<template>
	<div v-if="hasQsnr">
		<table class="list">
			<thead>
				<tr>
					<th>标题</th>
					<th>截止时间</th>
					<th>状态</th>
					<th>
						操作
						<router-link tag="button" class="btn" :to="{name: 'create'}">新建问卷</router-link>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in formList">
					<td>{{item.qsnr.title}}</td>
					<td>{{item.qsnr.end}}</td>
					<td :class="{publish: item.state == 'publish'}">{{item.state | stateContent}}</td>
					<td>
						<router-link tag="button" class="btn" :to="{name: 'edit', params: {id: item._id}}" v-if="item.state=='draft'">编辑问卷</router-link>
						<router-link tag="button" class="btn" :to="{name: 'check', params: {id: item._id}}" v-if="item.state!='draft'">查看数据</router-link>
						<button class="btn" @click="delSurvey(item._id)">删除问卷</button>
					</td>
				</tr>
			</tbody>
		</table>
		<modal :ifShowModal="ifShowModal" @hideModal="hideModal" :hint="hint"></modal>
	</div>
	<router-link v-else :to="{name: 'create'}" class="create">&nbsp;新建问卷</router-link>
</template>
<script>
import store from '../store'
import Modal from './Modal'
export default {
	data () {
		return {
			formList: [],
			hasQsnr: false,
			id: -1,
			ifShowModal: false,
			hint: ''
		}
	},
	components: {
		Modal
	},
	created () {
		var cookie = store.fetch();
		if(!cookie.token) {
			this.$router.push({name: 'login'});
			return;
		}

		this.$http.get('/api/qsnr/getQsnrLists').then(response => {
			var data = response.body;
			if(data.length){
				// console.log(data);
				this.hasQsnr = true;
				this.formList = data;
			}
		}, err => {
			console.log(err);
		})
	},
	methods: {
		delSurvey (id) {
			this.id = id;
			this.ifShowModal = true;
			this.hint = 'delete';
		},
		hideModal (state) {
			if(state == 'delete'){
				let url = '/api/qsnr/deleteQsnr/' + this.id;
				this.$http.get(url).then(response => {
					var idx = -1;
					this.formList.forEach((item, index) => {
						if(item._id === this.id) {
							idx = index;
							return;
						}
					})
					this.formList.splice(idx, 1);
				}, err => {
					console.log(err);
				})
			}
			this.ifShowModal = false;
		}
	},
	filters: {
		stateContent (state) {
			switch(state) {
				case 'draft':
					return '未发布';
					break;
				case 'publish':
					return '已发布';
					break;
				case 'end':
					return '已结束';
					break;
				case '':
					return '未设置';
					break;
			}
		}
	}
}
</script>
<style>
.create{
  cursor: pointer;
  display: inline-block;
  margin: 2rem 0;
  padding: .5rem 1.5rem;
  font-size: 1.6rem;
  background-color: #ee7416;
  box-shadow: 0 .05em .25em rgba(0,0,0,.5);
  text-shadow: 0 -.05em .05em rgba(0,0,0,.5);
  color: #fff;
  border-radius: .2rem;
  text-decoration: none;
}
.create:before{
  content: '\+';
}
.publish{
	color: red;
}
</style>