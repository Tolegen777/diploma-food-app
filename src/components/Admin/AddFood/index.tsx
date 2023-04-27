import {BiCategory, BiFoodMenu} from "react-icons/bi";
import {MdOutlineDataSaverOn, MdOutlineFastfood, MdOutlineFoodBank,} from "react-icons/md";
import CategoriesSelector from "./CategoriesSelector";
import {GiTakeMyMoney} from "react-icons/gi";
import {motion} from "framer-motion";
import {toast} from "react-toastify";
import {useState} from "react";
import {useStateValue} from "../../../context/StateProvider";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {productApi} from "../../../api/productApi";
import {UploadImageComponent} from "../../Common/UploadImageComponent/UploadImageComponent";
import {customNotification} from "../../../utils/customNotification";
import {Loader} from "../../Loader";
import {IRestaurantMyResponse} from "../../../types/restaurantTypes";
import {restaurantApi} from "../../../api/restaurantApi";
import {tokenService} from "../../services/tokenService";

const AddFood = () => {
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");

    const [fileList, setFileList] = useState([]);

    const formData = new FormData();

    const queryClient = useQueryClient();

    const [{restaurant_id}] = useStateValue();

    const {data: restaurantMyData} = useQuery<IRestaurantMyResponse>(
        ['restaurantMy'],
        () => restaurantApi.restaurantMy(), {
            enabled: tokenService.getLocalAccessToken().length > 0,
        }
    );

    const {mutate: onCreateProduct, isLoading} = useMutation('productCreate', productApi.createProducts, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            customNotification({type: 'success', message: 'Операция успешно выполнено!'})
            clearForm()
        },
        onError: () => {
            customNotification({type: "error", message: "Возникла ощибка при созданий!"})
        }
    })

    const saveItem = () => {
        if (!title || !calories || !price || fileList.length < 1 || !categoryId) {
            toast.error("Пожалуйста, заполните все поля перед сохранением продукта 🤗");
            return;
        } else {
            formData.append('title', title)
            formData.append('description', description)
            formData.append('categoryId', String(+categoryId))
            formData.append('calorie', String(+calories))
            formData.append('restaurantId', String(restaurant_id))
            formData.append('price', String(+price))
            fileList.forEach((file: any) => {
                formData.append("image", file.originFileObj);
            });

            // @ts-ignore
            onCreateProduct(formData)
        }

    };
    const clearForm = () => {
        setTitle("");
        setCalories("");
        setPrice("");
        setCategoryId("");
        setDescription("");
        setFileList([])
    };

    const validateNumber = (value: any) => {
        if (isNaN(value)) {
            toast.error("Пожалуйста, введите корректное число", {toastId: 123});
            return "";
        }
        return value;
    };


    return (
        <>
            {isLoading && <Loader/>}
            <div className="w-full h-fullflex items-center justify-center">
                <div
                    className="border w-full  flex border-gray-300 items-center rounded-lg p-4 flex-col justify-center gap-4  ">
                    <div className="w-full py-3 border-b border-gray-300 flex -tems-center gap-2">
                        <MdOutlineFastfood className="text-xl text-gray-600"/>
                        <input
                            type="text"
                            required
                            placeholder="Введите название еды"
                            autoFocus
                            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center gap-3">
                        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                            <BiCategory className="text-xl text-gray-600"/>
                            <CategoriesSelector
                                categories={restaurantMyData?.categories ?? []}
                                action={setCategoryId}
                                selected={categoryId}
                            />
                        </div>
                    </div>
                    <div
                        className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px]  md:h-[220px] round-lg">
                        <>
                            <UploadImageComponent setFileList={setFileList} fileList={fileList}/>
                        </>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center gap-3">
                        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                            <MdOutlineFoodBank className="text-gray-600 text-2xl"/>
                            <input
                                type="number"
                                required
                                placeholder="Калории"
                                autoFocus
                                className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                            />
                        </div>
                        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                            <GiTakeMyMoney className="text-gray-600 text-2xl"/>
                            <input
                                type="number"
                                required
                                placeholder="Цена"
                                autoFocus
                                className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                                value={price}
                                onChange={(e) => setPrice(validateNumber(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="w-full py-3 border-b border-gray-300 flex -tems-center gap-2">
                        <BiFoodMenu className="text-xl text-gray-600"/>
                        <input
                            type="text"
                            required
                            placeholder="Описание"
                            autoFocus
                            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <motion.button
                            whileHover={{scale: 1.1}}
                            className="ml-0 flex justify-center items-center gap-2 flex-row-reverse md:ml-auto w-full md:w-auto border-none outline-none rounded bg-orange-500 px-12 py-2 text-lg text-white"
                            onClick={() => saveItem()}
                        >
                            <MdOutlineDataSaverOn/> Создать
                        </motion.button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AddFood;
