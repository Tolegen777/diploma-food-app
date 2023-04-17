// FIXME first done

import { PrevNext as PrevNextButtons, Title } from ".."

import Container from "../../Container"
import {useEffect, useState} from "react"
import {useQuery} from "react-query";
import {IFoodItem} from "../../../../types";
import {productApi} from "../../../api/productApi";
import {ICategoriesResponse} from "../../../types/productTypes";

const Fruits = () => {
  const [scrollValue, setScrollValue] = useState(0)
  const [categoryId, setCategoryId] = useState(1)
  const [categoryTitle, setCategoryTitle] = useState('"Наши свежие и полезные фрукты"')

    const { data: categoriesData } = useQuery<ICategoriesResponse[]>(
        ['categoriesDataList'],
        () => productApi.getCategories(),
    );

  useEffect(() => {
     if (categoriesData && categoriesData.length > 0) {
         const category = categoriesData.find((item) => item.title.toLowerCase().includes('фрукт'))
         if (category?.id) {
             setCategoryId(category?.id)
         } else {
             setCategoryTitle(categoriesData[0]?.title ?? '')
         }
     }
  }, [categoriesData])

    const { data: productsFruitsData } = useQuery<IFoodItem[]>(
        ['productsDataList'],
        () => productApi.getProducts({
            categoryId: categoryId,
            page: 1,
            limit: 10
        }),
    );


  return (
    <section className="w-full my-5">
        <div className="w-full flex items-center justify-between" >
          <Title title={categoryTitle}/>
          <PrevNextButtons onNext={() => setScrollValue(10000)} onPrev = {() => setScrollValue(-10000)} />
        </div>
        <Container className="bg-containerbg" scrollOffset = {scrollValue} items = {productsFruitsData ?? []} />
    </section>
  )
}

export default Fruits