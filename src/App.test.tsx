import { describe, expect, test } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import paths from './constants/paths';
import { renderWithRouter } from './utils/testUtils';

expect.extend(matchers);

describe('App', () => {
    test('App render and change page', async () => {
        const { user } = renderWithRouter({});

        /**
         * waitFor sẽ run callback 1 vài lần
         * cho đến khi hết timeout hoặc expect pass
         * số lần run phụ thuộc vào timeout và interval
         * mặc định: timeout = 1000ms và interval = 50ms
         */

        // Verify vào đúng trang chủ
        await waitFor(() => {
            expect(document.querySelector('title')?.textContent).toBe('Trang Chủ | Shopee Clone');
        });

        // Verify chuyển sang trang login
        await user.click(screen.getByText(/Đăng nhập/i));
        await waitFor(() => {
            expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument();
            expect(document.querySelector('title')?.textContent).toBe('Đăng Nhập | Shopee Clone');
        });
    });

    test('Page not found', async () => {
        const badRoute = '/bad/route';
        renderWithRouter({ route: badRoute });
        await waitFor(() => {
            expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
        });
    });

    test('Render register page', async () => {
        renderWithRouter({ route: paths.register });
        await waitFor(() => {
            expect(screen.getByText(/Bạn đã có tài khoản/i)).toBeInTheDocument();
        });
        // screen.debug(document.body.parentElement as HTMLElement, 999999999);
    });
});
