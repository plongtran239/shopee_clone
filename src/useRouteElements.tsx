import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import RegisterLayout from './layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const isAuthenticated = true;

function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: 'login',
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: 'register',
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
                    path: 'profile',
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                }
            ]
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
