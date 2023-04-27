// FIXME first done
import {useStateValue} from "../../context/StateProvider";
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

const Cart = () => {
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const [{user}] = useStateValue();

    const {data: cartData} = useQuery<ICartResponse[]>(
        ['cart'],
        () => cartApi.getCart(), {
            enabled: !!user
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
                    {!cartData && <NotFound text={"Товаров нет в наличии"}/>}
                </>
            )}
        </>
    );
};

export default Cart;
