const paths = {
    home: '/',
    user: '/user',
    profile: '/user/profile',
    changePassword: '/user/password',
    historyPurchases: '/user/purchase',
    login: '/login',
    register: '/register',
    logout: '/logout',
    productDetail: ':nameId',
    cart: '/cart'
} as const;

export default paths;
