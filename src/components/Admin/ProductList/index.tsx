import {IFoodItem} from "../../../../types";
import React from "react";
import {useStateValue} from "../../../context/StateProvider";
import {SingleFoodItemProduct} from "../../FoodItemProduct";

const ProductList = () => {

    const [{foodItems}] =
        useStateValue();

    return (
        <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
                {
                    foodItems?.map((item: IFoodItem) => (
                        <SingleFoodItemProduct key={item.id} item={item} col admin/>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductList;
