import {useState} from "react";

import Container from "../../Container";
import Filters from "../../Filters";
import {Title} from "..";
import {useStateValue} from "../../../context/StateProvider";
import {useQuery} from "react-query";
import {IFoodItemContent} from "../../../../types";
import {productApi} from "../../../api/productApi";
import {useTranslation} from "react-i18next";
import {userService} from "../../../services/userService";

const Menu = ({title}: { title?: string }) => {

    const { t } = useTranslation();

    const [scrollValue, setScrollValue] = useState(0);

    const [filter, setFilter] = useState<string>("");

    const restaurant_id = userService.getRestId()

    const {data: productsData} = useQuery<IFoodItemContent>(
        ['products', restaurant_id, filter],
        () => productApi.getProducts({
            restaurantId: restaurant_id,
            categoryId: (filter && +filter !== 55555) ? +filter : undefined,
            page: 1,
            limit: 100
        }), {
            enabled: !!restaurant_id
        }
    );


    return (
        <section className="w-full my-5" id="menu">
            <div className="w-full flex items-center justify-center">
                <Title title={title || t('columns.ourDishes')} center/>
            </div>
            <Filters filter={filter} setFilter={setFilter}/>
            <Container
                className="bg-containerbg"
                col
                scrollOffset={scrollValue}
                items={productsData?.data ?? []}
            />
        </section>
    );
};

export default Menu;
