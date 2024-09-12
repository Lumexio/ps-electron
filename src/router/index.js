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
  path: '/racks',
  name: 'Rack',
  component: () => import('../views/racks/rack-main.vue')
 },
 {
  path: '/products',
  name: 'Products',
  component: () => import('../views/products/products-main.vue')
 },
 {
  path: '/shelves',
  name: 'Shelve',
  component: () => import('../views/shelves/shelve-main.vue')
 },
]
const router = createRouter({
 history: createWebHashHistory(),
 routes
})
export default router