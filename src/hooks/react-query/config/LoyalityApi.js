import MainApi from '../../../api/MainApi'

export const LoyalityApi = {
    loayalityList: (offset) =>
        MainApi.get(
            `/api/v1/customer/loyalty-point/transactions?offset=${offset}&limit=10`
        ),
    loyalityToWallet: (loyalityData) =>
        MainApi.post('/api/v1/customer/loyalty-point/point-transfer', loyalityData),
}
