import axios, { AxiosError, type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import paths from 'src/constants/paths';
import { AuthResponse } from 'src/types/auth.type';
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth';

class Http {
    instance: AxiosInstance;
    private accessToken: string;

    constructor() {
        this.accessToken = getAccessTokenFromLS();

        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === paths.login || url === paths.register) {
                    const data = response.data as AuthResponse;
                    this.accessToken = (response.data as AuthResponse).data.access_token;
                    setAccessTokenToLS(this.accessToken);
                    setProfileToLS(data.data.user);
                } else if (url === paths.logout) {
                    this.accessToken = '';
                    clearLS();
                }
                return response;
            },
            function (error: AxiosError) {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message, {
                        position: 'top-right',
                        autoClose: 1500
                    });
                }
                if (error.response?.status === HttpStatusCode.Unauthorized) {
                    clearLS();
                }
                return Promise.reject(error);
            }
        );
    }
}

const http = new Http().instance;

export default http;
