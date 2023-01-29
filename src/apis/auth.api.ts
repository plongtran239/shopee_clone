import { AuthResponse } from 'src/types/auth.type';
import http from 'src/utils/http';
import paths from 'src/constants/paths';

export const registerAccount = (body: { email: string; password: string }) =>
    http.post<AuthResponse>(paths.register, body);

export const login = (body: { email: string; password: string }) => http.post<AuthResponse>(paths.login, body);

export const logout = () => http.post(paths.logout);
