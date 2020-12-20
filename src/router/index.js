import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Register from "@/views/Register";
import User from "@/views/User";
import Home from "@/views/Home";
import Upload from "@/views/upload/Upload";
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/login',hidden:true
  },
  {
    path: '/login', component: Login,hidden:true,name:'Login'
  },
  {
    path: '/register', component: Register,hidden:true
  },
  { path: '/home',
    component:Home,
    name:'Home',
    children:[
  { path: '/user', component: User ,name:'user'},
  { path: '/upload', component: Upload,name: 'upload'}
  ]
}
]

const router = new VueRouter({
  routes
})
//路由导航守卫
// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
/*router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})*/

export default router
