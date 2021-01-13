export default [
  {
    header: 'User',
  },
  {
    title: '대시보드',
    route: 'dashboard',
    icon: 'VideoIcon',
    action: 'read',
    resource: 'Auth',
  },
  {
    title: 'CCTV',
    route: 'cctv',
    icon: 'VideoIcon',
    action: 'read',
    resource: 'Auth',
  },
  {
    title: '센서 모니터링',
    route: 'monitoring',
    icon: 'ActivityIcon',
    action: 'read',
    resource: 'Auth',
  },
  {
    title: '네트워크 상태',
    route: 'network',
    icon: 'SettingsIcon',
    action: 'read',
    resource: 'Auth',
  },
  {
    title: '원격제어',
    route: null,
    icon: 'SlidersIcon',
    action: 'read',
    resource: 'Auth',
  },
]
