import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { describe, expect, it, beforeEach } from 'vitest';
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth';
import { Http } from '../http';

describe('http axios', () => {
    let http = new Http().instance;
    beforeEach(() => {
        localStorage.clear();
        http = new Http().instance;
    });
    const access_token_1s =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTEwVDAzOjMxOjE1LjU1OVoiLCJpYXQiOjE2NzU5OTk4NzUsImV4cCI6MTY3NTk5OTg3Nn0.eq36EZLDEVKio0oKbX_mHx8rHauCCezH4LY0cAVnLiw';
    const refresh_token_1000days =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTEwVDA0OjExOjAyLjM1NVoiLCJpYXQiOjE2NzYwMDIyNjIsImV4cCI6MTc2MjQwMjI2Mn0.zUeN9rqRBt_xP-JKooxB1eaqF4sDAjIOF81aTw6ec5Q';
    it('Call API', async () => {
        // Không nên đụng đến thư mục apis
        // Vì chúng ta test riêng file http thì chỉ "nên" dùng http thôi
        // vì lỡ như thư mục apis có thay đổi gì đó
        // thì cũng không ảnh hưởng gì đến file test này
        const res = await http.get('products');
        expect(res.status).toBe(HttpStatusCode.Ok);
    });

    it('Auth Request', async () => {
        // Nên có 1 cái account test
        // và 1 server test
        await http.post('login', {
            email: 'long123@gmail.com',
            password: '123123'
        });
        const res = await http.get('me');
        expect(res.status).toBe(HttpStatusCode.Ok);
    });

    it('Refresh Token', async () => {
        setAccessTokenToLS(access_token_1s);
        setRefreshTokenToLS(refresh_token_1000days);
        const httpNew = new Http().instance;
        const res = await httpNew.get('me');
        expect(res.status).toBe(HttpStatusCode.Ok);
    });
});
