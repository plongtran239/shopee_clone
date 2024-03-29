import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import omit from 'lodash/omit';
import { Helmet } from 'react-helmet-async';

import Input from 'src/components/Input';
import { schema, Schema } from 'src/utils/rules';
import authApi from 'src/apis/auth.api';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import { AppContext } from 'src/contexts/app.context';
import Button from 'src/components/Button';
import paths from 'src/constants/paths';
import { useTranslation } from 'react-i18next';

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>;
const registerSchema = schema.pick(['email', 'password']);

export default function Register() {
    const { t } = useTranslation('header');

    const { setIsAuthenticated, setProfile } = useContext(AppContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        // getValues,
        // watch,
        setError,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(registerSchema) });

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
    });

    const handleSubmitForm = handleSubmit((data) => {
        const body = omit(data, ['confirm_password']);
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                setIsAuthenticated(true);
                setProfile(data.data.data.user);
                navigate(paths.home);
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirm_password'>, {
                                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                                type: 'Server'
                            });
                        });
                    }
                }
            }
        });
    });

    return (
        <div className='bg-orange'>
            <Helmet>
                <title>Đăng Ký | Shopee Clone</title>
                <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
            </Helmet>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmitForm} noValidate>
                            <div className='text-2xl'>{t('nav header.sign up')}</div>

                            <Input
                                className='mt-8'
                                type='email'
                                placeholder='Email'
                                register={register}
                                name='email'
                                errorMessage={errors.email?.message}
                            />

                            <Input
                                className='mt-2'
                                type='password'
                                placeholder='Password'
                                register={register}
                                name='password'
                                errorMessage={errors.password?.message}
                                autoComplete='on'
                                classNameEye='absolute top-[12px] right-[5px] h-5 w-5 cursor-pointer'
                            />

                            <Input
                                className='mt-2'
                                type='password'
                                placeholder='Confirm Password'
                                register={register}
                                name='confirm_password'
                                errorMessage={errors.confirm_password?.message}
                                autoComplete='on'
                                classNameEye='absolute top-[12px] right-[5px] h-5 w-5 cursor-pointer'
                            />

                            <div className='mt-2'>
                                <Button
                                    type='submit'
                                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                                    isLoading={registerAccountMutation.isLoading}
                                    disabled={registerAccountMutation.isLoading}
                                >
                                    {t('nav header.sign up')}
                                </Button>
                            </div>
                            <div className='mt-8 flex items-center justify-center'>
                                <span className='text-gray-400'>{t('auth.have an account')}</span>
                                <Link className='ml-1 text-red-400' to={paths.login}>
                                    {t('nav header.login')}
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
