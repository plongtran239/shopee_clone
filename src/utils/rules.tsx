import type { RegisterOptions, UseFormGetValues } from 'react-hook-form';

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions };

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: 'Email là bắt buộc'
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không đúng định dạng'
        },
        minLength: {
            value: 5,
            message: 'Độ dài từ 5 - 160 kí tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 5 - 160 kí tự'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Mật khẩu là bắt buộc'
        },
        minLength: {
            value: 6,
            message: 'Độ dài từ 6 - 160 kí tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 6 - 160 kí tự'
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Nhập lại mật khẩu là bắt buộc'
        },
        minLength: {
            value: 6,
            message: 'Độ dài từ 6 - 160 kí tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 6 - 160 kí tự'
        },
        validate:
            typeof getValues === 'function'
                ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
                : undefined
    }
});
