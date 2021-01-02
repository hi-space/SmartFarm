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
    path: '/cctv',
    name: 'cctv',
    component: () => import('@/views/users/monitoring/sensor-card/SensorStateCard.vue'),
    meta: {
      resource: 'Auth',
    },
  },
]
