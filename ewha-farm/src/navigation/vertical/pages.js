export default [
  {
    header: 'Page',
  },
  {
    title: 'Pages',
    icon: 'FileIcon',
    children: [
      {
        title: 'Authentication',
        icon: 'CircleIcon',
        children: [
          {
            title: 'Login',
            route: 'auth-login',
            target: '_blank',
          },
          {
            title: 'Register',
            route: 'auth-register',
            target: '_blank',
          },
          {
            title: 'Error',
            route: 'error',
            target: '_blank',
          },
          {
            title: 'Not Authorized',
            route: 'not-authorized',
            target: '_blank',
          },
        ],
      },
    ],
  },
]
