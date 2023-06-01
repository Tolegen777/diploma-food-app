import {MdOutlineDataSaverOn, MdOutlineFastfood,} from "react-icons/md";
import {motion} from "framer-motion";
import {toast} from "react-toastify";
import {useState} from "react";
import {Loader} from "../../Loader";
import {useMutation, useQueryClient} from "react-query";
import {productApi} from "../../../api/productApi";
import {UploadImageComponent} from "../../Common/UploadImageComponent/UploadImageComponent";
import {customNotification} from "../../../utils/customNotification";
import {tokenService} from "../../../services/tokenService";

const AddCategory = () => {
    const [title, setTitle] = useState("");

    const [fileList, setFileList] = useState([]);

    const formData = new FormData();

    const queryClient = useQueryClient();

    const token = tokenService.getLocalAccessToken()

    const {mutate: onAddCategoryToRest} = useMutation('categoryToRest', productApi.addCategoryToRest, {
        onSuccess: () => {
            queryClient.invalidateQueries('restaurantMy');
        },
        onError: () => {
            customNotification({type: "error", message: "Возникла ошибка при созданий!"})
        }
    })

    const {mutate: onCreateCategory, isLoading} = useMutation('categoryCreate', productApi.createCategory, {
        onSuccess: (data) => {
            customNotification({type: 'success', message: 'Операция успешно выполнено!'})
            clearForm()
            onAddCategoryToRest({id: data?.id, token: token})
        },
        onError: () => {
            customNotification({type: "error", message: "Возникла ощибка при созданий!"})
        }
    })

    const saveItem = () => {
        if (!title || fileList.length < 1) {
            toast.error("Пожалуйста, заполните все поля перед сохранением продукта 🤗");
            return;
        } else {
            formData.append('title', title)
            fileList.forEach((file: any) => {
                formData.append("icon", file.originFileObj);
            });

            // @ts-ignore
            onCreateCategory(formData)
        }

    };
    const clearForm = () => {
        setTitle("");
        setFileList([])
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
                            placeholder="Введите название категорий"
                            autoFocus
                            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>


                    <div
                        className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px]  md:h-[220px] round-lg">
                        <>
                            <UploadImageComponent setFileList={setFileList} fileList={fileList}/>
                        </>
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

export default AddCategory;
