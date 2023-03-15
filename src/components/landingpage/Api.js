import MainApi from '../../api/MainApi'

export const landingPageApi = {
    getLandingPageImages: () => MainApi.get('/api/v1/landing-page'),
}
