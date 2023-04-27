import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";
import {IProductCreateBody, IProductsFilterParams} from "../types/productTypes";
import {getSendingParams} from "../utils/getSendingParams";

export const productApi = {
    getProducts: async (data: IProductsFilterParams) => {
        const filterParams = getSendingParams(data)
        const response = await axios.get(BASE_URL + 'products?' + filterParams);
        return response.data
    },

    createProducts: async (body: IProductCreateBody) => {
        const response = await axios.post(BASE_URL + 'products', body);
        return response.data
    },

    getCategories: async (restId: number | string) => {
        const response = await axios.get(BASE_URL + `category?shopId=${restId}`);
        return response.data
    },

    createCategory: async (body: IProductCreateBody) => {
        const response = await axios.post(BASE_URL + 'category', body);
        return response.data
    },
    addCategoryToRest: async (id: number) => {
        const token = tokenService.getLocalAccessToken()
        const response = await axios.put(BASE_URL + 'restaurant/add-category/' + id, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },
    deleteCategoryToRest: async (id: number) => {
        const token = tokenService.getLocalAccessToken()
        const response = await axios.put(BASE_URL + 'restaurant/remove-category/' + id, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    },
};
