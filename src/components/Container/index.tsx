// FIXME first done

import {useLayoutEffect, useRef} from "react";

import {IFoodItem} from "../../../types";
import {SingleFoodItem} from "../FoodItem";
import {motion} from "framer-motion";
import NotFound from "../NotFound";
import {useStateValue} from "../../context/StateProvider";
import {Loader} from "../Loader";
import {Roles} from "../../const/roles";
import {useTranslation} from "react-i18next";

const   Container = ({scrollOffset, col, items, className}: {
    scrollOffset: number,
    col?: boolean;
    items: IFoodItem[],
    className?: string
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslation();

    useLayoutEffect(() => {
        if (null !== containerRef.current) {
            containerRef.current.scrollLeft += scrollOffset
        }
    }, [scrollOffset]);
    const [{role}] = useStateValue();
    return (
        <motion.div
            ref={containerRef}
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 200}}
            className={`${className} w-full my-12 flex items-center ${(!items || col) && "justify-center"}   min-h-[200px] gap-4  px-2 ${
                !col ? "overflow-x-scroll scrollbar-hidden scroll-smooth" : "overflow-x-hidden flex-wrap"
            }`}
        >
            {items.length > 0 && items?.map((item: IFoodItem) => (
                <SingleFoodItem key={item?.id} item={item} col={col} admin={role === Roles.restaurant}/>
            ))}
            {
                !items && (!col ? (<Loader/>) : (<NotFound text="Fetching Food Items..."/>))
            }
            {
                items && items.length <= 0 && (<NotFound text={t('columns.noData')}/>)
            }
        </motion.div>
    );
};

export default Container;
