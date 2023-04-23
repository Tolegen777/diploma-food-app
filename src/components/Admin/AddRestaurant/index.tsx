import {MdOutlineDataSaverOn, MdOutlineFastfood,} from "react-icons/md";
import {motion} from "framer-motion";
import {toast} from "react-toastify";
import {useState} from "react";
import {useStateValue} from "../../../context/StateProvider";
import {Loader} from "../../Loader";
import {useMutation, useQueryClient} from "react-query";
import {productApi} from "../../../api/productApi";
import {UploadImageComponent} from "../../Common/UploadImageComponent/UploadImageComponent";
import {customNotification} from "../../../utils/customNotification";
import {restaurantApi} from "../../../api/restaurantApi";

const AddRestaurant = () => {
    const [title, setTitle] = useState("");

    const formData = new FormData();





    const saveItem = () => {
        if (!title) {
            toast.error("Пожалуйста, заполните все поля перед сохранением продукта 🤗");
            return;
        } else {
            formData.append('title', title)

            // @ts-ignore
            onCreateRestaurant(formData)
        }

    };
    const clearForm = () => {
        setTitle("");
    };

    return (
        <>
            {/*{isLoading && <Loader/>}*/}
            <div className="w-full h-fullflex items-center justify-center">
                <div
                    className="border w-full  flex border-gray-300 items-center rounded-lg p-4 flex-col justify-center gap-4  ">
                    <div className="w-full py-3 border-b border-gray-300 flex -tems-center gap-2">
                        <MdOutlineFastfood className="text-xl text-gray-600"/>
                        <input
                            type="text"
                            required
                            placeholder="Введите название ресторана"
                            autoFocus
                            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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

export default AddRestaurant;
