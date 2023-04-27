import axios from "axios";
import {BASE_URL} from "./index";
import {ICommentBody} from "../types/commentsTypes";

export const contactApi = {
    getContact: async (restaurantId: string) => {
        const response = await axios.get(BASE_URL + 'comments?restaurantId=' + restaurantId);
        return response.data
    },

    createContact: async (body: ICommentBody) => {
        const response = await axios.post(BASE_URL + 'comments', body,);
        return response.data
    },
};
