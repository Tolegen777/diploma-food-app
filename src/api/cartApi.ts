import type { ILoginInput } from '../types/authTypes';
import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";
import {ICategoriesResponse, IProductCreateBody, IProductsFilterParams} from "../types/productTypes";
import {getSendingParams} from "../utils/getSendingParams";
import {ICartBody} from "../types/cartTypes";

export const cartApi = {
  getCart: async () => {
    const token = tokenService.getLocalAccessToken()
    const response = await axios.get(BASE_URL + 'cart', {headers: {
        Authorization: `Bearer ${token}`
      }});
    return response.data
  },

  createCart: async (body: ICartBody) => {
    const token = tokenService.getLocalAccessToken()
    const response = await axios.post(BASE_URL + 'cart', body, {headers: {
        Authorization: `Bearer ${token}`
      }});
    return response.data
  },

  deleteCart: async (id: number | string) => {
    const token = tokenService.getLocalAccessToken()
    const response = await axios.delete(BASE_URL + 'cart/' + id, {headers: {
        Authorization: `Bearer ${token}`
      }}, );
    return response.data
  },

  plusCart: async (id: number) => {
    const token = tokenService.getLocalAccessToken()
    const response = await axios.put(BASE_URL + 'cart/plus/' + id, null, {headers: {
        Authorization: `Bearer ${token}`
      }});
    return response.data
  },
  minusCart: async (id: number) => {
    const token = tokenService.getLocalAccessToken()
    const response = await axios.put(BASE_URL + 'cart/mince/' + id, null, {headers: {
        Authorization: `Bearer ${token}`
      }});
    return response.data
  },
};
