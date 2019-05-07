import Layout from '@/layout'

const classesRouter = {
  path: '/classes',
  component: Layout,
  redirect: 'noredirect',
  name: 'Classes',
  alwaysShow: true,
  meta: {
    title: 'classes',
    icon: 'chart'
  },
  children: [
    {
      path: 'class',
      component: () => import('@/views/classzl/class'),
      name: 'class',
      meta: { title: 'classManagement', noCache: true, view_id: 'main-grade' }
    },
    {
      path: 'classroom',
      component: () => import('@/views/classzl/classroom'),
      name: 'classroom',
      meta: { title: 'classroom', noCache: true, view_id: 'main-student' }
    },
    {
      path: 'student',
      component: () => import('@/views/classzl/student'),
      name: 'student',
      meta: { title: 'student', noCache: true, view_id: 'main-room' }
    }
  ]
}

export default classesRouter
