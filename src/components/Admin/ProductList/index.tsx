import {IFoodItem, IFoodItemContent} from "../../../../types";
import React from "react";
import {useStateValue} from "../../../context/StateProvider";
import {SingleFoodItemProduct} from "../../FoodItemProduct";
import {useQuery} from "react-query";
import {productApi} from "../../../api/productApi";
import {userService} from "../../../services/userService";

const ProductList = () => {

    const [{foodItems}] = useStateValue();

    const restaurant_id = userService.getRestId()

    const {data: productsData, error} = useQuery<IFoodItemContent>(
        ['productsrf', restaurant_id],
        () => productApi.getProducts({
            restaurantId: restaurant_id,
            page: 1,
            limit: 100
        }), {
            enabled: !!restaurant_id
        }
    );

    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
                {
                    productsData?.data?.map((item: IFoodItem) => (
                        <SingleFoodItemProduct key={item.id} item={item} col/>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductList;
