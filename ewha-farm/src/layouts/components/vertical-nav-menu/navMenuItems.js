export default [
  {
    header: 'Dashboard',
    icon: 'PackageIcon',
    items: [
      {
        url: "/",
        name: "Home",
        slug: "home",
        icon: "HomeIcon",
      }
    ]
  },
  {
    header: 'Admin',
    icon: 'PackageIcon',
    items: [
      {
        url: "/user-list",
        name: "회원관리",
        slug: "home",
        icon: "UserIcon",
        submenu: [
          {
            url: "/user-list",
            name: "고객 현황"
          },
          {
            url: "/device-list",
            name: "장치 현황"
          }
        ]
      },
      {
        url: null,
        name: "등록",
        slug: "about",
        icon: "PlusCircleIcon",
        submenu: [
          {
            url: null,
            name: "함체 등록",
          },
          {
            url: null,
            name: "릴레이 등록",
          },
        ]
      },
      {
        url: null,
        name: "버튼 타입",
        slug: "about",
        icon: "SettingsIcon",
      }
    ]
  },
  {
    header: 'User',
    icon: 'PackageIcon',
    items: [
      {
        url: null,
        name: "CCTV",
        icon: "VideoIcon"
      },
      {
        url: null,
        name: "원격제어",
        icon: "SlidersIcon"
      },
      {
        url: null,
        name: "센서 모니터링",
        icon: "ActivityIcon"
      },
      {
        url: null,
        name: '자동화 설정',
        icon: "SettingsIcon"
      }
    ]
  }

  
]
