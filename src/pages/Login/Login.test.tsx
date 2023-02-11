import { beforeAll, describe, expect, it } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import paths from 'src/constants/paths';
import { renderWithRouter } from 'src/utils/testUtils';

expect.extend(matchers);

describe('Login', () => {
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;
    beforeAll(async () => {
        renderWithRouter({ route: paths.login });
        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
        });
        emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
        passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;
        submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement;
    });

    it('Display required error', async () => {
        fireEvent.submit(submitButton);
        await waitFor(() => {
            expect(screen.queryByText('Email là bắt buộc')).toBeTruthy();
            expect(screen.queryByText('Mật khẩu là bắt buộc')).toBeTruthy();
        });
    });

    it('Display format error', async () => {
        fireEvent.change(emailInput, {
            target: {
                value: '123@gm'
            }
        });
        fireEvent.change(passwordInput, {
            target: {
                value: '123'
            }
        });
        fireEvent.submit(submitButton);
        await waitFor(() => {
            expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy();
            expect(screen.queryByText('Độ dài từ 6 - 160 kí tự')).toBeTruthy();
        });
    });

    it('No display error when input correct', async () => {
        fireEvent.change(emailInput, {
            target: {
                value: 'test@mail.com'
            }
        });
        fireEvent.change(passwordInput, {
            target: {
                value: '123456'
            }
        });
        // Những trường hợp chứng minh rằng tìm không ra text hay là element
        // Thì nên dùng query hơn là find hay get
        await waitFor(() => {
            expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy();
            expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy();
        });
        fireEvent.submit(submitButton);

        await waitFor(() => {
            expect(document.querySelector('title')?.textContent).toBe('Trang Chủ | Shopee Clone');
        });
    });
});
