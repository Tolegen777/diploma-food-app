// FIXME first done нужно написать логику для добавления елементтов в корзину
import React from "react";
import {motion} from "framer-motion";
import {IFoodItem} from "../../../types";
import {BASE_URL} from "../../api";

const StaticsImages: React.FC<{ items: IFoodItem[] }> = ({items}) => {

    return (
        <div
            className="w-full h-full absolute flex items-center justify-center top-6 left-0 lg:px-30 lg:py-4 gap-4 flex-wrap ">
            {items && items.map((item, index) => (
                <div
                    key={index}
                    className="cursor-pointer min-h-[140px] lg:min-h-[210px] min-w-[150px] lg:min-w-[200px] drop-shadow-lg p-2 bg-cardOverlay backdrop-blur-md rounded-xl flex flex-col items-center justify-center"
                >
                    <motion.img
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 1.1}}
                        src={BASE_URL + item.image}
                        alt="icecream"
                        // className="w-24 lg:w-40 -mt-10 lg:-mt-20"
                        style={{
                            width: "150px",
                            height: "100px",
                            cursor: "pointer",
                            border: "3px solid #FA8028",
                            borderRadius: "20px"
                        }}
                    />
                    <p className="text-base lg:text-lg font-semibold text-textColor">{item.title}</p>
                    <p className="text-[10px] lg:text-lg text-gray-600 font-semibold my-2 lg:my-3">
                        {item.description}
                    </p>
                    <p className="text-sm font-semibold text-headingColor">
                        <span className="text-xs text-red-600">₵</span> {item.price}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default StaticsImages;
