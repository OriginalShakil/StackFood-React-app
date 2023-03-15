import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import FoodDetailModal from '../foodDetail-modal/FoodDetailModal'
import { RTL } from '../RTL/RTL'

const ProductUpdateModal = ({
    openModal,
    setOpenModal,
    currencySymbol,
    currencySymbolDirection,
    digitAfterDecimalPoint,
}) => {
    const [product, setProduct] = useState(null)
    const [languageDirection, setLanguageDirection] = useState('')
    const { cartItem } = useSelector((state) => state.cart)
    const { global } = useSelector((state) => state.globalSettings)
    useEffect(() => {
        setProduct(cartItem)
    }, [])
    const handleModalClose = () => {
        setOpenModal(false)
    }
    useEffect(() => {
        // Perform localStorage action
        if (typeof window !== 'undefined') {
            setLanguageDirection(localStorage.getItem('direction') || 'ltr')
        }
    }, [languageDirection])
    return (
        <>
            {product && openModal && (
                <RTL direction={languageDirection}>
                    <FoodDetailModal
                        product={product}
                        image={`${global?.base_urls?.product_image_url}/${product.image}`}
                        open={openModal}
                        handleModalClose={handleModalClose}
                        setOpen={setOpenModal}
                        currencySymbolDirection={currencySymbolDirection}
                        currencySymbol={currencySymbol}
                        digitAfterDecimalPoint={digitAfterDecimalPoint}
                        productUpdate={true}
                    />
                </RTL>
            )}
        </>
    )
}

ProductUpdateModal.propTypes = {}

export default ProductUpdateModal
