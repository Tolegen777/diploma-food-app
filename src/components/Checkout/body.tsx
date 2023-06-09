import {BiLock} from "react-icons/bi";
import CardForm from "./forms/Card";
import CheckoutFooter from "./footer";
import MomoForm from "./forms/Momo";
import {motion} from "framer-motion";
import {useStateValue} from "../../context/StateProvider";
import {useState} from "react";
import {ImSpinner3} from "react-icons/im";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {cartApi} from "../../api/cartApi";
import {customNotification} from "../../utils/customNotification";
import {ICartResponse} from "../../types/cartTypes";
import {orderApi} from "../../api/orderApi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {tokenService} from "../../services/tokenService";

const Body = ({action}: { action: any }) => {

    const { t } = useTranslation();

    const [{paymentMethod, user}] = useStateValue();

    const token = tokenService.getLocalAccessToken()

    const [number, setNumber] = useState('')

    const [place, setPlace] = useState('')

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const {data: cartData} = useQuery<ICartResponse[]>(
        ['cart'],
        () => cartApi.getCart(token), {
            enabled: !!user
        }
    );

    const {mutate: onCreateOrder, isLoading} = useMutation('cartCreate', orderApi.createOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart');
            navigate('/')
            customNotification({type: "success", message: "Ваш заказ будет готов в ближайшее время, ожидайте!"})
        },
        onError: () => {
            customNotification({type: "error", message: "Серверная ошибка!"})
        }
    })

    let totalSum = 0

    if (cartData) {
        totalSum = cartData?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.totalPrice;
        }, 0);
    }

    return (
        <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col">
            <div className="min-h-[50vh] mt-5">
                {paymentMethod === "mobile_money" ?
                    <MomoForm number={number} setNumber={setNumber}/> :
                    <CardForm number={number} setNumber={setNumber}/>}
                <div className="w-full p-1 px-2 rounded-lg flex flex-col">
                    <div className="w-full flex flex-col mb-2">
                        <input
                            type="text"
                            id="text"
                            className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
                            placeholder={t("columns.enterPlace") ?? ''}
                            autoComplete="off"
                            onChange={(e) => setPlace(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center justify-center my-2">
                    <p className="text-gray-300">
                        {t("columns.sum")}:{" "}
                        <span className="font-bold text-white">{`${totalSum} ${t("columns.tg")}`}</span>{" "}
                    </p>
                </div>
                {/* pay now button */}

                <div className="w-full flex items-center justify-center mt-4">
                    <motion.button
                        onClick={() => onCreateOrder({
                            token: token,
                            place: place
                        })}
                        whileTap={{scale: 0.95}}
                        className="flex items-center justify-center gap-2 w-[90%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-gray-50 text-lg my-2 hover:shadow-lg"
                    >
                        {!isLoading && <BiLock className=""/>}
                        {!isLoading ? (
                            t("columns.pay")
                        ) : (
                            <ImSpinner3 className="animate animate-spin"/>
                        )}
                    </motion.button>
                </div>
            </div>
            <CheckoutFooter/>
        </div>
    );
};

export default Body;
