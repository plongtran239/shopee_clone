import { describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';

import { renderWithRouter } from 'src/utils/testUtils';
import paths from 'src/constants/paths';
import { setAccessTokenToLS } from 'src/utils/auth';
import { access_token_999999s } from 'src/msw/auth.msw';

describe('Profile', () => {
    it('Display Profile page', async () => {
        setAccessTokenToLS(access_token_999999s);
        const { container } = renderWithRouter({ route: paths.profile });
        await waitFor(() => {
            expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe(
                'Trần Phước Long'
            );
        });
    });
});
