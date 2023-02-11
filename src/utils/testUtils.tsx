import { expect } from 'vitest';
import { screen, waitFor, type waitForOptions } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from 'src/App';
import { AppProvider, getInitialAppContext } from 'src/contexts/app.context';

const delay = (time: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });

export const logScreen = async (
    body: HTMLElement = document.body.parentElement as HTMLElement,
    options?: waitForOptions
) => {
    const { timeout = 1000 } = options || {};
    await waitFor(
        async () => {
            expect(await delay(timeout - 100)).toBe(true);
        },
        {
            ...options,
            timeout
        }
    );
    screen.debug(body, 99999999);
};

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
            mutations: {
                retry: false
            }
        },
        logger: {
            log: console.log,
            warn: console.warn,
            //No more errors on the console
            error: () => null
        }
    });
    const Provider = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    return Provider;
};

const Provider = createWrapper();

export const renderWithRouter = ({ route = '/' } = {}) => {
    window.history.pushState('', 'Test Page', route);
    const defaultValueAppContext = getInitialAppContext();
    return {
        user: userEvent.setup(),
        ...render(
            <Provider>
                <AppProvider defaultValue={defaultValueAppContext}>
                    <App />
                </AppProvider>
            </Provider>,
            { wrapper: BrowserRouter }
        )
    };
};
