export type IFoodItemStatic = {
  id: number;
  title: string;
  desc: string;
  price: string;
  imgSrc: string;
}
export type IFoodItemsStatic = {
  items: IFoodItemStatic[];
}
export type IFoodItem = {
    id: number;
    title: string;
    description?: string;
    price: string;
    imageURL: string;
    calories: string;
    qty: string;
    category: string;
};

export type IFoodItems = {
  items: IFoodItem[];
}

export type IFoodCategory = {
  id: number;
  name: string;
  urlParam: string;
  icon?: JSX.Element
}

export type ICartItem = {
  id: number;
  fid: number;
  uid: string;
  qty: number;
}

export type ICartItems = {
  items: ICartItem[]
}

export type IUser = {
  uid: string;
  email?: string;
  displayName?:string;
  phoneNumber?: string;
  providerId: string;
  photoURL?: string;

}
export type FoodCategories = IFoodCategory[];

export type IInitialStateType = {
    user: string,
    foodItems: IFoodItem[] | null,
    showCart: boolean,
    showContactForm: boolean,
    cartItems: ICartItems | [],
    cartTotal: number,
    adminMode: string,
    users: IUser[],
    paymentMethod: string,
    checkoutData: object,
}