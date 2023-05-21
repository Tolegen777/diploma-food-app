// FIXME first done
import {EmptyCartImg} from '../Assets'
import {useState} from 'react';
import {useMutation} from "react-query";
import {customNotification} from "../../utils/customNotification";
import {contactApi} from "../../api/contactApi";
import {ICommentBody} from "../../types/commentsTypes";
import {useStateValue} from "../../context/StateProvider";
import {useTranslation} from "react-i18next";

const Form = () => {

    const { t } = useTranslation();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [subject, setSubject] = useState('')

    const [{restaurant_id}] = useStateValue();

    const {mutate: onCreateComment} = useMutation('cartComment', contactApi.createContact, {
        onSuccess: () => {
            customNotification({type: "success", message: "Ваше сообщение успешно отправлено!"})
        },
    })

    const submitForm = (e: any) => {
        e.preventDefault()
        const data: ICommentBody = {
            title: subject,
            email: email,
            name: name,
            description: message,
            star: 0,
            productId: 3,
            restaurantId: restaurant_id
        }
        onCreateComment(data)
    }
    return (
        <div className="h-full w-full flex items-center flex-col justify-center px-4 bg-primary">
            <img src={EmptyCartImg} alt="not found" className="w-[30%] h-[30%]"/>
            <form action="#" className="mb-6 w-full flex itemx-center justify-center gap-y-3 flex-col">
                <div className="mb-6">
                    <input
                        type="text"
                        className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        placeholder={t("columns.name") ?? ''}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        placeholder={t("columns.email") ?? ''}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        placeholder={t("columns.title") ?? ''}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="mb-6">
          <textarea
              className="form-control block w-full min-h-[25vh] px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
              placeholder={t("columns.message") ?? ''}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
                </div>
                <button
                    type="submit"
                    className="text-white bg-orange-600 hover:bg-orange-700 w-full focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 block"
                    onClick={submitForm}
                >
                    {t("columns.sendMessage")}
                </button>
            </form>
            {/*<p className="mb-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400">*/}
            {/*  <a href="user@gmail.com" className="hover:underline">*/}
            {/*    test@gmail.com*/}
            {/*  </a>*/}
            {/*</p>*/}
            {/*<p className="text-sm cursor-pointer text-gray-500 dark:text-gray-400">*/}
            {/*  <a href="tel:+233556844331" className="hover:underline">*/}
            {/*    +7077077070*/}
            {/*  </a>*/}
            {/*</p>*/}
        </div>
    );
};

export default Form;
