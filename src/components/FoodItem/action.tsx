import React from "react";
import {useStateValue} from "../../context/StateProvider";
import {motion} from "framer-motion";
import {MdAddShoppingCart, MdShoppingBasket} from "react-icons/md";
import {IFoodItem} from "../../../types";
import {useMutation, useQueryClient} from "react-query";
import {customNotification} from "../../utils/customNotification";
import {cartApi} from "../../api/cartApi";
import {toast} from "react-toastify";
import {Roles} from "../../const/roles";
import {tokenService} from "../../services/tokenService";
import {useTranslation} from "react-i18next";
import {userService} from "../../services/userService";

const Action = ({food}: { food: IFoodItem; admin?: boolean }) => {
    const [{role}] = useStateValue();

    const { t } = useTranslation();

    const token = tokenService.getLocalAccessToken()

    const user = userService.getLocalUserEmail()

    const queryClient = useQueryClient();

    const {mutate: onCreateCart, error} = useMutation('cartCreate', cartApi.createCart, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart');
            customNotification({type: "success", message: "Еда была успешно добавлена в корзину!"})
        },
        onError: () => {
            customNotification({type: "error", message: "Возникла ощибка при добавлений в корзину!"})
        }
    })

    const handleClick = () => {
        if (!user) {
            toast.error("Нужна авторизация для добавления в корзину", {
                icon: <MdShoppingBasket className="text-2xl text-cartNumBg"/>,
                toastId: "unauthorizedAddToCart",
            });
        } else {
            if (role !== Roles.restaurant)
                onCreateCart({productId: food?.id, qty: 1, token: token})
        }


    }

    return (
        <div className="flex flex-col gap-2">
            <motion.div
                whileTap={{scale: 1.1}}
                whileHover={{scale: 1.2}}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
                onClick={handleClick}
                title={t("columns.addToCard") ?? ''}
            >
                <MdAddShoppingCart className="text-white md:text-xl"/>
            </motion.div>
        </div>
    );
};

export default Action;
