import {MdOutlineKeyboardBackspace} from "react-icons/md";
import {motion} from "framer-motion";
import {RiSecurePaymentLine} from "react-icons/ri";
import {BsShieldLock} from "react-icons/bs";
import {useTranslation} from "react-i18next";

const Header = ({action}: { action: any }) => {

    const { t } = useTranslation();

    return (
        <div className="w-full flex items-center bg-white justify-between p-4 cursor-pointer">
            <motion.div whileTap={{scale: 0.8}} onClick={() => action(false)}>
                <MdOutlineKeyboardBackspace className="text-textColor text-2xl "/>
            </motion.div>
            <motion.div
                initial={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: 200}}
            >
                <p>{t("columns.securePayment")}</p>
            </motion.div>
            <motion.div
                whileTap={{scale: 0.9}}
                className="flex items-center justify-center gap-1"
                title={t("columns.secured") ?? ''}
            >
                <BsShieldLock className="text-xl cursor-pointer text-cartNumBg"/>
                <RiSecurePaymentLine className="text-xl cursor-pointer text-cartNumBg"/>
            </motion.div>
        </div>
    );
};

export default Header;
