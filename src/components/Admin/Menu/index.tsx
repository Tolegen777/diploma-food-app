import React from "react";
import {useQuery} from "react-query";
import {IRestaurantMyResponse} from "../../../types/restaurantTypes";
import {restaurantApi} from "../../../api/restaurantApi";
import {ICategoriesResponse} from "../../../types/productTypes";
import {SingleFoodItemCategory} from "../../FoodItemCategory";
import {useStateValue} from "../../../context/StateProvider";

const CategoryList = () => {

    const [{token}] = useStateValue();

    const {data: restaurantMyData} = useQuery<IRestaurantMyResponse>(
        ['restaurantMy'],
        () => restaurantApi.restaurantMy(token), {
            enabled: token.length > 0,
        }
    );

    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
                {
                    restaurantMyData?.categories?.map((item: ICategoriesResponse) => (
                        <SingleFoodItemCategory key={item.id} item={item} col admin/>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryList;
