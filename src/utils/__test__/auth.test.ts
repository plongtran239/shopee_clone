import { beforeEach, describe, expect, it } from 'vitest';

import {
    clearLS,
    getAccessTokenFromLS,
    getProfileFromLS,
    getRefreshTokenFromLS,
    setAccessTokenToLS,
    setProfileToLS,
    setRefreshTokenToLS
} from '../auth';

const access_token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTA5VDE0OjA5OjAyLjk3NloiLCJpYXQiOjE2NzU5NTE3NDIsImV4cCI6MTY3NjAzODE0Mn0.v3KD_y220Psp19DFVupxCKpJv8WcBzMyqFUw6PFBaco';

const refresh_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDRmYzE4NmQ3YzYyMDM0MDg0ZmQyZiIsImVtYWlsIjoibG9uZzEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTA5VDE0OjA5OjAyLjk3NloiLCJpYXQiOjE2NzU5NTE3NDIsImV4cCI6MTY4OTc3NTc0Mn0.GCl35I5uyQLL2RJcqpTMOn2qSmkanZjwJCkXZzONMTs';

const profile =
    '{"_id":"63d4fc186d7c62034084fd2f","roles":["User"],"email":"long123@gmail.com","createdAt":"2023-01-28T10:42:32.765Z","updatedAt":"2023-02-07T08:00:32.113Z","__v":0,"address":"Long An, Viet Nam","date_of_birth":"2003-09-21T17:00:00.000Z","name":"Trần Phước Long","phone":"0123456789","avatar":"6607b0bd-0aca-4b80-858f-5b4cbf06dbfa.jpg"}';

beforeEach(() => {
    localStorage.clear();
});

describe('setAccessTokenToLS and getAccessTokenFromLS', () => {
    it('set and get access_token from localStorage', () => {
        setAccessTokenToLS(access_token);
        expect(getAccessTokenFromLS()).toBe(access_token);
    });
});

describe('setRefreshTokenToLS and getRefreshTokenFromLS', () => {
    it('set and refresh_token from localStorage', () => {
        setRefreshTokenToLS(refresh_token);
        expect(getRefreshTokenFromLS()).toBe(refresh_token);
    });
});

describe('setProfileToLS and getProfileFromLS', () => {
    it('set and get profile from localStorage', () => {
        setProfileToLS(JSON.parse(profile));
        expect(getProfileFromLS()).toStrictEqual(JSON.parse(profile));
    });
});

describe('clearLS', () => {
    it('clear local storage', () => {
        setAccessTokenToLS(access_token);
        setRefreshTokenToLS(refresh_token);
        setProfileToLS(JSON.parse(profile));
        clearLS();
        expect(getAccessTokenFromLS()).toBe('');
        expect(getRefreshTokenFromLS()).toBe('');
        expect(getProfileFromLS()).toBe(null);
    });
});
