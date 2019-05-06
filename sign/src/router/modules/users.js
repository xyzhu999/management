/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noredirect',
  name: 'Users',
  alwaysShow: true,
  meta: {
    title: 'users',
    icon: 'user'
  },
  children: [
    {
      path: 'addUsers',
      component: () => import('@/views/adduser/adduser'),
      name: 'addusers',
      meta: { title: 'addUsers', noCache: true, view_id: 'main-addUser' }
    },
    {
      path: 'theUserDisplay',
      component: () => import('@/views/adduser/usershow'),
      name: 'theUserDisplay',
      meta: { title: 'theUserDisplay', noCache: true, view_id: 'main-showUser' }
    }
  ]
}

export default usersRouter
