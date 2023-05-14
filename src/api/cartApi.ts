import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";
import {ICartBody} from "../types/cartTypes";

export const cartApi = {
    getCart: async (token: string) => {
        const response = await axios.get(BASE_URL + 'cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },

    createCart: async ({token, ...body}: ICartBody) => {
        const response = await axios.post(BASE_URL + 'cart', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },

    deleteCart: async ({id, token}: {id: string | number, token: string}) => {
        const response = await axios.delete(BASE_URL + 'cart/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },);
        return response.data
    },

    plusCart: async ({id, token}: {id: string | number, token: string}) => {
        const response = await axios.put(BASE_URL + 'cart/plus/' + id, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },
    minusCart: async ({id, token}: {id: string | number, token: string}) => {
        const response = await axios.put(BASE_URL + 'cart/mince/' + id, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },
};
