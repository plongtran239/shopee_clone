import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

expect.extend(matchers);

describe('App', () => {
    test('App render and change page', async () => {
        render(<App />, {
            wrapper: BrowserRouter
        });

        const user = userEvent.setup();

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
        screen.debug(document.body.parentElement as HTMLElement, 999999999);
    });
});
