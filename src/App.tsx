import "react-toastify/dist/ReactToastify.css";

import {
  About,
  Admin,
  Home,
  Login,
  Menu,
  Profile,
  Services,
  Signup,
} from "./Pages";
import { Cart, Footer, Header } from "./components";
import {Route, Routes, useLocation} from "react-router-dom";
import {
  calculateCartTotal,
} from "./utils/functions";

import { AnimatePresence } from "framer-motion";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import {useEffect, useState} from "react";
import { useStateValue } from "./context/StateProvider";
import {tokenService} from "./components/services/tokenService";
import {useQuery} from "react-query";
import {IRestaurantMyResponse} from "./types/restaurantTypes";
import {restaurantApi} from "./api/restaurantApi";
import {productApi} from "./api/productApi";
import {IFoodItemContent} from "../types";
import {Roles} from "./const/roles";

function App() {
  const [{ showCart,showContactForm, user, foodItems, cartItems, adminMode, restaurant_id, role }, dispatch] =
    useStateValue();

  const location = useLocation()

  const [restaurantId, setRestaurantId] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('')

  const { data: restaurantMyData } = useQuery<IRestaurantMyResponse>(
      ['restaurantMy'],
      () => restaurantApi.restaurantMy(), {
        enabled: tokenService.getLocalAccessToken().length > 0,
        onSuccess: () => {
          dispatch({
            type: "SET_ROLE",
            role: Roles.restaurant,
          });
        }
      }
  );

  const { data: productsData } = useQuery<IFoodItemContent>(
      ['products', title, restaurantId, categoryId, page, limit],
      () => productApi.getProducts({
        title,
        restaurantId,
        categoryId,
        page,
        limit
      }), {
        onSuccess: () => {
          dispatch({
            type: "SET_FOOD_ITEMS",
            foodItems: productsData?.data ?? [],
          })
        }
      }
  );

  useEffect(() => {
    if (location.pathname?.slice(1)?.length > 0) {
      dispatch({
        type: "SET_RESTAURANT_ID",
        restaurant_id: location.pathname.slice(1),
      });
    }
  }, [location.pathname])



  console.log(restaurant_id, 'any')

  useEffect(() => {
    // FIXME нужно смотреть
    foodItems &&
      cartItems.length > 0 &&
      calculateCartTotal(cartItems, foodItems, dispatch);
  }, [cartItems, foodItems, dispatch]);
  return (
    <AnimatePresence exitBeforeEnter>
      <ToastContainer />
      <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary" style={{background: '#1F2122'}}>
        {showCart && <Cart />}
        {showContactForm && <Contact />}
        {!(adminMode && role === Roles.restaurant) && <Header />}
        <main
          className={`${
            !(adminMode && role === Roles.restaurant) &&
            "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
          } w-full h-auto`}
          onClick={() => {}}
        >
          {/* Routes */}
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />
          </Routes>

          {!(adminMode && role === Roles.restaurant) && <Footer />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
