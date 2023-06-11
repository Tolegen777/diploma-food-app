import CategoryCards from "./CategoryCards";
import {useQuery} from "react-query";
import {IOrderResponse} from "../../../types/orderTypes";
import {orderApi} from "../../../api/orderApi";
import {tokenService} from "../../../services/tokenService";

const OrdersComponent = () => {

    const token = tokenService.getLocalAccessToken()

    const {data: orderData} = useQuery<IOrderResponse>(
        ['order'],
        () => orderApi.getRestOrder(token)
    );

    return (
        <div className="w-full">
            <div style={{display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap"}}>
                {orderData && orderData.data && orderData?.data?.map(item => <CategoryCards item={item}/>)}
            </div>
        </div>
    );
};

export default OrdersComponent;
