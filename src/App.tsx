// import "react-toastify/dist/ReactToastify.css";

import {Admin, Home, Login, Menu, Services, Signup} from "./Pages";
import {Cart, Footer, Header} from "./components";
import {Route, Routes, useLocation} from "react-router-dom";
import {calculateCartTotal,} from "./utils/functions";

import {AnimatePresence} from "framer-motion";
import Contact from "./components/Contact";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {useStateValue} from "./context/StateProvider";
import {useQuery} from "react-query";
import {IRestaurantMyResponse} from "./types/restaurantTypes";
import {restaurantApi} from "./api/restaurantApi";
import {productApi} from "./api/productApi";
import {IFoodItemContent} from "../types";
import {Roles} from "./const/roles";
import {customNotification} from "./utils/customNotification";
import "./language/i18n"
import {tokenService} from "./services/tokenService";
import {userService} from "./services/userService";

function App() {
    const [{showCart, showContactForm, foodItems, cartItems, role}, dispatch] = useStateValue();

    const token = tokenService.getLocalAccessToken()

    const adminMode = localStorage.getItem('adminMode') ?? ''

    const restaurant_id = userService.getRestId()

    const location = useLocation()

    const {data: restaurantMyData} = useQuery<IRestaurantMyResponse>(
        ['restaurantMy'],
        () => restaurantApi.restaurantMy(token), {
            enabled: token?.length > 0,
            onSuccess: (data) => {
                userService.updateRestId(data?.id.toString())
                dispatch({
                    type: "SET_ROLE",
                    role: Roles.restaurant,
                });
            }
        }
    );

    useEffect(() => {
        if (restaurantMyData?.id) {
            // dispatch({
            //     type: "SET_RESTAURANT_ID",
            //     restaurant_id: restaurantMyData?.id,
            // });
            userService.updateRestId(restaurantMyData?.id)
        }
    }, [restaurantMyData?.id])

    const {data: productsData, error} = useQuery<IFoodItemContent>(
        ['products', restaurant_id],
        () => productApi.getProducts({
            restaurantId: restaurant_id,
            page: 1,
            limit: 100
        }), {
            onSuccess: () => {
                dispatch({
                    type: "SET_FOOD_ITEMS",
                    foodItems: productsData?.data ?? [],
                })
            },
            enabled: !!restaurant_id
        }
    );

    useEffect(() => {
        if (location.pathname?.includes('rest_id:')) {
            // setRestaurantId(location.pathname.slice(9))
            // dispatch({
            //     type: "SET_RESTAURANT_ID",
            //     restaurant_id: location.pathname.slice(9),
            // });
            userService.updateRestId(location.pathname.slice(9))
        }
    }, [location.pathname])

    useEffect(() => {
        // FIXME нужно смотреть
        foodItems &&
        cartItems.length > 0 &&
        calculateCartTotal(cartItems, foodItems, dispatch);
    }, [cartItems, foodItems]);

    return (
        <AnimatePresence exitBeforeEnter>
            <ToastContainer/>
            <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary" style={{background: '#1F2122'}}>
                {/*// @ts-ignore*/}
                {error && customNotification({type: 'error', message: error?.message as string})}
                {showCart && <Cart/>}
                {showContactForm && <Contact/>}
                {/* FIXME разок надо посмотреть что делает adminmode */}
                {adminMode?.length === 0 && <Header/>}
                <main
                    className={`${
                        (adminMode?.length === 0 && role === Roles.restaurant) &&
                        "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
                    } w-full h-auto`}
                    onClick={() => {
                    }}
                >
                    <Routes>
                        <Route path="/*" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Signup/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/about" element={<Services/>}/>
                        <Route path="/menu" element={<Menu/>}/>
                        <Route path="/services" element={<Services/>}/>
                    </Routes>

                    {adminMode?.length === 0 && <Footer/>}
                </main>
            </div>
        </AnimatePresence>
    );
}

export default App;
