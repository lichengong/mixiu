import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index=()=>import('views/Index')
const Login=()=>import('views/Login')
const Register=()=>import('views/Register')
const NotFound=()=>import('views/404')
const Home=()=>import('views/Home')
const InfoShow=()=>import('views/InfoShow')
const FundList=()=>import('views/FundList')
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path:'/index',
    component:Index,
    children:[{path:'',component:Home},{path:'/home',component:Home},{path:'/fundlist',component:FundList},{path:'/infoshow',component:InfoShow}]
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'*',
    component:NotFound
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  var user = localStorage.getItem('eleToken')
  if(user){
    next()
  }else{
    if(to.path =='/login'|| to.path == '/register'){
      next()
    }else{
      next('/login')
    }
  }
})
export default router
