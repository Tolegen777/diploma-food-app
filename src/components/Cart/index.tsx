import CartBody from "./Body";
import CarttHeader from "./CartHeader";
import {motion} from "framer-motion";
import EmptyCart from "../EmptyCart";
import NotFound from "../NotFound";
import Checkout from "../Checkout";
import {useState} from "react";
import {useQuery} from "react-query";
import {ICartResponse} from "../../types/cartTypes";
import {cartApi} from "../../api/cartApi";
import {tokenService} from "../../services/tokenService";
import {userService} from "../../services/userService";
import {useTranslation} from "react-i18next";

const Cart = () => {

    const { t } = useTranslation();

    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const user = userService.getLocalUserEmail()

    const token = tokenService.getLocalAccessToken()

    const {data: cartData} = useQuery<ICartResponse[]>(
        ['cart'],
        () => cartApi.getCart(token), {
            enabled: user?.length > 0
        }
    );

    return (
        <>
            {checkoutOpen ? (
                <Checkout handler={setCheckoutOpen}/>
            ) : (
                <>
                    <motion.div
                        initial={{opacity: 0, x: 200}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 200}}
                        className={`w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0`}
                    >
                        <CarttHeader/>
                        {cartData && cartData.length > 0 ? (
                            <CartBody action={setCheckoutOpen}/>
                        ) : (
                            <div className="h-full w-full flex-1 flex items-center justify-center">
                                <EmptyCart/>
                            </div>
                        )}
                    </motion.div>
                    {!cartData && <NotFound text={t("columns.noData")}/>}
                </>
            )}
        </>
    );
};

export default Cart;
