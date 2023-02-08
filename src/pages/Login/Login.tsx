import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import Input from 'src/components/Input';
import { schema, Schema } from 'src/utils/rules';
import authApi from 'src/apis/auth.api';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import { AppContext } from 'src/contexts/app.context';
import Button from 'src/components/Button';
import paths from 'src/constants/paths';

type FormData = Pick<Schema, 'email' | 'password'>;
const loginSchema = schema.pick(['email', 'password']);

export default function Login() {
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
    } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

    const loginMutation = useMutation({
        mutationFn: (body: FormData) => authApi.login(body)
    });

    const handleSubmitForm = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setIsAuthenticated(true);
                setProfile(data.data.data.user);
                navigate(paths.home);
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof FormData, {
                                message: formError[key as keyof FormData],
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
                <title>Đăng Nhập | Shopee Clone</title>
                <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
            </Helmet>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmitForm} noValidate>
                            <div className='text-2xl'>{t('nav header.login')}</div>

                            <Input
                                className='mt-8'
                                type='email'
                                placeholder='Email'
                                register={register}
                                name='email'
                                errorMessage={errors.email?.message}
                            />

                            <Input
                                className='mt-3'
                                type='password'
                                placeholder='Password'
                                register={register}
                                name='password'
                                errorMessage={errors.password?.message}
                                autoComplete='on'
                                classNameEye='absolute top-[12px] right-[5px] h-5 w-5 cursor-pointer'
                            />

                            <div className='mt-3'>
                                <Button
                                    type='submit'
                                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                                    isLoading={loginMutation.isLoading}
                                    disabled={loginMutation.isLoading}
                                >
                                    {t('nav header.login')}
                                </Button>
                            </div>
                            <div className='mt-8 flex items-center justify-center'>
                                <span className='text-gray-400'>{t('auth.new to shopee')}</span>
                                <Link className='ml-1 text-red-400' to={paths.register}>
                                    {t('nav header.sign up')}
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
