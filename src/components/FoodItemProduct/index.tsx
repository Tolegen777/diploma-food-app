import {IFoodItem} from "../../../types";
import {motion} from "framer-motion";
import {BASE_URL} from "../../api";
import {useTranslation} from "react-i18next";

export const SingleFoodItemProduct = ({
                                          item,
                                          col,
                                      }: {
    item: IFoodItem;
    col?: boolean;
}) => {

    const { t } = useTranslation();

    const {image, title, description, calorie, price} = item;

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
                    style={{
                        width: "150px",
                        height: "100px",
                        cursor: "pointer",
                        border: "3px solid #FA8028",
                        borderRadius: "20px"
                    }}
                    src={BASE_URL + image}
                />
            </div>
            <div className="w-full flex items-end justify-end flex-col">
                <p className="font-semi-bold text-lg text-gray-600">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{description} </p>
                <p className="mt-1 text-sm text-gray-500">{calorie} - {t("columns.calorie")} </p>
                <div className="flex items-center justify-between gap-8 ">
                    <p className="text-base text-headingColor font-semibold">
                        {price} <span className="text-sm text-red-600">{t("columns.tg")}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
