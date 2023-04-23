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
import {customNotification} from "./utils/customNotification";

function App() {
  const [{ showCart,showContactForm, user, foodItems, cartItems, adminMode, restaurant_id, role }, dispatch] =
    useStateValue();

  const location = useLocation()

  const [restaurantId, setRestaurantId] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [limit, setLimit] = useState(100)
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('')

  const { data: restaurantMyData } = useQuery<IRestaurantMyResponse>(
      ['restaurantMy'],
      () => restaurantApi.restaurantMy(), {
        enabled: tokenService.getLocalAccessToken().length > 0,
        onSuccess: (data) => {
          console.log(data, 'DATA')
          setRestaurantId(data?.id.toString())
          dispatch({
            type: "SET_ROLE",
            role: Roles.restaurant,
          });
        }
      }
  );

  const { data: productsData, error } = useQuery<IFoodItemContent>(
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
        },
        enabled: restaurantId.length > 0
      }
  );

  useEffect(() => {
    if (location.pathname?.includes('rest_id:')) {
      console.log()
      setRestaurantId(location.pathname.slice(9))
      dispatch({
        type: "SET_RESTAURANT_ID",
        restaurant_id: location.pathname.slice(9),
      });
    }
  }, [location.pathname])

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
        {/*// @ts-ignore*/}
        {error && customNotification({type: 'error', message: error?.message as string})}
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
