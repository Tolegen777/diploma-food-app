// export interface IProductResponse {
//   calorie: number
//   description: string
//   id: number
//   image: string
//   price: number
//   rating: string
//   title: string
// }

export interface IProductsFilterParams {
  title?: string,
  restaurantId?: string | number | null,
  categoryId?: number | null,
  page: number,
  limit: number | null
}

export interface ICategoriesResponse {
  id: number,
  title: string,
  icon: string
}

export interface IProductCreateBody {
  title: string
  description: string
  categoryId: number
  calorie: number
  restaurantId: number
  price: number
  image: string
}

export interface IProductCreateBody {
  title: string
  icon: string
}