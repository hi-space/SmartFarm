export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/users/UserDashboard.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
  {
    path: '/cctv',
    name: 'cctv',
    component: () => import('@/views/users/monitoring/CCTVViewer.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('@/views/users/monitoring/SensorMonitor.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
  {
    path: '/network',
    name: 'network',
    component: () => import('@/views/users/monitoring/NetworkStateTable.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
  {
    path: '/remote',
    name: 'remote',
    component: () => import('@/views/users/remote-control/RemoteControl.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
]
