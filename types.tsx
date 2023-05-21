

export type IFoodItemStatic = {
  id: number;
  title: string;
  desc: string;
  price: string;
  imgSrc: string;
}
export type IFoodItemsStatic = {
  items: IFoodItem[];
}
export type IFoodItem = {
    qty?: string;
    calorie: number
    description?: string
    id: number
    image: string
    price: number
    rating: string
    title: string
};

export type IFoodItemContent = {
    data: IFoodItem[],
    count: number
}

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
    id: number
    image: string
    price: number
    title: string
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
    restaurant_id?: number | string
    role?: string
    token: string
    lng: string
}