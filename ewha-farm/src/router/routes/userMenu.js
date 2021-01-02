export default [
  {
    path: '/test/user',
    name: 'test-user',
    component: () => import('@/views/users/UserTestView.vue'),
    meta: {
      resource: 'Auth',
    },
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('@/views/users/monitoring/SensorMonitor.vue'),
    meta: {
      resource: 'Auth',
    },
  },
]
