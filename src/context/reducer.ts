export const actionTypes = {
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    TOGGLE_CART: 'TOGGLE_CART',
    SET_CARTITEMS: 'SET_CARTITEMS',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    SET_ADMIN_MODE: 'SET_ADMIN_MODE',
    UPDATE_USER: 'UPDATE_USER',
    SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
    UPDATE_CHECKOUT_DATA: 'UPDATE_CHECKOUT_DATA',
    TOGGLE_CONTACT_FORM: 'TOGGLE_CONTACT_FORM',
    SET_RESTAURANT_ID: 'SET_RESTAURANT_ID',
    SET_ROLE: 'SET_ROLE',
    SET_LNG: 'SET_LNG'
}

const reducer = (state: any, action: any) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.SET_FOOD_ITEMS:
            return {
                ...state,
                foodItems: action.foodItems,
            };
        case actionTypes.TOGGLE_CART:
            return {
                ...state,
                showCart: action.showCart,
            };
        case actionTypes.SET_CARTITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            };
        case actionTypes.SET_CART_TOTAL:
            return {
                ...state,
                cartTotal: action.cartTotal,
            };
        case actionTypes.SET_ADMIN_MODE:
            return {
                ...state,
                adminMode: action.adminMode,
            };
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                user: action.user
            };
        case actionTypes.SET_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.paymentMethod
            };
        case actionTypes.UPDATE_CHECKOUT_DATA:
            return {
                ...state,
                checkoutData: action.checkoutData
            };
        case actionTypes.TOGGLE_CONTACT_FORM:
            return {
                ...state,
                showContactForm: action.showContactForm
            };
        case actionTypes.SET_RESTAURANT_ID:
            return {
                ...state,
                restaurant_id: action.restaurant_id
            };
        case actionTypes.SET_ROLE:
            return {
                ...state,
                role: action.role
            };
        case actionTypes.SET_LNG:
            return {
                ...state,
                lng: action.lng
            };
        default:
            return state;
    }
}

export default reducer;