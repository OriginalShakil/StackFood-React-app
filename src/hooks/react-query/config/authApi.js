import MainApi from '../../../api/MainApi'
export const AuthApi = {
    signUp: (formData) => {
        return MainApi.post('/api/v1/auth/sign-up', formData)
    },
    signIn: (formData) => {
        return MainApi.post('/api/v1/auth/login', formData)
    },
}
