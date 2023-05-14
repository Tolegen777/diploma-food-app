import React from "react";
import {motion} from "framer-motion";
import {MdAddTask} from "react-icons/md";
import {useMutation, useQueryClient} from "react-query";
import {orderApi} from "../../../api/orderApi";
import {customNotification} from "../../../utils/customNotification";
import {useStateValue} from "../../../context/StateProvider";

const ActionOrder = ({id}: { id: string | number }) => {

    const queryClient = useQueryClient();

    const [{token}] = useStateValue();

    const {mutate: onchangeOrder, error} = useMutation('orderChange', orderApi.changeOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('order');
        },
        onError: () => {
            customNotification({type: "error", message: "Ошибка сервера!"})
        }
    })

    return (
        <div className="flex flex-col gap-2">
            <motion.div
                whileTap={{scale: 1.1}}
                whileHover={{scale: 1.2}}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-600 flex items-center justify-center cursor-pointer"
                onClick={() => onchangeOrder({id: id, token: token})}
                title="Заказ готов"
            >
                <MdAddTask className="text-white md:text-xl"/>
            </motion.div>
        </div>
    );
};

export default ActionOrder;
