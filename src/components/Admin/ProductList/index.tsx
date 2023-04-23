import { FaSearch } from "react-icons/fa";
import { IFoodItem } from "../../../../types";
import { SingleFoodItem } from "../../FoodItem";
import React, { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import {useQuery} from "react-query";
import {IRestaurantMyResponse} from "../../../types/restaurantTypes";
import {restaurantApi} from "../../../api/restaurantApi";
import {tokenService} from "../../services/tokenService";
import {ICategoriesResponse} from "../../../types/productTypes";
import {SingleFoodItemCategory} from "../../FoodItemCategory";
import {SingleFoodItemProduct} from "../../FoodItemProduct";

const ProductList = () => {

    const [{ foodItems }] =
        useStateValue();

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {
            foodItems?.map((item: IFoodItem) => (
                <SingleFoodItemProduct key={item.id} item={item} col admin />
            ))
        }
      </div>
    </div>
  );
};

export default ProductList;
