/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: 'noredirect',
  name: 'User',
  meta: {
    title: 'users',
    icon: 'user'
  },
  children: [
    {
      path: 'updata',
      component: () => import('@/views/user/updata'),
      name: 'adduser',
      meta: { title: 'updataUser', noCache: true, view_id: 'main-addUser' }
    }
  ]
}

export default userRouter
