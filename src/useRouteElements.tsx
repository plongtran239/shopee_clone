import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { AppContext } from './contexts/app.context';
import RegisterLayout from './layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import CartLayout from './layouts/CartLayout';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import paths from 'src/constants/paths';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

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
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: paths.register,
                    element: (
                        <RegisterLayout>
                            <Register />
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
                    path: paths.profile,
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                },
                {
                    path: paths.cart,
                    element: (
                        <CartLayout>
                            <Cart />
                        </CartLayout>
                    )
                }
            ]
        },
        {
            path: paths.productDetail,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },
        {
            path: '',
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            )
        }
    ]);
    return routeElements;
}
