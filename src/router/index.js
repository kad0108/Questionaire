import Vue from 'vue'
import Router from 'vue-router'
import Square from '../components/Square'
import List from '../components/List'
import Login from '../components/Login'
import Reg from '../components/Reg'
import Error from '../components/Error'
import Create from '../components/Create'
import Fill from '../components/Fill'
import Check from '../components/Check'

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/', name: 'home', component: Square},
		{path: '/login', name: 'login', component: Login},
		{path: '/reg', name: 'reg',　component: Reg},
		{path: '/list',　name: 'list', component: List},
		{path: '/create',　name: 'create', component: Create},
		{path: '/qsnr/:id',　name: 'edit', component: Create},
		{path: '/fill/:id',　name: 'fill', component: Fill},
		{path: '/check/:id',　name: 'check', component: Check},
		{path: '/404', name: 'error', component: Error},
		{path: '*', redirect: '/404'},
	]
})
