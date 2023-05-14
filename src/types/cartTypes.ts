
export interface ICartBody {
    qty: number,
    productId: number
    token?: string
}

export interface ICartResponse {
    id: number
    qty: number
    totalPrice: number
    product: Product
}

export interface Product {
    id: number
    title: string
    description: string
    image: string
    calorie: number
    price: number
    restaurant: Restaurant
}

export interface Restaurant {
    id: number
    title: string
    uuid: string
}
