import { IFoodItem, ICartItem } from "../../types";
import {
  firebaseFetchFoodItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";

export const addToCart = async (
  cartItems: ICartItem[],
  foodItems: IFoodItem[],
  user: any,
  id: number,
  price: number,
  title: string,
  image: string,
  dispatch: any
) => {
  if (!user) {
    toast.error("Нужна авторизация для добавления в корзину", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "unauthorizedAddToCart",
    });
  } else {
    if (cartItems.some((item: ICartItem) => item["id"] === id)) {
      toast.error("Товар уже в корзине!", {
        icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
        toastId: "itemAlreadyInCart",
      });
    } else {
      const data: ICartItem = {
        id: id,
        qty: 1,
        price: price,
        title: title,
        image: image
      };
      dispatch({
        type: "SET_CARTITEMS",
        cartItems: [...cartItems, data],
      });
      calculateCartTotal(cartItems, foodItems, dispatch);
      // await firebaseAddToCart(data);
    }
  }
};

export const fetchFoodData = async (dispatch: any) => {
  await firebaseFetchFoodItems()
    .then((data) => {
      dispatch({
        type: "SET_FOOD_ITEMS",
        foodItems: data,
      });
    })
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};

export const getFoodyById = (menu: IFoodItem[], id: number) => {
  return menu.find((item: IFoodItem) => item.id === id);
};

//  Update cart item State
export const updateCartItemState = async (
  cartItems: ICartItem[],
  item: ICartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: ICartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index] = item;
  }
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });
  await firebaseUpdateCartItem(item)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};

// Update Cart Item Quantity
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
    await firebaseUpdateCartItem(cartItems[index])
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
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
    // await firebaseDeleteCartItem(item)
    //   .then(() => {})
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
    // calculateCartTotal(cartItems, foodItems, dispatch);
    // await firebaseEmptyUserCart(cartItems)
    //   .then(() => {})
    //   .catch((e) => {
    //     console.log(e);
    //   });
  } else {
    toast.warn("Cart is already empty");
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
    // await firebaseLogout()
    //   .then(() => {
    //     dispatch({
    //       type: "SET_USER",
    //       user: null,
    //     });
    //     dispatch({
    //       type: "SET_CARTITEMS",
    //       cartItems: [],
    //     });
    //     // turn off adminMode
    //     dispatch({
    //       type: "SET_ADMIN_MODE",
    //       adminMode: false,
    //     });
    //
    //     localStorage.setItem("user", "undefined");
    //     localStorage.setItem("adminMode", "undefined");
    //     localStorage.removeItem("cartItems");
    //     navigate("/");
    //   })
    //   .catch((e: any) => {
    //     console.log(e);
    //   });
//FIXME
    localStorage.setItem("user", "undefined");
    localStorage.setItem("adminMode", "undefined");
    localStorage.removeItem("cartItems");
    navigate("/");
    window.location.reload()
  } else {
    console.log("You are not logged in");
  }
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  let isAdmin =user?.email == "admin@test.com" || user?.email == "admin@gmail.com"
  return isAdmin
};

// get user
export const getUserData = async (user: any) => {
  return await firebaseGetUser(user.uid);
};

// update currentUser
export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await firebaseUpdateUser(user)
    .then(() => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
      alert && toast.success("User data updated successfully");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      dispatch({
        type: "SET_USERS",
        users: users,
      });
    })
    .catch((e: any) => {
      console.log(e);
    }); 
}
export const getAllUser = async() => {
   await firebaseGetAllUsers().then((users: any) => {
    return users
   }).catch((e:any) => {
    console.log(e)
   })
}
// delete food
export const deleteFood = async (
  food: IFoodItem,
  foodItems: IFoodItem[],
  dispatch: any
) => {
  // await firebaseDeleteFood(food.id);
  // remove food from foodItems
  const foodIndex = foodItems.indexOf(food);
  if(foodIndex !== -1)
  {
    foodItems.splice(foodIndex, 1)
  }
  dispatch ({
    type: "SET_FOOD_ITEMS",
    foodItems
  })
  toast.success("Food deleted successfully");
};

