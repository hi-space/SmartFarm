export default [
  {
    path: '/empty',
    name: 'empty',
    component: () => import('@/views/users/Empty.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
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
    component: () => import('@/views/users/cctv-viewer/CCTVViewer.vue'),
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
    path: '/remote/control',
    name: 'remote-control',
    component: () => import('@/views/users/remote-control/RemoteControl.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
  {
    path: '/remote/setting',
    name: 'remote-setting',
    component: () => import('@/views/users/remote-setting/RemoteSetting.vue'),
    meta: {
      resource: 'User',
      action: 'read',
    },
  },
]
