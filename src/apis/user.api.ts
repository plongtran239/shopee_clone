import Omit from 'lodash/omit';

import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface BodyUpdateProfile extends Omit<User, '_id' | 'email' | 'roles' | 'createdAt' | 'updatedAt'> {
    password?: string;
    newPassword?: string;
}

const userApi = {
    getProfile() {
        return http.get<SuccessResponse<User>>('me');
    },
    updateProfile(body: BodyUpdateProfile) {
        return http.put<SuccessResponse<User>>('user', body);
    },
    uploadAvatar(body: FormData) {
        return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default userApi;
