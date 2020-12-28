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
        url: "/user-list",
        name: "회원관리",
        slug: "home",
        icon: "UserIcon",
      },
      {
        url: "/user-view",
        name: "회원 확인",
        slug: "user-view",
        icon: "UserIcon",
      },
      {
        url: "/farm-register",
        name: "함체 등록",
        slug: "about",
        icon: "PlusCircleIcon",
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
