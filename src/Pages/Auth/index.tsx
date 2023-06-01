import "react-toastify/dist/ReactToastify.css";
import {Cheff1} from "../../components/Assets";
import {motion} from "framer-motion";


export const ImageBox = () => {
    return (
        <div className="hidden md:w-8/12 lg:w-6/12 mb-12 md:mb-0 md:flex ">
            <motion.img
                whileHover={
                    {
                        rotate: [0, -10, 10, -10, 0],
                    }
                }
                src={Cheff1}
                className="w-96 cursor-pointer"
                alt="logo-login"
            />
        </div>
    );
};
