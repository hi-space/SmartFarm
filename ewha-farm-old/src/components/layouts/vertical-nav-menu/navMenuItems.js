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
      },
    ]
  },
  {
    header: 'Pages',
    icon: 'PackageIcon',
    items: [
      {
        url: "/pages/login",
        name: "Login",
        slug: "Login",
        icon: "FileIcon",
      },
      {
        url: "/pages/register",
        name: "Register",
        slug: "Login",
        icon: "FileIcon",
      },
      {
        url: "/pages/error-404",
        name: "Error404",
        slug: "Login",
        icon: "FileIcon",
      },
      {
        url: "/pages/error-500",
        name: "Error500",
        slug: "Error500",
        icon: "FileIcon",
      }
    ]
  },
  {
    header: 'Admin',
    icon: 'PackageIcon',
    items: [
      {
        url: "/users",
        name: "회원관리",
        slug: "home",
        icon: "UsersIcon",
      },
      {
        url: "/user/view/123",
        name: "회원 확인",
        slug: "user-view",
        icon: "UserIcon",
      },
      {
        url: "/user/farm",
        name: "함체 등록",
        slug: "about",
        icon: "PlusCircleIcon",
      },
    ]
  },
  {
    header: 'User',
    icon: 'PackageIcon',
    items: [
      {
        url: '/monitor/cctv',
        name: "CCTV",
        icon: "VideoIcon"
      },
      {
        url: '/monitor/sensor',
        name: "센서 모니터링",
        icon: "ActivityIcon"
      },
      {
        url: '/control/remote',
        name: "원격제어",
        icon: "SlidersIcon"
      },
      {
        url: '/control/setting',
        name: '자동화 설정',
        icon: "SettingsIcon"
      }
    ]
  }
]
