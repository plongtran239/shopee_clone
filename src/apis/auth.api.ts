import { AuthResponse } from 'src/types/auth.type';
import http from 'src/utils/http';
import paths from 'src/constants/paths';

const authApi = {
    registerAccount(body: { email: string; password: string }) {
        return http.post<AuthResponse>(paths.register, body);
    },
    login(body: { email: string; password: string }) {
        return http.post<AuthResponse>(paths.login, body);
    },
    logout() {
        return http.post(paths.logout);
    }
};

export default authApi;
