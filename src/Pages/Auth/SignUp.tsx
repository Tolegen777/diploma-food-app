// FIXME first done
import {Link, useNavigate} from "react-router-dom";
import {ImageBox} from ".";

// import { motion } from "framer-motion";
import {useState} from "react";
import {useStateValue} from "../../context/StateProvider";
import {useMutation, useQueryClient} from "react-query";
import {authApi} from "../../api/authApi";
import {IAuthResponse} from "../../types/authTypes";
import {customNotification} from "../../utils/customNotification";
import {Loader} from "../../components/Loader";
import {Checkbox} from "antd";
import {restaurantApi} from "../../api/restaurantApi";
import {Roles} from "../../const/roles";
import {useTranslation} from "react-i18next";
import {tokenService} from "../../services/tokenService";

// toast.configure()

const SignUp = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const [{user}, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rest, setRest] = useState('');
    const [isRest, setIsRest] = useState(false);

    const token = tokenService.getLocalAccessToken()

    const queryClient = useQueryClient();

    const {mutate: onCreateRestaurant} = useMutation('restaurant', restaurantApi.createRestaurant, {
        onSuccess: () => {
            queryClient.invalidateQueries('restaurant');
            dispatch({
                type: "SET_ROLE",
                role: Roles.restaurant,
            });
        },
    })

    const {mutate: onSignUp, isLoading} = useMutation('signUp', authApi.signUpUser, {
        onSuccess: (data: IAuthResponse) => {
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

            tokenService.updateLocalTokenData(data?.access_token ?? '')

            if (isRest) {
                onCreateRestaurant({
                    title: rest,
                    categoryId: 0,
                    token: token
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
                onSignUp({
                    email: email,
                    password: password
                })

            } else {
                customNotification({type: 'error', message: 'Заполните все поля!'})
            }
        }
    };

    return (
        <>
            <section className="w-full h-auto">
                <div className="container md:py-10 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <ImageBox/>
                        <div className="w-full md:w-[30rem]">
                            <form className="p-2">
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                        placeholder={t("columns.email") ?? ''}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                        placeholder={t("columns.password") ?? ''}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6">
                                    <Checkbox style={{marginBottom: '5px'}}
                                              onChange={() => setIsRest(!isRest)}
                                              value={isRest}
                                    >
                                        <p className="text-white">Это ресторан</p>
                                    </Checkbox>
                                    {isRest && <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                        placeholder="Название ресторана"
                                        onChange={(e) => setRest(e.target.value)}
                                    />}
                                </div>

                                <div className="flex justify-between items-center mb-6"></div>

                                {isLoading ? <Loader/> : <p
                                    className="flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full cursor-pointer"
                                    onClick={EmailAuth}
                                    aria-disabled={true}
                                >
                                    {t("columns.register")}
                                </p>}

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                                        Уже есть аккаунт?
                                    </p>
                                </div>
                                <Link
                                    to={"/login"}
                                    className="flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                >
                                    {t("columns.login")}
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default SignUp;
