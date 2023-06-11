import {ICartItem, IFoodItem} from "../../types";

export const getFoodyById = (menu: IFoodItem[], id: number) => {
    return menu.find((item: IFoodItem) => item.id === id);
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


// Hide Cart
export const hideCart = (dispatch: any, showCard: boolean) => {
    dispatch({
        type: "TOGGLE_CART",
        showCart: !showCard,
    });
};

// Hide Cart


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
        localStorage.clear()
        window.location.replace('/');
};

export const ToggleAdminMode = (dispatch: any, state: string) => {
    localStorage.setItem("adminMode", state);
};




