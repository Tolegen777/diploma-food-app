import {motion} from "framer-motion";
import Button from "./Button";
import {useQuery} from "react-query";
import {ICategoriesResponse} from "../../types/productTypes";
import {productApi} from "../../api/productApi";
import {useStateValue} from "../../context/StateProvider";
import {useTranslation} from "react-i18next";

const Filters = ({filter, setFilter}: { filter: string, setFilter: any }) => {

    const { t } = useTranslation();

    const [{restaurant_id}] = useStateValue()

    const {data: categoriesData} = useQuery<ICategoriesResponse[]>(
        ['categories'],
        () => productApi.getCategories(restaurant_id),
        {
            enabled: !!restaurant_id
        }
    );

    return (
        <motion.div
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 200}}
            className={`w-full py-10 flex items-center justify-start lg:justify-center  h-auto gap-4 md:gap-8  px-2  overflow-x-scroll scrollbar-hidden  scroll-smooth`}
        >
            <Button category={{id: 55555, title: t('columns.menu'), icon: ''}} filter={filter} setFilter={setFilter}/>
            {
                categoriesData?.map((category: ICategoriesResponse) => {
                    return <Button
                        key={category.id}
                        category={category}
                        filter={filter}
                        setFilter={setFilter}/>
                })
            }

        </motion.div>
    );
};

export default Filters;
