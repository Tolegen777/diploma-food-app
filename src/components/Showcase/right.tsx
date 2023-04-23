// FIXME first done нужно написать логику для добавления елементтов в корзину
import React from 'react'
import { HeroBg } from '../Assets'
import StaticsImages from './Statics'
import {useQuery} from "react-query";
import {productApi} from "../../api/productApi";
import {IFoodItem, IFoodItemContent} from "../../../types";
import {useStateValue} from "../../context/StateProvider";
const Right = () => {

    const [{ restaurant_id }] = useStateValue();

    const { data: productsData } = useQuery<IFoodItemContent>(
        ['products'],
        () => productApi.getProducts({
                restaurantId: restaurant_id,
                page: 1,
                limit: 10
            }
        ),
        {
            enabled: restaurant_id.length > 0
        },
    );

    return (
        <div className="py-2 flex-1 flex items-center relative">
            <img src={HeroBg} alt="" className='ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto' />
            <StaticsImages items = {productsData?.data ?? []} />
        </div>
    )
}

export default Right