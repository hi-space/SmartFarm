export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/auth/Login.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/pages/auth/Register.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/error/not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/pages/error/NotAuthorized.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/pages/error/Error.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/account-setting',
    name: 'account-setting',
    component: () => import('@/views/pages/account-setting/AccountSetting.vue'),
    meta: {
      pageTitle: '사용자 설정',
      breadcrumb: [
        {
          text: '사용자 설정',
          active: true,
        },
      ],
    },
  },
]
