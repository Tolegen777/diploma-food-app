import { AiFillDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import {
  MdAddModerator,
  MdOutlineFavoriteBorder, MdOutlineMessage,
  MdRestaurantMenu,
} from "react-icons/md";
import { motion } from "framer-motion";
import { FaCogs } from "react-icons/fa";
import AddFood from "./AddFood";
import OrdersComponent from "./Dashboard";
import Users from "./Users";
import CategoryList from "./Menu";
import { useStateValue } from "../../context/StateProvider";
import AddCategory from "./AddCategory";
import React from "react";
import ProductList from "./ProductList";
import {QrcodeOutlined} from '@ant-design/icons'
import QrComponent from "./QrComponent";
import MessageList from "./MessageList";

const SidenavMenu = ({
  activePage,
  setActivePage,
  setPageContent,
}: {
  activePage: string;
  setActivePage: any;
  setPageContent: any;
}) => (
  <motion.nav
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    className="space-y-2 w-full "
  >
    <NavItem
      activePage={activePage}
      svgIcon={<MdOutlineFavoriteBorder />}
      title="Заказы"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<OrdersComponent />}
    />
    <NavItem
        activePage={activePage}
        svgIcon={<MdAddModerator />}
        title="Добавить категорию"
        setActivePage={setActivePage}
        setPageContent={setPageContent}
        pageContent={<AddCategory />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdAddModerator />}
      title="Добавить подукт"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<AddFood />}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdRestaurantMenu />}
      title="Список категорий"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<CategoryList />}
    />
    <NavItem
        activePage={activePage}
        svgIcon={<MdRestaurantMenu />}
        title="Список продуктов"
        setActivePage={setActivePage}
        setPageContent={setPageContent}
        pageContent={<ProductList />}
    />
    <NavItem
        activePage={activePage}
        svgIcon={<MdOutlineMessage />}
        title="Сообщения"
        setActivePage={setActivePage}
        setPageContent={setPageContent}
        pageContent={<MessageList />}
    />
    <NavItem
        activePage={activePage}
        svgIcon={<QrcodeOutlined />}
        title="QR"
        setActivePage={setActivePage}
        setPageContent={setPageContent}
        pageContent={<QrComponent />}
    />
  </motion.nav>
);

const NavItem = ({
  activePage,
  svgIcon,
  title,
  setActivePage,
  setPageContent,
  pageContent,
}: {
  activePage: string;
  setActivePage: any;
  svgIcon: any;
  title: string;
  setPageContent: any;
  pageContent: JSX.Element;
}) => {
  const handleClick = () => {
    setActivePage(title);
    setPageContent(pageContent);
  };
  const [{users, foodItems}, dispatch] = useStateValue()
  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
      className={`flex items-center no-underline text-orange-50 hover:text-orange-100 p-3 rounded-md cursor-pointer hover:bg-orange-700 ${
        activePage === title ? "bg-orange-700" : ""
      }`}
    >
      <p className="font-bold text-xl">{svgIcon}</p>
      <div className="flex items-center justify-center gap-10 font-bold pl-3">{title}
        {
          (title === "Menu" || title === "Users") && (
            <div className=" w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer">
            <p className="text-sm text-white font-semibold">
              {
                title === "Menu"? foodItems.length:users.length
              }
            </p>
          </div>
          )
        }
      </div>
    </motion.div>
  );
};
export default SidenavMenu;
