import type { ILoginInput } from '../types/authTypes';
import axios from "axios";
import {BASE_URL} from "./index";

export const authApi = {
  signInUser: async (user: ILoginInput) => {
    const response = await axios.post(BASE_URL + 'auth/login', user);
    return response.data
  },
  signUpUser: async (user: ILoginInput) => {
    const response = await axios.post(BASE_URL + 'auth/registration', user);
    return response.data
  },
};
