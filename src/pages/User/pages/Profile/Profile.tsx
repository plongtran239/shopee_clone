import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import userApi from 'src/apis/user.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import InputNumber from 'src/components/InputNumber';
import { AppContext } from 'src/contexts/app.context';
import { setProfileToLS } from 'src/utils/auth';
import { userSchema, UserSchema } from 'src/utils/rules';
import DateSelect from '../../components/DateSelect';
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import InputFile from 'src/components/InputFile';

function Info() {
    const { t } = useTranslation('user');

    const {
        register,
        control,
        formState: { errors }
    } = useFormContext<FormData>();

    return (
        <>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('profile.name')}</div>
                <div className='sm:w-[80%] sm:pl-5'>
                    <Input
                        classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                        register={register}
                        name='name'
                        placeholder='Tên'
                        errorMessage={errors.name?.message}
                    />
                </div>
            </div>

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('profile.phone')}</div>
                <div className='sm:w-[80%] sm:pl-5'>
                    <Controller
                        control={control}
                        name='phone'
                        render={({ field }) => (
                            <InputNumber
                                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                                placeholder='Số điện thoại'
                                errorMessage={errors.phone?.message}
                                {...field}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('profile.address')}</div>
                <div className='sm:w-[80%] sm:pl-5'>
                    <Input
                        classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                        register={register}
                        name='address'
                        placeholder='Địa chỉ'
                        errorMessage={errors.address?.message}
                    />
                </div>
            </div>
        </>
    );
}

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>;

type FormDataError = Omit<FormData, 'date_of_birth'> & {
    date_of_birth?: string;
};

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar']);

export default function Profile() {
    const { t } = useTranslation('user');

    const { setProfile } = useContext(AppContext);

    const [file, setFile] = useState<File>();

    const previewImage = useMemo(() => {
        return file ? URL.createObjectURL(file) : '';
    }, [file]);

    const methods = useForm<FormData>({
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            avatar: '',
            date_of_birth: new Date(1990, 1, 1)
        },
        resolver: yupResolver(profileSchema)
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
        setError
    } = methods;

    const avatar = watch('avatar');

    const { data: profileData, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile
    });

    const profile = profileData?.data.data;

    const updateProfileMutation = useMutation(userApi.updateProfile);

    const uploadAvatarMutation = useMutation(userApi.uploadAvatar);

    useEffect(() => {
        if (profile) {
            setValue('name', profile.name);
            setValue('phone', profile.phone);
            setValue('address', profile.address);
            setValue('avatar', profile.avatar);
            setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
        }
    }, [profile, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let avatarName = avatar;

            if (file) {
                const form = new FormData();
                form.append('image', file);
                const uploadRes = await uploadAvatarMutation.mutateAsync(form);
                avatarName = uploadRes.data.data;
                setValue('avatar', avatarName);
            }

            const res = await updateProfileMutation.mutateAsync({
                ...data,
                date_of_birth: data.date_of_birth?.toISOString(),
                avatar: avatarName
            });
            setProfile(res.data.data);
            setProfileToLS(res.data.data);
            refetch();
            toast.success(res.data.message, { autoClose: 1500, position: 'top-center' });
        } catch (error) {
            if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
                const formError = error.response?.data.data;
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof FormDataError, {
                            message: formError[key as keyof FormDataError],
                            type: 'Server'
                        });
                    });
                }
            }
        }
    });

    const handleChangeFile = (file?: File) => {
        setFile(file);
    };

    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>{t('profile.my profile')}</h1>
                <div className='mt-1 text-sm text-gray-700'>{t('profile.my profile desc')}</div>
            </div>
            <FormProvider {...methods}>
                <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
                    <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
                        <div className='flex flex-col flex-wrap sm:flex-row'>
                            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
                            <div className='sm:w-[80%] sm:pl-5'>
                                <div className='pt-3 text-gray-700'>{profile?.email}</div>
                            </div>
                        </div>

                        <Info />

                        <Controller
                            control={control}
                            name='date_of_birth'
                            render={({ field }) => (
                                <DateSelect
                                    errorMessage={errors.date_of_birth?.message}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
                            <div className='sm:w-[80%] sm:pl-5'>
                                <Button
                                    className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                                    type='submit'
                                >
                                    {t('profile.save')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
                        <div className='flex flex-col items-center'>
                            <div className='my-5 h-24 w-24'>
                                <img
                                    src={previewImage || getAvatarUrl(avatar)}
                                    alt=''
                                    className='h-full w-full rounded-full object-cover'
                                />
                            </div>

                            <InputFile onChange={handleChangeFile} />

                            <div className='mt-3 text-gray-400'>
                                <div>{t('profile.size')}</div>
                                <div>{t('profile.extension')}</div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
