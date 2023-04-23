import {ICategoriesResponse} from "./productTypes";

export interface IRestaurantMyResponse {
  id: number,
  title: string,
  uuid: string,
  categories?: ICategoriesResponse[]
}

