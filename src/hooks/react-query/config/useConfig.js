import MainApi from '../../../api/MainApi'

export const ConfigApi = {
    config: () =>
        MainApi.get('/api/v1/config').catch((error) => console.log(error)),
}
