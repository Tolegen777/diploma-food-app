import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { addToCart, deleteFood } from "../../utils/functions";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { IFoodItem } from "../../../types";
import {ICategoriesResponse} from "../../types/productTypes";
import {useMutation, useQueryClient} from "react-query";
import {productApi} from "../../api/productApi";
import {customNotification} from "../../utils/customNotification";
const ActionCategory = ({ food, admin }: { food:  ICategoriesResponse; admin?: boolean }) => {

    const queryClient = useQueryClient();

    const {mutate: onDeleteCategoryToRest} = useMutation('deleteCategory', productApi.deleteCategoryToRest, {
        onSuccess: () => {
            queryClient.invalidateQueries('restaurantMy');
        },
        onError: () => {
            customNotification({type: "error", message: "Возникла ошибка при удалений!"})
        }
    })
  return (
    <div className="flex flex-col gap-2">
        <>
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
            onClick={() => onDeleteCategoryToRest(food?.id)}
            title="Delete"
          >
            <MdDeleteForever className="text-white md:text-xl" />
          </motion.div>
        </>
    </div>
  );
};

export default ActionCategory;
