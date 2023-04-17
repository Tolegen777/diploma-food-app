import type { ILoginInput } from '../types/authTypes';
import axios from "axios";
import {BASE_URL} from "./index";
import {tokenService} from "../components/services/tokenService";

export const restaurantApi = {
  restaurantMy: async () => {
    const token = tokenService.getLocalAccessToken()
    const response = await axios.get(BASE_URL + 'restaurant/my', {headers: {
        Authorization: `Bearer ${token}`
      }});
    return response.data
  },
};
