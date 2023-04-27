import CategoryCards from "./CategoryCards";
import {useQuery} from "react-query";
import {IOrderResponse} from "../../../types/orderTypes";
import {orderApi} from "../../../api/orderApi";

const OrdersComponent = () => {

    const {data: orderData} = useQuery<IOrderResponse>(
        ['order'],
        () => orderApi.getRestOrder()
    );

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-4 p-2">
                {orderData?.data?.map(item => <CategoryCards item={item}/>)}
            </div>
        </div>
    );
};

export default OrdersComponent;
