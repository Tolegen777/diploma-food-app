import { motion } from "framer-motion";
import Button from "./Button";

import { Categories } from "../../utils/categories";
import {  IFoodCategory } from "../../../types";
import { BiRestaurant } from "react-icons/bi";
import {useQuery} from "react-query";
import {IRestaurantMyResponse} from "../../types/restaurantTypes";
import {restaurantApi} from "../../api/restaurantApi";
import {tokenService} from "../services/tokenService";
import {ICategoriesResponse} from "../../types/productTypes";
import {productApi} from "../../api/productApi";

const Filters = ({filter, setFilter}: {filter:string, setFilter: any}) => {
// FIXME потом Алмас жасап быткен сон кайттан жасау керек категорияларды айди бойынша тартып!
    const { data: categoriesData } = useQuery<ICategoriesResponse[]>(
        ['categories'],
        () => productApi.getCategories(),
    );

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`w-full py-10 flex items-center justify-start lg:justify-center  h-auto gap-4 md:gap-8  px-2  overflow-x-scroll scrollbar-hidden  scroll-smooth`}
    >
      <Button category={{id: 55555, title: "Меню", icon: ''}} filter = {filter} setFilter = {setFilter} />
        {
          categoriesData?.map((category:  ICategoriesResponse) =>{
                return <Button
                    key = {category.id}
                    category = {category}
                    filter = {filter}
                    setFilter = {setFilter} />
            })
        }

    </motion.div>
  );
};

export default Filters;
