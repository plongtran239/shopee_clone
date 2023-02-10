import { beforeAll, describe, expect, it } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import paths from 'src/constants/paths';
import { renderWithRouter } from 'src/utils/testUtils';

expect.extend(matchers);

describe('Login', () => {
    beforeAll(async () => {
        renderWithRouter({ route: paths.login });
        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
        });
    });

    it('Display required error', async () => {
        const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement;
        fireEvent.submit(submitButton);
        await waitFor(async () => {
            expect(await screen.findByText('Email là bắt buộc')).toBeTruthy();
            expect(await screen.findByText('Mật khẩu là bắt buộc')).toBeTruthy();
        });
    });

    it('Display format error', async () => {
        const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
        const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;
        const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement;

        fireEvent.change(emailInput, { target: { value: '123@gm' } });
        fireEvent.change(passwordInput, {
            target: {
                value: '123'
            }
        });
        fireEvent.submit(submitButton);

        expect(await screen.findByText('Email không đúng định dạng')).toBeTruthy();
        expect(await screen.findByText('Độ dài từ 6 - 160 kí tự')).toBeTruthy();
    });
});
