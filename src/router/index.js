import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/pages/Index"
import Home from "../components/pages/Home"
import Cate from "../components/pages/Cate"
import Cart from "../components/pages/Cart"
import Mine from "../components/pages/Mine"
import Detail from "../components/pages/Detail"
import Login from "../components/pages/Login"
import Register from "../components/pages/Register"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children:[
        {path:'home',component:Home},
        {path:'cate',component:Cate},
        {path:'cart',component:Cart},
        {path:'mine',component:Mine},
        {path:"",redirect:'home'}
      ]
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:Detail,
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ]
})
