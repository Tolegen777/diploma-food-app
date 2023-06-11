import {IFoodItem} from "../../../types";
import {motion} from "framer-motion";
import Action from "./action";
import {BASE_URL} from "../../api";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import "./../InfoCard/infoCard.css"

export const SingleFoodItem = ({
                                   item,
                                   col,
                                   admin
                               }: {
    item: IFoodItem;
    col?: boolean;
    admin?: boolean
}) => {

    const { t } = useTranslation();

    const {title, price, calorie, image, description} = item;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        // Initial check
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <>
        <li className="cards_item">
            <div className="card">
                <div className="card_image">
                    <img src={BASE_URL + image }
                         alt="food"
                         onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                             const target = e.target as HTMLImageElement;
                             target.src = 'https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg';
                         }}
                    />
                    {isMobile && <span className="card_price"><Action food={item} admin={admin}/></span>}

                </div>
                <div className="card_content">
                    <h2 className="card_title">
                        {title}
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div className="card_price2">{price} <span className="text-sm text-red-600">{t("columns.tg")}</span></div>
                        </div>

                    </h2>
                    <div className="card_text">
                        <p>{calorie} {t("columns.calorie")}</p>
                        <hr/>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </li>
    </>

    // return (
    //     <motion.div
    //         whileTap={{rotate: [0, -1, 1, -1, 0]}}
    //         className={`${
    //             !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
    //         } md:w-[300px] md:min-w-[300px] ${
    //             col ? "my-4" : "my-2 md:my-5"
    //         } h-auto bg-cardOverlay rounded-lg p-2 px-3 backdrop-blur-lg hover:drop-shadow-sm cursor-pointer`}
    //     >
    //         <div className="w-full flex items-center justify-between ">
    //             <motion.img
    //                 whileHover={{scale: 1.2}}
    //                 whileTap={{scale: 1.1}}
    //                 alt={description}
    //                 src={BASE_URL + image}
    //                 style={{
    //                     width: "150px",
    //                     height: "100px",
    //                     cursor: "pointer",
    //                     border: "3px solid #FA8028",
    //                     borderRadius: "20px"
    //                 }}
    //             />
    //             <Action food={item} admin={admin}/>
    //         </div>
    //         <div className="w-full flex items-end justify-end flex-col">
    //             <p className="text-gray-900 font-semi-bold text-lg">{title}</p>
    //             <p className="mt-1 text-sm text-gray-700">{description} </p>
    //             <p className="mt-1 text-sm text-gray-700">{calorie} {t("columns.calorie")} </p>
    //             <div className="flex items-center justify-between gap-8 ">
    //                 <p className="text-base text-headingColor font-semibold">
    //                     {price} <span className="text-sm text-red-600">{t("columns.tg")}</span>
    //                 </p>
    //             </div>
    //         </div>
    //     </motion.div>
    // );
};
