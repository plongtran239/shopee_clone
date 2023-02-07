import { useContext, lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { AppContext } from './contexts/app.context';
import RegisterLayout from './layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import CartLayout from './layouts/CartLayout';
import paths from 'src/constants/paths';
import UserLayout from './pages/User/layouts/UserLayout';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ProductList from './pages/ProductList';
// import ProductDetail from './pages/ProductDetail';
// import Cart from './pages/Cart';
// import Profile from './pages/User/pages/Profile';
// import ChangePassword from './pages/User/pages/ChangePassword';
// import HistoryPurchase from './pages/User/pages/HistoryPurchase';
// import NotFound from './pages/NotFound';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/User/pages/Profile'));
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'));
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />;
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to={paths.home} />;
}

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: paths.login,
                    element: (
                        <RegisterLayout>
                            <Suspense>
                                <Login />
                            </Suspense>
                        </RegisterLayout>
                    )
                },
                {
                    path: paths.register,
                    element: (
                        <RegisterLayout>
                            <Suspense>
                                <Register />
                            </Suspense>
                        </RegisterLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: paths.cart,
                    element: (
                        <CartLayout>
                            <Suspense>
                                <Cart />
                            </Suspense>
                        </CartLayout>
                    )
                },
                {
                    path: paths.user,
                    element: (
                        <MainLayout>
                            <UserLayout />
                        </MainLayout>
                    ),
                    children: [
                        {
                            path: paths.profile,
                            element: (
                                <Suspense>
                                    <Profile />
                                </Suspense>
                            )
                        },
                        {
                            path: paths.changePassword,
                            element: (
                                <Suspense>
                                    <ChangePassword />
                                </Suspense>
                            )
                        },
                        {
                            path: paths.historyPurchase,
                            element: (
                                <Suspense>
                                    <HistoryPurchase />
                                </Suspense>
                            )
                        }
                    ]
                }
            ]
        },
        {
            path: paths.productDetail,
            element: (
                <MainLayout>
                    <Suspense>
                        <ProductDetail />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: '',
            index: true,
            element: (
                <MainLayout>
                    <Suspense>
                        <ProductList />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: '*',
            element: (
                <Suspense>
                    <NotFound />
                </Suspense>
            )
        }
    ]);
    return routeElements;
}
