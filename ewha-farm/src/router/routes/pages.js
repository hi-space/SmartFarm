export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/auth/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/pages/auth/Register.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
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
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/account-setting',
    name: 'account-setting',
    component: () => import('@/views/pages/account-setting/AccountSetting.vue'),
    meta: {
      pageTitle: '사용자 설정',
      resource: 'Auth',
      breadcrumb: [
        {
          text: '사용자 설정',
          active: true,
        },
      ],
    },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/views/pages/contacts/Contacts.vue'),
    meta: {
      pageTitle: '담당자 연락처',
      resource: 'Auth',
      breadcrumb: [
        {
          text: '담당자 연락처',
          active: true,
        },
      ],
    },
  },
]
