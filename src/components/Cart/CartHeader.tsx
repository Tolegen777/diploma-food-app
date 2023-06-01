import {MdLogin, MdOutlineKeyboardBackspace, MdShoppingBasket} from "react-icons/md";
import {motion} from "framer-motion";
import {useStateValue} from "../../context/StateProvider";
import {hideCart} from "../../utils/functions";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {userService} from "../../services/userService";

const CartHeader = () => {

    const { t } = useTranslation();

    const [dispatch] = useStateValue();

    const user = userService.getLocalUserEmail()

    return (
        <div className="w-full flex items-center bg-white justify-between px-4 py-2 cursor-pointer">
            <motion.div whileTap={{scale: 0.8}} onClick={() => hideCart(dispatch)}>
                <MdOutlineKeyboardBackspace className="text-textColor text-2xl "/>
            </motion.div>

            <div className="flex items-center justify-center gap-2">
                {t("columns.card")}
                <MdShoppingBasket className="text-xl cursor-pointer text-cartNumBg"/>
            </div>

            {user?.length ? (
                <motion.p
                    whileTap={{scale: 0.9}}
                    whileHover={{scale: 0.9}}
                    className="flex items-center justify-center gap-2 p-1 px-2 my-2 bg-cardOverlay rounded-md hover:shadow-sm text-textColor text-base"
                >
                </motion.p>
            ) : (
                <Link to={`/login`} onClick={() => hideCart(dispatch)}>
                    <motion.p
                        whileTap={{scale: 0.9}}
                        whileHover={{scale: 0.9}}
                        className="flex items-center justify-center gap-2 p-1 px-2 my-2 bg-cardOverlay rounded-md hover:shadow-sm text-textColor text-base"
                    >
                        {t("columns.login")}<MdLogin className="text-cartNumBg"/>
                    </motion.p>
                </Link>
            )}
        </div>
    );
};

export default CartHeader;
