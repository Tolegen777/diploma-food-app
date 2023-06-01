import {motion} from "framer-motion";
import ActionCategory from "./action";
import {ICategoriesResponse} from "../../types/productTypes";
import {BASE_URL} from "../../api";

export const SingleFoodItemCategory = ({
                                           item,
                                           col,
                                           admin
                                       }: {
    item: ICategoriesResponse;
    col?: boolean;
    admin?: boolean
}) => {
    const {title, icon} = item;

    return (
        <motion.div
            className={`${
                !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
            } md:w-[300px] md:min-w-[300px] ${
                col ? "my-12" : "my-2 md:my-5"
            } h-auto bg-cardOverlay rounded-lg p-2 px-3 backdrop-blur-lg hover:drop-shadow-sm bg-gray-200`}
        >
            <div className="w-full flex items-center justify-between">
                <motion.img
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 1.1}}
                    src={BASE_URL + icon}
                    style={{
                        width: "150px",
                        height: "100px",
                        cursor: "pointer",
                        border: "3px solid #FA8028",
                        borderRadius: "20px"
                    }}
                />
                <ActionCategory food={item} admin={admin}/>
            </div>
            <div className="w-full flex items-end justify-end flex-col">
                <p className="text-textColor font-semi-bold text-lg">{title}</p>
                <div className="flex items-center justify-between gap-8 ">
                    <p className="text-base text-headingColor font-semibold">
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
