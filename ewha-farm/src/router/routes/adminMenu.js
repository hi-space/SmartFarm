export default [
  {
    path: '/users',
    name: 'user-list',
    component: () => import('@/views/admin/user-list/UsersList.vue'),
    meta: {
      resource: 'Auth',
    },
  },
]
