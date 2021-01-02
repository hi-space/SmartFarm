export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: false,
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/pages/authentication/Register.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: false,
    },
  },
  {
    path: '/error/not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/pages/error/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
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
