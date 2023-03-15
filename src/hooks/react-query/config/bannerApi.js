import MainApi from '../../../api/MainApi'

export const BannerApi = {
    bannerList: () => MainApi.get('/api/v1/banners'),
}
