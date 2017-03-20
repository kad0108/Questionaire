<template>
	<div>
		<table class="list">
			<thead>
				<tr>
					<th>标题</th>
					<th>截止时间</th>
					<th>发布者</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in formList">
					<td>{{item.qsnr.title}}</td>
					<td>{{item.qsnr.end}}</td>
					<td>{{item.account}}</td>
					<td>
						<router-link tag="button" class="btn" :to="{name: 'fill', params: {id: item._id}}" v-if="item.state=='publish'">填写问卷</router-link>
						<!-- <router-link tag="button" class="btn" :to="{name: 'check', params: {id: index}}" v-if="item.state!='draft'">查看数据</router-link> -->
					</td>
				</tr>
			</tbody>
		</table>
		<!-- <modal v-bind:ifShowModal="ifShowModal" v-on:hideModal="hideModal" v-bind:hint="hint"></modal> -->
	</div>
</template>
<script>
import store from '../store'
import Modal from './Modal'
export default {
	data () {
		return {
			formList: [],
			id: -1,
		}
	},
	components: {
		Modal
	},
	created () {
		this.$http.get('/api/qsnr/square').then(response => {
			var data = response.body;
			if(data.length){
				this.formList = data;
			}
		}, err => {
			console.log(err);
		})
	},
	methods: {
		
	}
}
</script>
<style>

</style>