import { motion } from "framer-motion";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { logout, ToggleAdminMode } from "../../utils/functions";
import {Roles} from "../../const/roles";

const DropDown = ({ user }: { user: any;}) => {
  const navigate = useNavigate();
  const [{role}, dispatch]  = useStateValue();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="hidden group-hover:flex w-54  bg-gray-50 rounded-lg shadow-xl  flex-col absolute right-0 top-16"
    >
      <p className="px-10 py-2 flex items-center gap-3 bg-slate-100 transition-all duration-100 capitalize ease-in-out text-base text-headingColor">
        {user?.displayName || user?.email}
      </p>
      {role === Roles.restaurant && (
        <Link
        className="cursor-pointer px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor"
        to={"/admin"}
        onClick={() => ToggleAdminMode(dispatch, true)}
        >
          Админ
          <RiAdminLine />
        </Link>
      )}
      <Link to={'/profile'} className="px-10 py-2 flex items-center gap-3 bg-slate-100 transition-all duration-100 ease-in-out text-base text-headingColor">
        Профиль <FaUserCog />
      </Link>
      <p
        className="cursor-pointer px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor"
        onClick={() => logout(user, dispatch, navigate)}
      >
        Выйти
        <MdLogout />
      </p>
    </motion.div>
  );
};

export default DropDown;
