import {motion} from "framer-motion";
import {MdOutlineFastfood} from "react-icons/md";
import {ICategoriesResponse} from "../../types/productTypes";
import {BASE_URL} from "../../api";
import {BiRestaurant} from "react-icons/bi";

const Button = ({
                    category,
                    filter,
                    setFilter,
                }: {
    category: ICategoriesResponse;
    filter: string;
    setFilter: any;
}) => {

    return (
        <motion.div
            onClick={() => setFilter(category.id.toString())}
            whileTap={{scale: 1.1}}
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

                <span
                    className={`${
                        category.id.toString() === filter
                            ? "text-textColor group-hover:text-btnOverlay"
                            : "group-hover:text-textColor text-btnOverlay"
                    } text-lg`}
                    style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                >
          {category.icon !== '' ?
              <img style={{width: "30px", height: "30px", borderRadius: "200px"}} src={BASE_URL + category.icon}
                   alt=""/> || <MdOutlineFastfood/> :
              <BiRestaurant/>}
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
