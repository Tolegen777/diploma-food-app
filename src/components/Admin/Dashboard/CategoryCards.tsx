import {IOrderData} from "../../../types/orderTypes";
import {motion} from "framer-motion";
import {BASE_URL} from "../../../api";
import ActionOrder from "./action";

const CategoryCards = ({item}: { item: IOrderData }) => {

    return (
        <div className="bg-gray-300 min-h-[9rem] p-10 rounded-lg">
            <div className="w-full flex items-center justify-between">
                <motion.img
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 1.1}}
                    // className="w-40 h-40 md:w-48 md:h-40 -mt-8 object-contain cursor-pointer"
                    style={{
                        width: "150px",
                        height: "100px",
                        cursor: "pointer",
                        border: "3px solid #FA8028",
                        borderRadius: "20px"
                    }}
                    alt={item.items[0]?.product.description}
                    src={BASE_URL + item.items[0]?.product.image}
                />
                <ActionOrder id={item.id}/>
            </div>
            <div className="w-full flex items-end justify-end flex-col">
                <p className="text-textColor font-semi-bold text-lg">{item.status === 'CREATED' ? 'Новый заказ' : 'В обработке'}</p>
                <p className="mt-1 text-sm text-gray-500">{item.items[0]?.product.title} </p>
                <div className="flex items-center justify-between gap-8 ">
                    <p className="text-base text-headingColor font-semibold">
                        {item.totalPrice} <span className="text-sm text-red-600">тг</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CategoryCards