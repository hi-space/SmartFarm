export default [
  {
    path: '/user/list',
    name: 'user-list',
    component: () => import('@/views/admin/user-list/UsersList.vue'),
    meta: {
      resource: 'Admin',
      action: 'manage',
      breadcrumb: [
        {
          text: '사용자 목록',
          active: true,
        },
      ],
    },
  },
  {
    path: '/user/view/:id',
    name: 'user-view',
    component: () => import('@/views/admin/user-view/UserView.vue'),
    meta: {
      resource: 'Admin',
      action: 'manage',
      breadcrumb: [
        {
          text: '사용자 목록',
          to: '/user/list',
          active: false,
        },
        {
          text: '사용자 정보',
          active: true,
        },
      ],
    },
  },
]
