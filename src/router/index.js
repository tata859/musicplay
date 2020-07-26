
import Vue from 'vue'
import VueRouter from 'vue-router'

const musicHall = ()=>import("views/musicHall/musicHall")
const Singer = ()=>import("views/singer/singer")
const Ranking = ()=>import("views/ranking/ranking")
const Profile =()=> import('views/profile/profile')
const Detail = ()=>import("views/detail/detail")
const singerDetail = ()=>import("views/detail/singerdetail")


Vue.use(VueRouter)
//解决vue-router在3.0版本以上重复点击菜单报错问题Error: Avoided redundant navigation to current location
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    redirect: '/musichall',
    component:musicHall
  },
  {
    path: '/musichall',
    component:musicHall
  },
  {
    path:'/musichall/:id',
    component:Detail,
  },
  {
    path: '/singer',
    component:Singer
  },
  {
    path:'/singer/:id',
    component:singerDetail
  },
  {
    path: '/rankin',
    component:Ranking
  },
  {
    path:'/profile',
    component:Profile
  },


]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
