
import { useQuery } from "react-query";
import MainApi from "../../../api/MainApi";
import {onSingleErrorResponse} from "../../../components/ErrorResponse";


const getData = async (pageParams) => {
    const { tempDistance } = pageParams;

    const { data } = await MainApi.get(
        `/api/v1/vehicle/extra_charge?distance=${tempDistance}`
    );
    return data;
};

export default function useGetVehicleCharge(pageParams) {
    return useQuery("vehicle", () => getData(pageParams), {
        enabled: false,
        onError: onSingleErrorResponse,
    });
}