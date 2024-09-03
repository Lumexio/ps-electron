import { createWebHashHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
 {
  path: '/',
  component: () => import('../views/products/products-main.vue')
 },
 {
  path: '/category',
  name: 'Category',
  component: () => import('../views/categorys/category-main.vue')
 },
 {
  path: '/crossbars',
  name: 'Crossbar',
  component: () => import('../views/crossbars/crossbar-main.vue')
 },
 {
  path: '/products',
  name: 'Products',
  component: () => import('../views/products/products-main.vue')
 },
 {
  path: '/racks',
  name: 'Rack',
  component: () => import('../views/racks/rack-main.vue')
 },
]
const router = createRouter({
 history: createWebHashHistory(),
 routes
})
export default router