// FIXME first done
import { IFoodItem } from "../../../types";
import { motion } from "framer-motion";
import Action from "./action";
import {ICategoriesResponse} from "../../types/productTypes";
import {BASE_URL} from "../../api";
import ActionCategory from "./action";
export const SingleFoodItemCategory = ({
  item,
  col,
  admin
}: {
  item:  ICategoriesResponse;
  col?: boolean;
  admin?:boolean
}) => {
  const { id, title, icon } = item;

  return (
    <motion.div
      // whileTap={{ rotate: [0, -1, 1, -1, 0] }}
      className={`${
        !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
      } md:w-[300px] md:min-w-[300px] ${
        col ? "my-12" : "my-2 md:my-5"
      } h-auto bg-cardOverlay rounded-lg p-2 px-3 backdrop-blur-lg hover:drop-shadow-sm bg-gray-200`}
    >
      <div className="w-full flex items-center justify-between">
        <motion.img
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="w-40 h-40 md:w-48 md:h-40 -mt-8 object-contain"
          src={BASE_URL+icon}
        />
      <ActionCategory food={item} admin={admin} />
      </div>
      <div className="w-full flex items-end justify-end flex-col">
        <p className="text-textColor font-semi-bold text-lg">{title}</p>
        {/*<p className="mt-1 text-sm text-gray-500">{description} </p>*/}
      {/*{admin && (<p className="mt-1 text-sm text-gray-500">{calorie} калорий </p>)}*/}
        <div className="flex items-center justify-between gap-8 ">
          <p className="text-base text-headingColor font-semibold">
            {/*<span className="text-sm text-red-600">₵</span> {price}*/}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
