// FIXME first done
import React from 'react'
import {EmptyCartImg} from '../Assets'
import {useTranslation} from "react-i18next";

const EmptyCart = () => {

    const { t } = useTranslation();

    return (
        <div className='w-full p-5 flex flex-col items-center gap-4 justify-center'>
            <img className='h-[340px]' src={EmptyCartImg} alt='empty cart'/>
            <p className="text-textColor  font-semibold">{t("columns.emptyCard")}</p>
        </div>
    )
}

export default EmptyCart