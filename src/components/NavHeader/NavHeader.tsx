import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import authApi from 'src/apis/auth.api';
import paths from 'src/constants/paths';
import { purchasesStatus } from 'src/constants/purchase';
import { AppContext } from 'src/contexts/app.context';
import Popover from '../Popover';
import { getAvatarUrl } from 'src/utils/utils';
import { locales } from 'src/i18n/i18n';

export default function NavHeader() {
    const { t, i18n } = useTranslation('header');

    const currentLanguage = locales[i18n.language as keyof typeof locales];

    const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);

    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            setIsAuthenticated(false);
            setProfile(null);
            queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] });
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const handleChangeLanguage = (language: 'en' | 'vi') => {
        i18n.changeLanguage(language);
    };

    return (
        <div className='flex justify-end'>
            <Popover
                className='flex cursor-pointer items-center py-1 hover:text-white/70'
                renderPopover={
                    <div className='border-grey-200 relative rounded-md border bg-white shadow-md'>
                        <div className='flex flex-col py-2 px-3'>
                            <button className='py-2 px-3 hover:text-orange' onClick={() => handleChangeLanguage('vi')}>
                                Tiếng Việt
                            </button>
                            <button className='py-2 px-3 hover:text-orange' onClick={() => handleChangeLanguage('en')}>
                                English
                            </button>
                        </div>
                    </div>
                }
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                    />
                </svg>
                <span className='mx-1'>{currentLanguage}</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
            </Popover>

            {!isAuthenticated ? (
                <div className='flex items-center'>
                    <Link to={paths.register} className='mx-3 capitalize hover:text-white/70'>
                        {t('nav header.sign up')}
                    </Link>
                    <div className='h-4 border-r-[1px] border-r-white' />
                    <Link to={paths.login} className='mx-3 capitalize hover:text-white/70'>
                        {t('nav header.login')}
                    </Link>
                </div>
            ) : (
                <Popover
                    className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
                    renderPopover={
                        <div className='border-grey-200 relative rounded-md border bg-white shadow-md'>
                            <div className='flex flex-col py-2 px-3'>
                                <Link
                                    to={paths.profile}
                                    className='block bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                                >
                                    {t('nav header.my account')}
                                </Link>
                                <Link
                                    to={paths.historyPurchase}
                                    className='block bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                                >
                                    {t('nav header.my purchase')}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className='block bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                                >
                                    {t('nav header.logout')}
                                </button>
                            </div>
                        </div>
                    }
                >
                    <Link to={paths.historyPurchase} className='flex items-center'>
                        <div className='mr-2 h-6 w-6 flex-shrink-0'>
                            <img
                                src={getAvatarUrl(profile?.avatar)}
                                alt='avatar'
                                className='white h-full w-full rounded-full object-cover'
                            />
                        </div>
                        <div>{profile?.email}</div>
                    </Link>
                </Popover>
            )}
        </div>
    );
}
