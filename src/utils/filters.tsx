import { IFoodItem } from "../../types"
import { useStateValue } from "../context/StateProvider"

export const FilterFood = (category:string) => {
    const [{foodItems}, dispatch] = useStateValue()
    return foodItems?.filter((item:IFoodItem) => item.category.toLowerCase() === category.toLowerCase())
}

export const GetFoodById = (id: number) => {
    const [{foodItems}, dispatch] = useStateValue()
    return foodItems?.find((item:IFoodItem) => item.id === id)
}