const goods = () => import('@/views/main/product/goods/goods.vue')
export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goods,
  meta: {
    title: '商品中心 / 商品信息'
  },
  children: []
}
