// FIXME first done
import {BiMinus, BiPlus} from "react-icons/bi";

import {MdDelete} from "react-icons/md";
import {motion} from "framer-motion";
import {ICartResponse} from "../../types/cartTypes";
import {BASE_URL} from "../../api";
import {useMutation, useQueryClient} from "react-query";
import {cartApi} from "../../api/cartApi";
import {customNotification} from "../../utils/customNotification";
import {tokenService} from "../../services/tokenService";

const CartItem = ({item}: { item: ICartResponse }) => {
    const {id, qty, product} = item;

    const token = tokenService.getLocalAccessToken()

    const queryClient = useQueryClient()

    const {mutate: onDeleteCart} = useMutation('deleteCreate', cartApi.deleteCart, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart');
        },
        onError: () => {
            customNotification({type: "error", message: "Возникла ощибка при удалений!"})
        }
    })

    const {mutate: onPlus,} = useMutation('deleteCreate', cartApi.plusCart, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart');
        },
        onError: () => {
            customNotification({type: "error", message: 'Оштбка сервера'})
        }
    })

    const {mutate: onMinus} = useMutation('deleteCreate', cartApi.minusCart, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart');
        },
        onError: () => {
            customNotification({type: "error", message: 'Оштбка сервера'})
        }
    })

    return (
        <div
            className="w-full p-1 px-2 rounded-lg bg-cartItem hover:shadow-md flex items-center justify-between gap-2 cursor-pointer ">
            <div className=" flex items-center  gap-2">
                <img
                    src={BASE_URL + product?.image}
                    alt=""
                    className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                />

                <div className="flex flex-col gap-0 ">
                    <p className="text-base text-gray-50">{product?.title}</p>
                    <p className="text-sm block text-gray-300 font-semibold">
                        <span className="text-xs text-red-600">₵</span> {product?.price}
                    </p>
                </div>
            </div>

            <div className="group flex items-center gap-2  cursor-pointer">
                <motion.div
                    className=""
                    whileTap={{scale: 0.75}}
                    onClick={() => onMinus({id: id, token: token})}
                >
                    <BiMinus className="text-gray-50"/>
                </motion.div>
                <p className="text-sm text-gray-50 w-5 h-5 rounded-sm bg-cartBg flex items-center justify-center cursor-default">
                    {qty}
                </p>
                <motion.div
                    className=""
                    whileTap={{scale: 0.75}}
                    onClick={() => onPlus({id: id, token: token})}
                >
                    <BiPlus className="text-gray-50"/>
                </motion.div>
            </div>

            <motion.div
                whileTap={{scale: 0.75}}
                className="text-sm text-gray-50 w-6 h-6 rounded-lg bg-cartNumBg flex items-center justify-center"
                onClick={() => onDeleteCart({id: id, token: token})}
            >
                <MdDelete/>
            </motion.div>
        </div>
    );
};

export default CartItem;
