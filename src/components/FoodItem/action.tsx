import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { addToCart, deleteFood } from "../../utils/functions";
import {MdAddShoppingCart, MdDeleteForever, MdShoppingBasket} from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { IFoodItem } from "../../../types";
import {useMutation, useQueryClient} from "react-query";
import {productApi} from "../../api/productApi";
import {customNotification} from "../../utils/customNotification";
import {cartApi} from "../../api/cartApi";
import {toast} from "react-toastify";
const Action = ({ food, admin }: { food: IFoodItem; admin?: boolean }) => {
  const [{ cartItems, foodItems, user }, dispatch] = useStateValue();

  const queryClient = useQueryClient();

  const {mutate: onCreateCart, error} = useMutation('cartCreate', cartApi.createCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
    onError: () => {
      customNotification({type: "error", message: "Возникла ощибка при добавлений в корзину!"})
    }
  })

  const handleClick = () => {
    if (!user) {
      toast.error("Нужна авторизация для добавления в корзину", {
        icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
        toastId: "unauthorizedAddToCart",
      });
    } else {
      onCreateCart({productId: food?.id, qty: 1})
    }


  }

  return (
      <div className="flex flex-col gap-2">
        <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
            onClick={handleClick}
            title="Добавить в корзину"
        >
          <MdAddShoppingCart className="text-white md:text-xl" />
        </motion.div>
      </div>
  );
};

export default Action;
