import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Produto from '../views/Produto.vue'
import Produtos from '../views/Produtos.vue'
import Carrinho from '../views/Carrinho.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos
  },

  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props(route) {
      return {  produto: route.query.produto }
    }
  },

  {
    path: '/carrinho',
    name: 'carrinho',
    component: Carrinho,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
