export default [
  {
    header: 'User',
  },
  {
    title: '원격제어',
    route: 'remote-control',
    icon: 'ToggleRightIcon',
    action: 'read',
    resource: 'User',
  },
  {
    title: '모니터링',
    route: 'dashboard',
    icon: 'VideoIcon',
    action: 'read',
    resource: 'User',
  },
  {
    title: '자동설정',
    route: 'remote-setting',
    icon: 'SlidersIcon',
    action: 'read',
    resource: 'User',
  },
]
