import {ICartItem, IFoodItem} from "../../types";
import {toast} from "react-toastify";

export const getFoodyById = (menu: IFoodItem[], id: number) => {
    return menu.find((item: IFoodItem) => item.id === id);
};

export const updateCartItemQty = async (
    cartItems: ICartItem[],
    foodItems: IFoodItem[],
    item: ICartItem,
    dispatch: any,
    val: number
) => {
    const index = cartItems.findIndex(
        (cartItem: ICartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
        cartItems[index].qty += val;
        dispatch({
            type: "SET_CARTITEMS",
            cartItems: cartItems,
        });
        calculateCartTotal(cartItems, foodItems, dispatch);
    }
};

//  Delete Cart Item
export const deleteCartItem = async (
    cartItems: ICartItem[],
    foodItems: IFoodItem[],
    item: ICartItem,
    dispatch: any
) => {
    const index = cartItems.findIndex(
        (cartItem: ICartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
        cartItems.splice(index, 1);
        dispatch({
            type: "SET_CARTITEMS",
            cartItems: cartItems,
        });
        calculateCartTotal(cartItems, foodItems, dispatch);
    }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
    cartItems: ICartItem[],
    foodItems: IFoodItem[],
    dispatch: any
) => {
    let total = 0;
    cartItems.forEach((item: ICartItem) => {
        const foodItem = getFoodyById(foodItems, item.id);
        total += item.qty * parseFloat(foodItem?.price.toString() || "0");
    });
    dispatch({
        type: "SET_CART_TOTAL",
        cartTotal: total.toFixed(2),
    });
};

// Empty Cart
export const emptyCart = async (
    cartItems: ICartItem[],
    foodItems: IFoodItem[],
    dispatch: any
) => {
    if (cartItems.length > 0) {
        dispatch({
            type: "SET_CARTITEMS",
            cartItems: [],
        });
    } else {
        toast.warn("Карта уже пуста");
    }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
    dispatch({
        type: "TOGGLE_CART",
        showCart: !true,
    });
};

// Hide Cart
export const hideContactform = (dispatch: any) => {
    dispatch({
        type: "TOGGLE_CONTACT_FORM",
        showContactForm: !true,
    });
};

export const shuffleItems = (items: any) => {
    let currentIndex = items.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [items[currentIndex], items[randomIndex]] = [
            items[randomIndex],
            items[currentIndex],
        ];
    }

    return items;
};

export const logout = async (user: any, dispatch: any, navigate: any) => {
    if (user) {
        localStorage.setItem("adminMode", "undefined");
        navigate("/");
        window.location.reload()
    } else {
    }
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
    dispatch({
        type: "SET_ADMIN_MODE",
        adminMode: state,
    });
    localStorage.setItem("adminMode", JSON.stringify(state));
};




