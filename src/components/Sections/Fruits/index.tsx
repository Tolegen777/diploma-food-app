// FIXME first done

import {PrevNext as PrevNextButtons, Title} from ".."

import Container from "../../Container"
import {useEffect, useState} from "react"
import {useQuery} from "react-query";
import {IFoodItemContent} from "../../../../types";
import {productApi} from "../../../api/productApi";
import {ICategoriesResponse} from "../../../types/productTypes";
import {useStateValue} from "../../../context/StateProvider";
import {useTranslation} from "react-i18next";
import {userService} from "../../../services/userService";

const Fruits = () => {

    const { t } = useTranslation();

    const [scrollValue, setScrollValue] = useState(0)
    const [categoryId, setCategoryId] = useState(1)
    const [categoryTitle, setCategoryTitle] = useState(t('columns.freshFruits'))

    const restaurant_id = userService.getRestId()

    const {data: categoriesData} = useQuery<ICategoriesResponse[]>(
        ['categories'],
        () => productApi.getCategories(restaurant_id),
        {
            enabled: !!restaurant_id
        }
    );

    useEffect(() => {
        if (categoriesData && categoriesData.length > 0) {
            const category = categoriesData.find((item) => item.title.toLowerCase().includes('фрукт'))
            if (category?.id) {
                setCategoryId(category?.id)
            } else {
                setCategoryTitle(categoriesData[0]?.title ?? t('columns.freshFruits'))
            }
        }
    }, [categoriesData])

    const {data: productsFruitsData} = useQuery<IFoodItemContent>(
        ['products'],
        () => productApi.getProducts({
                categoryId: categoryId,
                restaurantId: restaurant_id,
                page: 1,
                limit: 10
            }
        ),
        {
            enabled: !!restaurant_id && !!categoriesData && categoriesData.length > 0
        },
    );


    return (
        <section className="w-full my-5">
            <div className="w-full flex items-center justify-between" style={{marginTop: "10px"}}>
                <Title title={categoryTitle ?? ''}/>
                <PrevNextButtons onNext={() => setScrollValue(10000)} onPrev={() => setScrollValue(-10000)}/>
            </div>
            <Container className="bg-containerbg" scrollOffset={scrollValue} items={productsFruitsData?.data ?? []}/>
        </section>
    )
}

export default Fruits