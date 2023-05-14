import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";

export const restaurantApi = {
    restaurantMy: async (token: string) => {
        const response = await axios.get(BASE_URL + 'restaurant/my', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },

    createRestaurant: async ({token, ...body}: { title: string, categoryId: number, token: string }) => {
        const response = await axios.post(BASE_URL + 'restaurant', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },

};
