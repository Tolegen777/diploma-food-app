import {IOrderData} from "../../../types/orderTypes";
import {motion} from "framer-motion";
import {BASE_URL} from "../../../api";
import ActionOrder from "./action";
import React from "react";
import {useTranslation} from "react-i18next";
import "./../../InfoCard/infoCard.css"

const CategoryCards = ({item}: { item: IOrderData }) => {

    const { t } = useTranslation();

    return <>
        <li className="cards_item">
            <div className="card">
                <div className="card_image">
                    <img src={BASE_URL + item.items[0]?.product.image}
                         alt="food"
                         onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                             const target = e.target as HTMLImageElement;
                             target.src = 'https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg';
                         }}
                    />
                    <span className="card_price"><ActionOrder id={item.id}/></span>

                </div>
                <div className="card_content">
                    <h2 className="card_title">
                        {item.items[0]?.product.title}
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div className="card_price2">{item.totalPrice} <span className="text-sm text-red-600">{t("columns.tg")}</span></div>
                        </div>

                    </h2>
                    <div className="card_text">
                        <p>{item.status === 'CREATED' ? 'Новый заказ' : 'В обработке'}</p>
                        <hr/>
                        <p>{t('columns.placeNumber')}{item?.order?.place ?? ''}</p>
                    </div>
                </div>
            </div>
        </li>
    </>

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