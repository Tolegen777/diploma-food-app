// FIXME first done
// import React from 'react'
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import {useQuery} from "react-query";
import {IFoodItemContent} from "../../../types";
import {productApi} from "../../api/productApi";
import {cartApi} from "../../api/cartApi";
import {ICartResponse} from "../../types/cartTypes";

const Navigations = ({ direction }: { direction?: string }) => {
  const [{ showContactForm, user }, dispatch] = useStateValue();

  const { data: cartData } = useQuery<ICartResponse[]>(
      ['cart'],
      () => cartApi.getCart(), {
        enabled: !!user
      }
  );

  console.log(cartData, 'DDDD')
  const handleToggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
      showCart: true,
    });
  };
  const handleToggleContact = () => {
    dispatch({
      type: "TOGGLE_CONTACT_FORM",
      showContactForm: !showContactForm,
    });
  }
  return (
    <div className="flex items-center gap-8" >
      <motion.ul
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className={`flex items-center gap-8 ${direction && direction}`}
      >
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
        >
          <Link to={'/'} style={{color:'#fff'}}>Главная</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
        >
          <Link to={'/menu'} style={{color: '#fff'}}>Меню</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
        >
          <Link to={'/services'} style={{color:'#fff'}}>О нас</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
          onClick={handleToggleContact}
          style={{color:'#fff'}}
        >
          Контакты
        </motion.li>
      </motion.ul>

      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="relative flex items-center justify-center text-textColor"
        onClick={handleToggleCart}
      >
        <MdShoppingBasket className="text-2xl cursor-pointer" />
        {cartData && (
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer">
            <p className="text-sm text-white font-semibold">
              {cartData.length}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Navigations;
