import MainApi from '../../../api/MainApi'

export const CampaignApi = {
    campaign: () => MainApi.get('/api/v1/campaigns/item'),
}
