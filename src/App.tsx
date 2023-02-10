import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import useRouteElements from './useRouteElements';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext, AppProvider } from './contexts/app.context';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const routeElements = useRouteElements();

    const { reset } = useContext(AppContext);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 0
            }
        }
    });

    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLS', reset);
        return () => {
            LocalStorageEventTarget.removeEventListener('clearLS', reset);
        };
    }, [reset]);

    return (
        <div>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <AppProvider>
                        <ErrorBoundary>
                            {routeElements}
                            <ToastContainer />
                        </ErrorBoundary>
                    </AppProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
}

export default App;
