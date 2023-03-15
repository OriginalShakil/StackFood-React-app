import MainApi from '../../../api/MainApi'

export const AddressApi = {
    addressList: () => MainApi.get('/api/v1/customer/address/list'),
    addNewAddress: (formData) => MainApi.post('/api/v1/customer/address/add', formData),
    deleteAddress: (addressId) =>
        MainApi.delete(`/api/v1/customer/address/delete?address_id=${addressId}`),
}
