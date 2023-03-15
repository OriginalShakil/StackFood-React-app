import { getConvertDiscount } from '../../../utils/customFunctions'

export const handleInitialTotalPriceVarPriceQuantitySet = (
    product,
    setModalData,
    productUpdate,
    setTotalPrice,
    setVarPrice,
    setQuantity,
    setSelectedOptions,
    setTotalWithoutDiscount
) => {
    setModalData([product])
    if (productUpdate) {
        setTotalPrice(product.totalPrice)
        setVarPrice(product.totalPrice)
    } else {
        setTotalPrice(product.price)
        setVarPrice(product.price)
        setTotalWithoutDiscount(product.price)
    }
    if (product.quantity) {
        setQuantity(product.quantity)
    }
    let selectedOption = []
    if (product?.variations?.length > 0) {
        product?.variations?.forEach((item) => {
            if (item?.values?.length > 0) {
                item?.values?.forEach((value) => {
                    if (value?.isSelected) {
                        selectedOption.push(value)
                    }
                })
            }
        })
    }
    if (selectedOption.length > 0) {
        setSelectedOptions(selectedOption)
    }
}
