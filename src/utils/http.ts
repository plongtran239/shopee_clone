import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type';
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api';
import {
    clearLS,
    getAccessTokenFromLS,
    getRefreshTokenFromLS,
    setAccessTokenToLS,
    setProfileToLS,
    setRefreshTokenToLS
} from './auth';
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils';
import { ErrorResponse } from 'src/types/utils.type';

class Http {
    instance: AxiosInstance;
    private accessToken: string;
    private refreshToken: string;
    private refreshTokenRequest: Promise<string> | null;

    constructor() {
        this.accessToken = getAccessTokenFromLS();
        this.refreshToken = getRefreshTokenFromLS();
        this.refreshTokenRequest = null;

        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 60 * 60 * 24, // 1 day
                'expire-refresh-token': 60 * 60 * 24 * 160 // 160 days
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

                if (url === URL_LOGIN || url === URL_REGISTER) {
                    const data = response.data as AuthResponse;
                    this.accessToken = data.data.access_token;
                    this.refreshToken = data.data.refresh_token;
                    setAccessTokenToLS(this.accessToken);
                    setRefreshTokenToLS(this.refreshToken);
                    setProfileToLS(data.data.user);
                } else if (url === URL_LOGOUT) {
                    this.accessToken = '';
                    this.refreshToken = '';
                    clearLS();
                }

                return response;
            },
            (error: AxiosError) => {
                if (
                    ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
                        error.response?.status as number
                    )
                ) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message, {
                        position: 'top-center',
                        autoClose: 1500
                    });
                }

                if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
                    const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig);
                    const { url } = config;

                    if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
                        // Hạn chế gọi 2 lần handleRefreshToken
                        this.refreshTokenRequest = this.refreshTokenRequest
                            ? this.refreshTokenRequest
                            : this.handleRefreshToken().finally(() => {
                                  setTimeout(() => {
                                      this.refreshTokenRequest = null;
                                  }, 10000);
                              });
                        return this.refreshTokenRequest.then((access_token) => {
                            return this.instance({
                                ...config,
                                headers: { ...config.headers, authorization: access_token }
                            });
                        });
                    }

                    clearLS();
                    this.accessToken = '';
                    this.refreshToken = '';
                    toast.error(error.response?.data.data?.message || error.response?.data.message, {
                        autoClose: 1500,
                        position: 'top-center'
                    });
                    // window.location.reload()
                }

                return Promise.reject(error);
            }
        );
    }

    private handleRefreshToken() {
        return this.instance
            .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
                refresh_token: this.refreshToken
            })
            .then((res) => {
                const { access_token } = res.data.data;
                setAccessTokenToLS(access_token);
                this.accessToken = access_token;
                return access_token;
            })
            .catch((error) => {
                clearLS();
                this.accessToken = '';
                this.refreshToken = '';
                throw error;
            });
    }
}

const http = new Http().instance;

export default http;
