import {MdOutlineKeyboardBackspace, MdOutlineMessage} from "react-icons/md";

import {hideContactform} from "../../utils/functions";
import {motion} from "framer-motion";
import {useStateValue} from "../../context/StateProvider";
import {useTranslation} from "react-i18next";

const ContactHeader = () => {

    const { t } = useTranslation();

    const [dispatch] = useStateValue();
    return (
        <div className="w-full flex flex-row-reverse items-center bg-white justify-between px-4 py-2">
            <motion.div
                whileTap={{scale: 0.8}}
                onClick={() => hideContactform(dispatch)}
            >
                <MdOutlineKeyboardBackspace className="text-textColor text-2xl cursor-pointer"/>
            </motion.div>

            <motion.div
                className="flex items-center justify-center gap-x-2 px-2"
            >
                <MdOutlineMessage className="text-xl text-orange-600"/>
                <span>{t("columns.contacts")}</span>
            </motion.div>
        </div>
    );
};

export default ContactHeader;
