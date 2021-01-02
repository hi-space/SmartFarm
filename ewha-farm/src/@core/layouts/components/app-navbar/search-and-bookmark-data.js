/* eslint-disable */
// prettier-ignore
export default {
  pages: {
    key: 'title',
    data: [
      { title: 'Access Control', route: { name: 'access-control' }, icon: 'ShieldIcon', isBookmarked: false },
      { title: 'Wishlist', route: { name: 'apps-e-commerce-wishlist' }, icon: 'HeartIcon', isBookmarked: false },
    ],
  },
  files: {
    key: 'file_name',
    data: [
      {
        file_name: "Joe's CV",
        from: 'Stacy Watson',
        icon: require('@/assets/images/icons/doc.png'),
        size: '1.7 mb',
      },
    ],
  },
  contacts: {
    key: 'name',
    data: [
      {
        img: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
        name: 'Rena Brant',
        email: 'nephrod@preany.co.uk',
        time: '21/05/2019',
      },
    ],
  },
}
/* eslint-enable */
