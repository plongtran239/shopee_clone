import * as yup from 'yup';
import { AnyObject } from 'yup/lib/types';

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
    const { price_min, price_max } = this.parent as { price_min: string; price_max: string };
    if (price_min !== '' && price_max !== '') {
        return Number(price_min) <= Number(price_max);
    }
    return price_min !== '' || price_max !== '';
}

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
    confirm_password: yup
        .string()
        .required('Nhập lại mật khẩu là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 kí tự')
        .max(160, 'Độ dài từ 6 - 160 kí tự')
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
    price_min: yup.string().test({
        name: 'price-not-allowed',
        message: 'Vui lòng điền khoảng giá phù hợp',
        test: testPriceMinMax
    }),
    price_max: yup.string().test({
        name: 'price-not-allowed',
        message: 'Vui lòng điền khoảng giá phù hợp',
        test: testPriceMinMax
    })
});

export type Schema = yup.InferType<typeof schema>;
