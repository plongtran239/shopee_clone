import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import paths from 'src/constants/paths';
import { AppContext } from 'src/contexts/app.context';
import { getAvatarUrl } from 'src/utils/utils';

export default function UserSideNav() {
    const { t } = useTranslation('user');

    const { profile } = useContext(AppContext);

    return (
        <div>
            <div className='flex items-center border-b border-b-gray-200 py-4'>
                <NavLink
                    to={paths.profile}
                    className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
                >
                    <img
                        src={getAvatarUrl(profile?.avatar)}
                        alt={profile?.name}
                        className='h-full w-full object-cover'
                    />
                </NavLink>
                <div className='flex-grow pl-4'>
                    <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.email}</div>
                    <NavLink to={paths.profile} className='flex items-center capitalize text-gray-500'>
                        <svg
                            width={12}
                            height={12}
                            viewBox='0 0 12 12'
                            xmlns='http://www.w3.org/2000/svg'
                            style={{ marginRight: 4 }}
                        >
                            <path
                                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                                fill='#9B9B9B'
                                fillRule='evenodd'
                            />
                        </svg>
                        {t('side nav.edit profile')}
                    </NavLink>
                </div>
            </div>
            <div className='mt-7'>
                <NavLink
                    to={paths.profile}
                    className={({ isActive }) =>
                        classNames('flex items-center capitalize transition-colors', {
                            'text-orange': isActive,
                            'text-gray-600': !isActive
                        })
                    }
                >
                    <div className='mr-3 h-[22px] w-[22px]'>
                        <PersonOutlinedIcon />
                    </div>
                    {t('side nav.my account')}
                </NavLink>
                <NavLink
                    to={paths.changePassword}
                    className={({ isActive }) =>
                        classNames('mt-4 flex items-center capitalize transition-colors', {
                            'text-orange': isActive,
                            'text-gray-600': !isActive
                        })
                    }
                >
                    <div className='mr-3 h-[22px] w-[22px]'>
                        <LockResetOutlinedIcon />
                    </div>
                    {t('side nav.change pw')}
                </NavLink>
                <NavLink
                    to={paths.historyPurchase}
                    className={({ isActive }) =>
                        classNames('mt-4 flex items-center capitalize transition-colors', {
                            'text-orange': isActive,
                            'text-gray-600': !isActive
                        })
                    }
                >
                    <div className='mr-3 h-[22px] w-[22px]'>
                        <AssignmentOutlinedIcon />
                    </div>
                    {t('side nav.my purchase')}
                </NavLink>
            </div>
        </div>
    );
}
