/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const questionsRouter = {
  path: '/questions',
  component: Layout,
  redirect: 'noredirect',
  name: 'Questions',
  alwaysShow: true,
  meta: {
    title: 'questions',
    icon: 'clipboard'
  },
  children: [{
    path: 'addItem',
    component: () =>
                import('@/views/Questions/addItems'),
    name: 'KeyboardChart',
    meta: { title: 'addItem', noCache: true, view_id: 'main-addQuestions' }
  },
  {
    path: 'questionClassification',
    component: () =>
                import('@/views/Questions/addclassify'),
    name: 'LineChart',
    meta: { title: 'questionClassification', noCache: true, view_id: 'main-questionsType' }
  },
  {
    path: 'checkTheItem',
    component: () =>
                import('@/views/Questions/addlist'),
    name: 'MixChart',
    meta: { title: 'checkTheItem', noCache: true, view_id: 'main-watchQuestions' }
  }, {
    path: 'detial',
    hidden: true,
    component: () =>
                import('@/views/Questions/detial'),
    meta: { title: '', noCache: true, view_id: 'main-questionsDetail' }
  }
  ]
}

export default questionsRouter
