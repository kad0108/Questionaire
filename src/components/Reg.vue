<template>
	<form>
		<input type="text" id="account" placeholder="请输入账号" v-model="account">
		<input type="password" v-model="password" id="password" placeholder="请输入密码">
		<input type="password" v-model="repwd" id="repwd" placeholder="再次输入密码" @keyup.enter="register">
		<span class="warn">{{warn}}</span>
		<button type="button" @click="register">注册</button>
		<span class="reg" @click="tologin">去登录-></span>
	</form>
</template>
<script>
import store from '../store'
import bus from '../bus'

export default {
	data () {
		return {
			account: '',
			password: '',
			repwd: '',
			warn: ''
		}
	},
	created () {
		var cookie = store.fetch();
		if(cookie.token) this.$router.push({name: 'list'});
	},
	methods: {
		register () {
			if(!this.account.trim() || !this.password.trim() || !this.repwd.trim()) this.warn = '账号或密码不能为空';
			else if(this.password !== this.repwd) this.warn = '密码不一致';
			else {
				let user = {
					account: this.account,
					password: this.password,
				}
				this.$http.post('/api/login/createAccount', user).then(response => {
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
			}
		},
		tologin () {
			this.$router.push({name: 'login'});
		}
	}
}
</script>
<style>
</style>