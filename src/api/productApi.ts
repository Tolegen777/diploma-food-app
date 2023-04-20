import type { ILoginInput } from '../types/authTypes';
import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";
import {ICategoriesResponse, IProductCreateBody, IProductsFilterParams} from "../types/productTypes";
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

  getCategories: async () => {
    const response = await axios.get(BASE_URL + 'category?');
    return response.data
  },

  createCategory: async (body: IProductCreateBody) => {
    const response = await axios.post(BASE_URL + 'category', body);
    return response.data
  },
};