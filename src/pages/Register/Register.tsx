import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';

import Input from 'src/components/Input';
import { schema, Schema } from 'src/utils/schemas';
import { registerAccount } from 'src/apis/auth.api';

type FormData = Schema;

export default function Register() {
    const {
        register,
        handleSubmit,
        // getValues,
        // watch,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
    });

    const handleSubmitForm = handleSubmit((data) => {
        const body = omit(data, ['confirm_password']);
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data);
            }
        });
    });

    return (
        <div className='bg-orange'>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmitForm} noValidate>
                            <div className='text-2xl'>Đăng ký</div>

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
                            />

                            <Input
                                className='mt-2'
                                type='password'
                                placeholder='Confirm Password'
                                register={register}
                                name='confirm_password'
                                errorMessage={errors.confirm_password?.message}
                                autoComplete='on'
                            />

                            <div className='mt-2'>
                                <button
                                    type='submit'
                                    className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <div className='mt-8 flex items-center justify-center'>
                                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                                <Link className='ml-1 text-red-400' to='/login'>
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
