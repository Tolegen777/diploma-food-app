import {fetchSessionUser, fetchSessionUserMode} from "../utils/fetchSessionData";
import {IInitialStateType} from "../../types";

const sessionUser = fetchSessionUser();
const sessionUserMode = fetchSessionUserMode();

export const initialState: IInitialStateType = {
    user: sessionUser,
    foodItems: [],
    showCart: false,
    showContactForm: false,
    cartItems: [],
    cartTotal: 0,
    adminMode: sessionUserMode,
    users: [],
    paymentMethod: 'mobile_money',
    checkoutData: {},
    restaurant_id: '',
    role: '',
    token: ''
}