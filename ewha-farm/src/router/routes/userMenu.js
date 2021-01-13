export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/users/UserDashboard.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('@/views/users/monitoring/SensorMonitor.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
]
