<template>
	<form>
		<input type="text" id="account" placeholder="请输入账号" v-model="account">
		<input type="password" v-model="password" id="password" placeholder="请输入密码" @keyup.enter="login">
		<span class="warn">{{warn}}</span>
		<button type="button" @click="login">登录</button>
		<span class="reg" @click="toreg">去注册-></span>
	</form>
</template>

<script>
import store from '../store';
import bus from '../bus';
export default{
	data () {
		return {
			account: '',
			password: '',
			warn: ''
		}
	},
	created () {
		var cookie = store.fetch();
		if(cookie.token) this.$router.push({name: 'list'});
	},
	methods: {
		login () {
			let user = {
				account: this.account,
				password: this.password
			};
			this.$http.post('/api/login/getAccount', user).then(response => {
				// console.log(response);
				let data = response.body;
				if(typeof data === 'string'){
					this.warn = data;
				}else{
					this.warn = '';
					store.save(data);
					bus.$emit('showLogoutBtn');
					this.$router.push({name: 'list'});
				}
			}, err => {
				console.log(err);
			})
		},
		toreg () {
			this.$router.push({name: 'reg'});
		}
	}
}

</script>

<style>

</style>