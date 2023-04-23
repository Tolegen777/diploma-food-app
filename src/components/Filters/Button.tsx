import { motion } from "framer-motion";
import { MdOutlineFastfood } from "react-icons/md";
import { IFoodCategory } from "../../../types";
import {ICategoriesResponse} from "../../types/productTypes";
import {BASE_URL} from "../../api";
import {BiRestaurant} from "react-icons/bi";
const Button = ({
  category,
  filter,
  setFilter,
}: {
  category:  ICategoriesResponse;
  filter: string;
  setFilter: any;
}) => {

  console.log(filter, 'FILTER')
  console.log(category, 'CATTTT')

  return (
    <motion.div
      onClick={() => setFilter(category.id.toString())}
      //   whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      className={`group ${
        category.id.toString() === filter
          ? "hover:bg-btnOverlay bg-cartNumBg"
          : "bg-btnOverlay hover:bg-cartNumBg"
      } w-24 min-w-[6rem] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all  ease-out`}
    >
      <div
        className={`w-10 h-10 rounded-full ${
          category.id.toString() === filter
            ? "group-hover:bg-cartNumBg bg-btnOverlay"
            : "bg-cartNumBg group-hover:bg-btnOverlay"
        }  flex items-center justify-center`}
      >
        {/* <MdOutlineFastfood

        /> */}
        <span
          className={`${
            category.id.toString() === filter
              ? "text-textColor group-hover:text-btnOverlay"
              : "group-hover:text-textColor text-btnOverlay"
          } text-lg`}
        >
          {category.icon !== '' ? <img src={BASE_URL + category.icon} alt=""/> || <MdOutlineFastfood /> :
              <BiRestaurant />}
        </span>
      </div>
      <p
        className={`text-base ${
          category.id.toString() === filter
            ? "group-hover:text-textColor text-white"
            : "text-textColor group-hover:text-white"
        } `}
      >
        {category.title}
      </p>
    </motion.div>
  );
};

export default Button;
