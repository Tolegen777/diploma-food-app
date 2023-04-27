
export interface ICommentsParams {
  restaurantId: number | string,
  productId: number | string
}
export interface ICommentResponse {
  id: number,
  title: string,
  description: string,
  name: string,
  email: string,
  star: number
}

export interface ICommentBody {
  title: string,
  description: string,
  name: string,
  email: string,
  productId: number,
  restaurantId: number,
  star: number
}