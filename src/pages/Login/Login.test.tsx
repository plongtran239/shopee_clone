import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import paths from 'src/constants/paths';
import { renderWithRouter } from 'src/utils/testUtils';

expect.extend(matchers);

describe('Login', () => {
    it('Display required error', async () => {
        const { user } = renderWithRouter({ route: paths.login });
        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
        });

        const submitButton = document.querySelector('form button[type="submit"]') as Element;
        user.click(submitButton);
        expect(await screen.findByText('Email là bắt buộc')).toBeTruthy();
        expect(await screen.findByText('Mật khẩu là bắt buộc')).toBeTruthy();
    });
});
