import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";

export const orderApi = {
    getRestOrder: async () => {
        const token = tokenService.getLocalAccessToken()
        const response = await axios.get(BASE_URL + 'order/market/?status=CREATED&page=1&limit=100', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },

    createOrder: async () => {
        const token = tokenService.getLocalAccessToken()
        const response = await axios.post(BASE_URL + 'order', {
            apartment: "",
            building: "",
            address: "",
            phone: ""
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },

    changeOrder: async (id: number | string) => {
        const token = tokenService.getLocalAccessToken()
        const response = await axios.put(BASE_URL + 'order/market/item/' + id, {
            status: 'PAYMENT'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },
};
