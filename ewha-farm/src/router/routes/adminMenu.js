export default [
  {
    path: '/user/list',
    name: 'user-list',
    component: () => import('@/views/admin/user-list/UsersList.vue'),
    meta: {
      resource: 'Auth',
    },
  },
  {
    path: '/user/view/:id',
    name: 'user-view',
    component: () => import('@/views/admin/user-view/UserView.vue'),
    meta: {
      resource: 'Auth',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/admin/AdminTestView.vue'),
    meta: {
      resource: 'Auth',
    },
  },
]
