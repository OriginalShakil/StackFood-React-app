import MainApi from '../../../api/MainApi'

export const ProfileApi = {
    profileInfo: () => MainApi.get('/api/v1/customer/info'),
    profileUpdate: (profileData) =>
        MainApi.post('/api/v1/customer/update-profile', profileData),
}
