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
    path: '/cctv',
    name: 'cctv',
    component: () => import('@/views/users/monitoring/CCTVViewer.vue'),
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
  {
    path: '/network',
    name: 'network',
    component: () => import('@/views/users/monitoring/NetworkStateTable.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
]
