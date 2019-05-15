import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import gram from '@/view/gram'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/gram',
			name: 'gram',
			component: gram
		},{
			path: '/chat',
			name: 'chat',
			component:  () => import('@/view/chat')
		},{
			path: '/dialogue',
			name: 'dialogue',
			component:  () => import('@/view/dialogue')
		}
	]
})