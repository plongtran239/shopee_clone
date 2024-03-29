import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
    const { price_min, price_max } = this.parent as { price_min: string; price_max: string };
    if (price_min !== '' && price_max !== '') {
        return Number(price_min) <= Number(price_max);
    }
    return price_min !== '' || price_max !== '';
}

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Nhập lại password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại password không khớp');
};

export const schema = yup.object({
    email: yup
        .string()
        .required('Email là bắt buộc')
        .email('Email không đúng định dạng')
        .min(5, 'Độ dài từ 5 - 160 kí tự')
        .max(160, 'Độ dài từ 5 - 160 kí tự'),
    password: yup
        .string()
        .required('Mật khẩu là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 kí tự')
        .max(160, 'Độ dài từ 6 - 160 kí tự'),
    confirm_password: handleConfirmPasswordYup('password'),
    price_min: yup.string().test({
        name: 'price-not-allowed',
        message: 'Vui lòng điền khoảng giá phù hợp',
        test: testPriceMinMax
    }),
    price_max: yup.string().test({
        name: 'price-not-allowed',
        message: 'Vui lòng điền khoảng giá phù hợp',
        test: testPriceMinMax
    }),
    name: yup.string().trim().required('Tên sản phẩm không phù hợp')
});

export type Schema = yup.InferType<typeof schema>;

export const userSchema = yup.object({
    name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
    phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
    address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
    avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
    date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
    password: schema.fields['password'],
    new_password: schema.fields['password'],
    confirm_password: handleConfirmPasswordYup('new_password')
});

export type UserSchema = yup.InferType<typeof userSchema>;
