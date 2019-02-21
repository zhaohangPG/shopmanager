import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Rights from '../components/rights.vue'
import Rolechange from '../components/rolechange.vue'
import GoodsAdd from '../components/goodsAdd.vue'
import Goodslist from '../components/goodslist.vue'
import Goodscate from '../components/goodscate.vue'
import Goodsparams from '../components/goodsparams.vue'
import Order from '../components/order.vue'
import Reports from '../components/reports.vue'

import {
  Message
} from 'element-ui';


Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Rolechange
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goodslist
        },
        {
          name: 'goodsadd',
          path: '/goodsAdd',
          component: GoodsAdd
        }, 
        {
          name: 'params',
          path: '/params',
          component: Goodsparams
        },
        {
          name: 'categories',
          path: '/categories',
          component: Goodscate
        },
        {
          name: 'orders',
          path: '/orders',
          component: Order
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
  // console.log(to)
  // console.log(from)
  if (to.name === 'login') {
    next();
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        name: 'login'
      })
      Message.warning('请先登录')
    }
    next();
  }

})

export default router;

