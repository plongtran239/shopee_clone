import { rest } from 'msw';

import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { access_token_1s } from './auth.msw';

const meResponse = {
    message: 'Lấy người dùng thành công',
    data: {
        _id: '63d4fc186d7c62034084fd2f',
        roles: ['User'],
        email: 'long123@gmail.com',
        createdAt: '2023-01-28T10:42:32.765Z',
        updatedAt: '2023-02-07T08:00:32.113Z',
        address: 'Long An, Viet Nam',
        date_of_birth: '2003-09-21T17:00:00.000Z',
        name: 'Trần Phước Long',
        phone: '0123456789',
        avatar: '6607b0bd-0aca-4b80-858f-5b4cbf06dbfa.jpg'
    }
};

const meRequest = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
    const access_token = req.headers.get('authorization');
    if (access_token === access_token_1s) {
        return res(
            ctx.status(HttpStatusCode.Unauthorized),
            ctx.json({
                message: 'Lỗi',
                data: {
                    message: 'Token hết hạn',
                    name: 'EXPIRED_TOKEN'
                }
            })
        );
    }
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(meResponse));
});

const userRequests = [meRequest];

export default userRequests;
