// FIXME first done
import {motion} from 'framer-motion'
import {useTranslation} from "react-i18next";

const CartTotal = ({checkoutState, cartTotal}: { checkoutState: any, cartTotal: string | number }) => {

    const { t } = useTranslation();

    return (
        <div
            className='w-full mt-2 md:mt-0 flex-1 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly'>
            <div className="w-full border-b border-gray-600 my-"></div>
            <div className="w-full flex items-center justify-between">
                <p className="text-gray-50 text-base md:text-lg uppercase">{t("columns.total")}</p>
                <p className="text-gray-50 text-base md:text-lg">-</p>
                <p className="text-gray-50 text-base md:text-lg ">{cartTotal} <span
                    className="text-sm text-red-600">тг</span></p>
            </div>
            <motion.button onClick={() => checkoutState(true)} whileTap={{scale: 0.8}}
                           className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'>
                {cartTotal} тг
            </motion.button>

        </div>
    )
}

export default CartTotal