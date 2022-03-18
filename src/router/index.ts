import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import localCache from '@/utils/cache'
import basicRoute from './modules/basic'
// console.log(process.env.BASE_URL)
// import { mapMenuToRoute } from '@/utils/mapMenu'
const router = createRouter({
  //createWebHistory() // 没有 base，应用托管在域名 `https://example.com` 的根目录下。

  history: createWebHistory(process.env.BASE_URL),
  routes: basicRoute
})
router.beforeEach(async (to: any, from, next) => {
  if (to.name != 'login') {
    if (!localCache.getCache('token')) {
      next({ name: 'login' })
    } else {
      next()
      // 解决动态路由找不到
      // if (!router.hasRoute(to.name)) {
      //   const routes = mapMenuToRoute()
      //   routes.forEach((route) => {
      //     router.addRoute('main', route)
      //   })
      //   next({ ...to, replace: true })
      // } else {
      //   next()
      // }
    }
  } else {
    // 登录过的用户不能进入登录页面
    if (localCache.getCache('token')) {
      next({ name: 'overview' })
    } else {
      next()
    }
  }
})
export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
