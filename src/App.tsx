import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';

import useRouteElements from './useRouteElements';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext } from './contexts/app.context';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const routeElements = useRouteElements();

    const { reset } = useContext(AppContext);

    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLS', reset);
        return () => {
            LocalStorageEventTarget.removeEventListener('clearLS', reset);
        };
    }, [reset]);

    return (
        <div>
            <HelmetProvider>
                <ErrorBoundary>
                    {routeElements}
                    <ToastContainer />
                </ErrorBoundary>
                <ReactQueryDevtools initialIsOpen={false} />
            </HelmetProvider>
        </div>
    );
}

export default App;
