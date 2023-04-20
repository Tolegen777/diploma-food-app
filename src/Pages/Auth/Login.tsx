import {Link, useNavigate} from "react-router-dom";
import ProviderAuth, {ImageBox} from ".";
import {toast} from "react-toastify";

import {motion} from "framer-motion";
import {useState} from "react";
import {useStateValue} from "../../context/StateProvider";
import {useMutation} from "react-query";
import {authApi} from "../../api/authApi";
import {IAuthResponse} from "../../types/authTypes";
import {tokenService} from "../../components/services/tokenService";
import {customNotification} from "../../utils/customNotification";
import {Loader} from "../../components/Loader";
import {Roles} from "../../const/roles";

const Login = () => {
    const navigate = useNavigate();
    const [{user}, dispatch] = useStateValue();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: onSignIn, isLoading } = useMutation('signIn', authApi.signInUser, {
        onSuccess: (data: IAuthResponse) => {
            tokenService.updateLocalTokenData(data.access_token)
            tokenService.setUserData(email, password)
            dispatch({
                type: "SET_USER",
                user: {
                    displayName: null,
                    email: email,
                    phoneNumber: null,
                    photoURL: null,
                    providerId: password,
                    uid: email,
                },
            });
            if (email === 'super_admin@gmail.com') {
                dispatch({
                    type: "SET_ROLE",
                    role: Roles.superAdmin,
                })
            }
            navigate('/')
            customNotification({type: 'success', message: 'Вы успешно авторизовались!'})
        },
        onError: () => {
            customNotification({type: "error", message: "Неправильный логин или пароль!"})
        }
    })


    const EmailAuth = () => {
        if (!user) {
            if (email.length > 0 && password.length > 0) {
                onSignIn({
                    email: email,
                    password: password
                })
                // navigate("/");

            } else {
                customNotification({type: 'error', message: 'Заполните все поля!'})
            }
        }
    };

    return (
        <section className="w-full h-auto ">
            <div className="container md:py-10 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-3 text-gray-800">
                    <ImageBox/>
                    <div className="w-full md:w-[30rem]">
                        <form className="p-2">
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                    placeholder="почта"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                    placeholder="пароль"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    to="/"
                                    className="text-orange-600 hover:text-orange-700 focus:text-orange-700 active:text-orange-800 duration-200 transition ease-in-out"
                                >
                                    Забыли пароль?
                                </Link>
                            </div>

                            {isLoading ? <Loader/> : <motion.p
                                className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                onClick={EmailAuth}
                                whileHover={{scale: 1.1}}
                            >
                                Войти
                            </motion.p> }

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                                    Нету аккаунта?
                                </p>
                            </div>
                            <Link
                                to={"/register"}
                            >
                                <motion.p
                                    className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                >
                                    Зарегестрироваться
                                </motion.p>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
