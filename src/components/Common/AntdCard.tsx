import React from 'react';
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import {BASE_URL} from "../../api";

type Props = {
    image: string
    price: number
    calorie: number
    description: string
    title: string
    actions: any[]
}
const AntdCard: React.FC<Partial<Props>> = ({image, title, description, calorie, price, actions}) => {
    return (
        <Card
            hoverable
            style={{width: 240, maxHeight: 300}}
            cover={<img alt="example" src={BASE_URL + image ?? ''} style={{width: "100%", maxHeight: "100px"}}/>}
            actions={actions ?? []}
        >
            <Meta title={title ?? ''} description={description}/>
            {calorie && <p className="mt-1 text-sm text-gray-500">{calorie} калорий </p>}
            {price && <p className="text-base text-headingColor font-semibold">
                <span className="text-sm text-red-600">{price} тг</span>
            </p>}
        </Card>
    );
};

export default AntdCard;