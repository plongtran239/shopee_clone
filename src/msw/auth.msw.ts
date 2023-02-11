import { rest } from 'msw';

import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';

export const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTEwVDAzOjMxOjE1LjU1OVoiLCJpYXQiOjE2NzU5OTk4NzUsImV4cCI6MTY3NTk5OTg3Nn0.eq36EZLDEVKio0oKbX_mHx8rHauCCezH4LY0cAVnLiw';
export const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTEwVDA0OjExOjAyLjM1NVoiLCJpYXQiOjE2NzYwMDIyNjIsImV4cCI6MTc2MjQwMjI2Mn0.zUeN9rqRBt_xP-JKooxB1eaqF4sDAjIOF81aTw6ec5Q';

const loginResponse = {
    message: 'Đăng nhập thành công',
    data: {
        access_token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTExVDAzOjExOjU0LjA5MloiLCJpYXQiOjE2NzYwODUxMTQsImV4cCI6MTY3NzA4NTExM30.oxkOXCZX1WzICHG4FwxNFcKIvk9h1SIY3BWoeZZYX7c',
        expires: 999999,
        refresh_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTExVDAzOjExOjU0LjA5MloiLCJpYXQiOjE2NzYwODUxMTQsImV4cCI6MTc2MjQ4NTExNH0.jYSCoUKD1JtwywYeXr95B6LQNn2um81HwHrZ9dRp91Q',
        expires_refresh_token: 86400000,
        user: {
            _id: '63d4fc186d7c62034084fd2f',
            roles: ['User'],
            email: 'long123@gmail.com',
            createdAt: '2023-01-28T10:42:32.765Z',
            updatedAt: '2023-02-07T08:00:32.113Z',
            __v: 0,
            address: 'Long An, Viet Nam',
            date_of_birth: '2003-09-21T17:00:00.000Z',
            name: 'Trần Phước Long',
            phone: '0123456789',
            avatar: '6607b0bd-0aca-4b80-858f-5b4cbf06dbfa.jpg'
        }
    }
};

const refreshTokenResponse = {
    message: 'Refresh Token thành công',
    data: {
        access_token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTExVDA0OjAwOjM5LjY0M1oiLCJpYXQiOjE2NzYwODgwMzksImV4cCI6MTY3NjY5MjgzOX0.qieSoLnLS_WlMIOMbu83NmnpjUg0GQDT_BFtxtSK0cM'
    }
};

const loginRequest = rest.post(`${config.baseUrl}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginResponse));
});

const refreshToken = rest.post(`${config.baseUrl}refresh-access-token`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenResponse));
});

const authRequests = [loginRequest, refreshToken];

export default authRequests;
