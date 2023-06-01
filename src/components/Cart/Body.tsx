import CartItem from './Item'
import CartTotal from './CartTotal'
import {useQuery} from "react-query";
import {ICartResponse} from "../../types/cartTypes";
import {cartApi} from "../../api/cartApi";
import {tokenService} from "../../services/tokenService";
import {userService} from "../../services/userService";

const CartBody = ({action}: { action: any }) => {

    const user = userService.getLocalUserEmail()

    const token = tokenService.getLocalAccessToken()

    let totalSum = 0

    const {data: cartData} = useQuery<ICartResponse[]>(
        ['cart'],
        () => cartApi.getCart(token), {
            enabled: user.length > 0
        }
    );

    if (cartData) {
        totalSum = cartData?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.totalPrice;
        }, 0);
    }


    return (
        <div className='w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col'>
            <div className='w-full h-[340px] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hidden'>
                {
                    cartData && cartData.length > 0 && cartData.map((item, index: number) => {
                        return <CartItem key={index} item={item}/>
                    })
                }
            </div>
            <CartTotal checkoutState={action} cartTotal={totalSum}/>
        </div>
    )
}

export default CartBody