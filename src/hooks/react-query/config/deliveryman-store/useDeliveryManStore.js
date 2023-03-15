import MainApi from "../../../../api/MainApi";
import { useMutation } from "react-query";

const storeDeliveryManData = async (deliveryManData) => {

    const {
        f_name,
        l_name,
        phone,
        email,
        image,
        identity_type,
        identity_number,
        identity_image,
        zoneId,
        earning,
        password

    } = deliveryManData;

   let tempEarning= earning==="freelancer"? 1:0
    let formData = new FormData();
    formData.append("f_name", f_name);
    formData.append("l_name", l_name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);

    formData.append("image", image);
    formData.append("identity_type", identity_type);
    formData.append("identity_number", identity_number);
    formData.append("zone_id",zoneId);
    formData.append("earning",tempEarning)

    identity_image.forEach((file) => {
        formData.append("identity_image[]", file);
    });

    const { data } = await MainApi.post("/api/v1/auth/delivery-man/store", formData);
    return data;
};
export const useDeliveryMan = () => {
    return useMutation("store_delivery_man", storeDeliveryManData);
};