import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 에러 화면
import notFound from '../views/errorpage/NotFound.vue'

//추가 기능 구현완료
import conTact from '../views/codeMachine/askNanswer.vue'

// 구현은 되었으나 역량부족한부분
import admincont from '../views/codeMachine/missingplace/customerCont.vue'
import registration from '../views/codeMachine/missingplace/registration.vue'
import login from '../views/codeMachine/missingplace/login.vue'
import contdetail from '../views/codeMachine/missingplace/contdetail.vue'

// 메인 화면
import codeMachine from '../views/layout/codeMachine.vue'
const pickAlchol = () => import(/* webpackChunkName: "main" */ '@/views/codeMachine/common/pickrcomp/pickAlchol.vue')
const bestFilter = () => import(/* webpackChunkName: "main" */ '@/views/codeMachine/common/pickrcomp/bestFilter.vue')
const alcholEvent = () => import(/* webpackChunkName: "main" */ '@/views/codeMachine/common/pickrcomp/alcholEvent.vue')
const detailCategory = () => import('@/views/codeMachine/common/pickrcomp/detailCategory.vue')
const routes = [
	{ path: '*', name: 'notfound', component: notFound },
	{
		path: '/',
		name: 'Home',
		redirect: 'alchol',
		component: codeMachine,
		children: [
			{
				path: 'alchol',
				component: pickAlchol,
				name: 'pickup',
			},
			{
				path: 'best',
				component: bestFilter,
				name: 'bestsell',
			},
			{
				path: 'event',
				component: alcholEvent,
				name: 'eventon',
			},
			{
				path: 'categories',
				component: detailCategory,
				name: 'smallcategory',
			},
		],
	},
	{ path: '/contact', name: 'contact', component: conTact },
	{ path: '/contadmin', name: 'contadmin', component: admincont },
	{ path: '/contdeail', name: 'contdetail', component: contdetail },
	{ path: '/register', name: 'registration', component: registration },
	{ path: '/login', name: 'login', component: login },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
