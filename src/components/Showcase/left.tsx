// FIXME first done
import React from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Left = () => {

    const navigate = useNavigate()

    const { t } = useTranslation();

    return (
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-3">
            <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                {/* <p className="text-base text-orange-500 font-bold">Bike Delivery</p> */}
                {/* <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
          <img
            src={BikeDelivery}
            alt="delivery"
            className="w-full h-full object-contain"
          />
        </div> */}
            </div>
            <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor" style={{color: '#fff'}}>
                {t("columns.restaurantPlatform")}
                <span className="text-orange-600 text-[2.5rem] lg:text-[4.6rem]"></span>
            </p>
            <p className="text-base text-textColor text-center md:text-left md:w-[80%]" style={{color: '#fff'}}>
                {t("columns.mainDescription")}
            </p>
            <motion.button
                whileHover={{scale: 1.1}}
                className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                onClick={() => navigate('/menu')}
            >
                {t("columns.orderNow")}
            </motion.button>
        </div>
    );
};

export default Left;
