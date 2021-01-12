export default [
  {
    header: 'User',
  },
  {
    title: '대시보드',
    route: 'dashboard',
    icon: 'VideoIcon',
    action: 'read',
    resource: 'ACL',
  },
  {
    title: 'CCTV',
    route: null,
    icon: 'VideoIcon',
    action: 'read',
    resource: 'ACL',
  },
  {
    title: '센서 모니터링',
    route: 'monitoring',
    icon: 'ActivityIcon',
    action: 'read',
    resource: 'ACL',
  },
  {
    title: '원격제어',
    route: null,
    icon: 'SlidersIcon',
    action: 'read',
    resource: 'ACL',
  },
  {
    title: '자동화 설정',
    route: null,
    icon: 'SettingsIcon',
    action: 'read',
    resource: 'ACL',
  },
]
