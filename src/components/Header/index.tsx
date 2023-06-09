import {Logo} from "../Assets";
import {Link} from "react-router-dom";

import {HiOutlineMenuAlt2} from "react-icons/hi";
import LoginAction from "./LoginAction";
import MobileNav from "./mobile-nav";
import Navigations from "./Navigations";
import {motion} from "framer-motion";
import {useState} from "react";
import {Profile} from "../Admin/Profile";
import {userService} from "../../services/userService";
import {Profile2} from "../Admin/Profile2";

const Header = () => {

    const user = userService.getLocalUserEmail()

    const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);


    return (
        <header className="w-screen bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16"
                style={{background: '#1F2122'}}>
            {/* Tablet and Desktop */}
            <div className="hidden md:flex w-full justify-between itesm-center" style={{background: '#1F2122'}}>
                <Link to={"/"}>
                    <motion.div
                        whileHover={{scale: 1.1}}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <img src={Logo} alt="Logo" className="md:w-6 lg:w-8 object-cover"/>
                        <p className="text-headingColor md:text-lg lg:text-xl font-bold" style={{color: '#fff'}}>
                            Saffy
                        </p>
                    </motion.div>
                </Link>

                {/*<Navigations/>*/}

                {user ? (
                    <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
                        <Profile/>
                    </div>
                ) : (
                    // <LoginAction text={"Логин"}/>
                    <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
                        <Profile2/>
                    </div>
                )}
            </div>

            {/* Mobile */}
            <motion.div
                className="flex md:hidden w-full p-0 items-center justify-between"
                initial={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: 200}}
            >
                {isOpenMobileNav ? (
                    <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav}/>
                ) : (
                    <div className="p-5 flex items-center justify-between w-full">
                        <motion.div
                            whileTap={{scale: 0.9}}
                            className=" flex items-center justify-center"
                            onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
                        >
                            <HiOutlineMenuAlt2 className="text-headingColor text-4xl" style={{color: "#fff"}}/>
                        </motion.div>
                        {user ? (
                            <div
                                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
                            >
                                <motion.div
                                    whileHover={{scale: 1.1}}
                                    className="group flex items-center justify-center"
                                >
                                    <Profile/>
                                </motion.div>
                            </div>
                        ) : (
                            // <LoginAction mobile />
                            <div
                                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
                            >
                                <motion.div
                                    whileHover={{scale: 1.1}}
                                    className="group flex items-center justify-center"
                                >
                                    <Profile2/>
                                </motion.div>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </header>
    );
};

export default Header;
