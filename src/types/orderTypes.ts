export interface IOrderResponse {
  data: IOrderData[]
  count: number
}

export interface IOrderData {
  id: number
  totalPrice: number
  status: string
  items: Item[]
}

export interface Item {
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
}
