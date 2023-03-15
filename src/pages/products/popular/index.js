import React from 'react'
import Products from '../../../components/products-page/Products'
import {useTranslation} from "react-i18next";

const index = () => {
    const {t}=useTranslation()
    return (
        <>
            <div className="div">
                <Products type="popular" title={t("Popular Food")} description="Popular food"/>
            </div>
        </>
    )
}

export default index
