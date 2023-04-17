import type { ILoginInput } from '../types/authTypes';
import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";
import {ICategoriesResponse, IProductsFilterParams} from "../types/productTypes";
import {getSendingParams} from "../utils/getSendingParams";

export const productApi = {
  getProducts: async (data: IProductsFilterParams) => {
    const filterParams = getSendingParams(data)
    const response = await axios.get(BASE_URL + 'products?' + filterParams);
    return response.data
  },

  getCategories: async () => {
    const response = await axios.get(BASE_URL + 'category?');
    return response.data
  },
};
