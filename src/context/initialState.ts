import { fetchSessionUser, fetchSessionUserMode } from "../utils/fetchSessionData";
import {IFoodItem, IInitialStateType} from "../../types";
import foodImg from "../img/r3.png";

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
    role: ''
}