import CloseIcon from '@mui/icons-material/Close'
import { Box, Grid, Modal } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    setCampCart,
    setCart,
    setClearCart,
    setUpdateVariationToCart,
} from '../../redux/slices/cart'
import {
    calculateItemBasePrice,
    getConvertDiscount,
    getIndexFromArrayByComparision,
    isAvailable,
} from '../../utils/customFunctions'
import { useTranslation } from 'react-i18next'
import { FoodDetailModalStyle } from '../home/HomeStyle'
import toast from 'react-hot-toast'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import { useMutation } from 'react-query'
import { useTheme } from '@mui/material/styles'
import { useWishListDelete } from '../../hooks/react-query/config/wish-list/useWishListDelete'
import { addWishList, removeWishListFood } from '../../redux/slices/wishList'
import { useRouter } from 'next/router'
import 'simplebar-react/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'
import StartPriceView from './StartPriceView'
import CartClearModal from './CartClearModal'
import AuthModal from '../auth'

import { handleProductVariationRequirementsToaster } from './SomeHelperFuctions'
import AddUpdateOrderToCart from './AddUpdateOrderToCart'
import AddOrderToCart from './AddOrderToCart'
import UpdateToCartUi from './UpdateToCartUi'
import TotalAmountVisibility from './TotalAmountVisibility'
import AddOnsManager from './AddOnsManager'
import VariationsManager from './VariationsManager'
import FoodDetailsManager from './FoodDetailsManager'
import IncrementDecrementManager from './IncrementDecrementManager'
import { handleDiscountChip } from './helper-functions/handleDiscountChip'
import { handleInitialTotalPriceVarPriceQuantitySet } from './helper-functions/handleDataOnFirstMount'

const FoodDetailModal = ({
    product,
    image,
    open,
    handleModalClose,
    setOpen,
    currencySymbolDirection,
    currencySymbol,
    digitAfterDecimalPoint,
    productUpdate,
}) => {
    const router = useRouter()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const theme = useTheme()
    const [selectedOptions, setSelectedOptions] = useState([])
    const [totalPrice, setTotalPrice] = useState(null)
    const [varPrice, setVarPrice] = useState(null)
    const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(null)
    const [modalFor, setModalFor] = useState('sign-in')
    const [add_on, setAddOns] = useState([])
    const [product_add_ons, setProductAddOns] = useState(product.add_ons)
    const { cartList } = useSelector((state) => state.cart)
    const [quantity, setQuantity] = useState(1)
    const [clearCartModal, setClearCartModal] = React.useState(false)
    const handleClearCartModalOpen = () => setClearCartModal(true)
    const { token } = useSelector((state) => state.globalSettings)
    const { wishLists } = useSelector((state) => state.wishList)
    const [modalData, setModalData] = useState([])

    useEffect(() => {
        //initially setting these states to use further
        handleInitialTotalPriceVarPriceQuantitySet(
            product,
            setModalData,
            productUpdate,
            setTotalPrice,
            setVarPrice,
            setQuantity,
            setSelectedOptions,
            setTotalWithoutDiscount
        )
    }, [product])
    const notify = (i) => toast(i)
    const itemValuesHandler = (itemIndex, variationValues) => {
        const isThisValExistWithinSelectedValues = selectedOptions.filter(
            (sItem) => sItem.choiceIndex === itemIndex
        )
        if (variationValues.length > 0) {
            let newVariation = variationValues.map((vVal, vIndex) => {
                let exist =
                    isThisValExistWithinSelectedValues.length > 0 &&
                    isThisValExistWithinSelectedValues.find(
                        (item) => item.optionIndex === vIndex
                    )
                if (exist) {
                    return exist
                } else {
                    return { ...vVal, isSelected: false }
                }
            })
            return newVariation
        } else {
            return variationValues
        }
    }
    const getNewVariationForDispatch = () => {
        const newVariations = modalData?.[0]?.variations?.map((item, index) => {
            if (selectedOptions.length > 0) {
                return {
                    ...item,
                    values:
                        item.values.length > 0
                            ? itemValuesHandler(index, item.values)
                            : item.values,
                }
            } else {
                return item
            }
        })
        return newVariations
    }

    const addOrUpdateToCartByDispatch = () => {
        const newVariations = modalData?.[0]?.variations?.map((item, index) => {
            if (selectedOptions.length > 0) {
                return {
                    ...item,
                    values:
                        item.values.length > 0
                            ? itemValuesHandler(index, item.values)
                            : item.values,
                }
            } else {
                return item
            }
        })
        if (productUpdate) {
            //for updating
            const indexNumber = getIndexFromArrayByComparision(
                cartList,
                modalData[0]
            )
            const newObj = {
                ...modalData[0],
                totalPrice: getConvertDiscount(
                    product?.discount,
                    product?.discount_type,
                    totalPrice,
                    product?.restaurant_discount
                ),
                quantity: quantity,
                variations: getNewVariationForDispatch(),
                selectedAddons: add_on,
                itemBasePrice: getConvertDiscount(
                    product?.discount,
                    product?.discount_type,
                    calculateItemBasePrice(modalData[0], selectedOptions),
                    product?.restaurant_discount
                ),
            }
            dispatch(
                setUpdateVariationToCart({
                    newObj: newObj,
                    indexNumber: indexNumber,
                })
            )
            toast.success(t('Item updated successfully'))
        } else {
            //for adding
            dispatch(
                setCart({
                    ...modalData[0],
                    totalPrice: getConvertDiscount(
                        product?.discount,
                        product?.discount_type,
                        totalPrice,
                        product?.restaurant_discount
                    ),
                    quantity: quantity,
                    variations: getNewVariationForDispatch(),
                    selectedAddons: add_on,
                    itemBasePrice: getConvertDiscount(
                        product?.discount,
                        product?.discount_type,
                        calculateItemBasePrice(modalData[0], selectedOptions),
                        product?.restaurant_discount
                    ),
                    // selectedVariations: selectedVariations,
                })
            )
            toast.success(t('Item added to cart'))
        }
        handleClose()
    }
    const handleCampaignOrder = () => {
        dispatch(
            setCampCart({
                ...modalData[0],
                totalPrice: totalPrice,
                quantity: quantity,
                variations: getNewVariationForDispatch(),
                selectedAddons: add_on,
            })
        )
        router.push(`/checkout?page=campaign`)
    }

    const handleProductAddUpdate = (checkingFor) => {
        if (checkingFor === 'cart') {
            addOrUpdateToCartByDispatch()
        } else if (checkingFor === 'campaign') {
            handleCampaignOrder()
        }
    }

    const handleRequiredItemsToaster = (itemsArray, selectedOptions) => {
        itemsArray?.forEach((item) => {
            if (selectedOptions.length > 0) {
                selectedOptions?.forEach((sOption) => {
                    if (sOption.choiceIndex !== item.indexNumber) {
                        const text = item.name
                        let checkingQuantity = false
                        handleProductVariationRequirementsToaster(
                            text,
                            checkingQuantity,
                            t
                        )
                    }
                })
            } else {
                const text = item.name
                let checkingQuantity = false
                handleProductVariationRequirementsToaster(
                    text,
                    checkingQuantity,
                    t
                )
            }
        })
    }
    const optionalVariationSelectionMinMax = () => {
        const selectedValues = selectedOptions.filter(
            (item) => item.type === 'optional'
        )
        let isTrue = false
        if (selectedValues.length > 0) {
            const selectedIndexCount = []
            selectedValues.forEach((item) =>
                selectedIndexCount.push(item.choiceIndex)
            )
            const indexWithoutDuplicates = [...new Set(selectedIndexCount)]
            if (indexWithoutDuplicates.length > 0) {
                indexWithoutDuplicates.forEach((itemIndex) => {
                    let optionalItemIndex = modalData?.[0]?.variations?.find(
                        (mItem, index) => index === itemIndex
                    )

                    if (optionalItemIndex) {
                        if (optionalItemIndex.type === 'multi') {
                            let indexNum = modalData[0]?.variations?.findIndex(
                                (mItem) => mItem.name === optionalItemIndex.name
                            )
                            let count = 0
                            selectedIndexCount.forEach((indexN) => {
                                if (indexN === indexNum) {
                                    count += 1
                                }
                            })

                            if (
                                count >=
                                    Number.parseInt(optionalItemIndex.min) &&
                                count <= Number.parseInt(optionalItemIndex.max)
                            ) {
                                isTrue = true
                            } else {
                                const text = {
                                    name: optionalItemIndex.name,
                                    min: optionalItemIndex.min,
                                    max: optionalItemIndex.max,
                                }
                                let checkingQuantity = true
                                isTrue = false
                                let id = true
                                handleProductVariationRequirementsToaster(
                                    text,
                                    checkingQuantity,
                                    t,
                                    id
                                )
                            }
                        } else {
                            isTrue = true
                        }
                    } else {
                        isTrue = true
                    }
                })
            } else {
                isTrue = true
            }
        } else {
            isTrue = true
        }

        return isTrue
    }

    const handleAddToCartOnDispatch = (checkingFor) => {
        let requiredItemsList = []
        modalData?.[0]?.variations?.forEach((item, index) => {
            if (item.required === 'on') {
                const itemObj = {
                    indexNumber: index,
                    type: item.type,
                    max: item.max,
                    min: item.min,
                    name: item.name,
                }
                requiredItemsList.push(itemObj)
            }
        })

        if (requiredItemsList.length > 0) {
            if (selectedOptions.length === 0) {
                handleRequiredItemsToaster(requiredItemsList, selectedOptions)
            } else {
                let itemCount = 0

                requiredItemsList?.forEach((item, index) => {
                    // if(item)
                })

                requiredItemsList?.forEach((item, index) => {
                    const isExistInSelection = selectedOptions?.find(
                        (sitem) => sitem.choiceIndex === item.indexNumber
                    )
                    if (isExistInSelection) {
                        if (item.type === 'single') {
                            //call add/update to cart functionalities
                            itemCount += 1
                        } else {
                            //check based on min max for multiple selection
                            let selectedOptionCount = 0
                            selectedOptions?.forEach((item) => {
                                if (
                                    item.choiceIndex ===
                                    isExistInSelection?.choiceIndex
                                ) {
                                    selectedOptionCount += 1
                                }
                            })
                            if (
                                selectedOptionCount >=
                                    Number.parseInt(item.min) &&
                                selectedOptionCount <= Number.parseInt(item.max)
                            ) {
                                //call add/update to cart functionalities
                                itemCount += 1
                            } else {
                                const text = {
                                    name: item.name,
                                    min: item.min,
                                    max: item.max,
                                }
                                let checkingQuantity = true

                                handleProductVariationRequirementsToaster(
                                    text,
                                    checkingQuantity,
                                    t
                                )
                            }
                        }
                        if (
                            itemCount === requiredItemsList.length &&
                            optionalVariationSelectionMinMax(
                                selectedOptions,
                                modalData
                            )
                        ) {
                            handleProductAddUpdate(checkingFor)
                        }
                    } else {
                        handleRequiredItemsToaster(
                            requiredItemsList,
                            selectedOptions
                        )
                    }
                })
            }
        } else {
            handleProductAddUpdate(checkingFor)
        }
    }
    const addToCard = () => {
        let checkingFor = 'cart'
        if (cartList.length > 0) {
            //checking same restaurant items already exist or not
            const isRestaurantExist = cartList.find(
                (item) => item.restaurant_id === product.restaurant_id
            )
            if (isRestaurantExist) {
                if (productUpdate) {
                    handleAddToCartOnDispatch(checkingFor)
                } else {
                    //add the same product based on variations
                    handleAddToCartOnDispatch(checkingFor)
                }
            } else {
                if (cartList.length !== 0) {
                    handleClearCartModalOpen()
                }
            }
        } else {
            handleAddToCartOnDispatch(checkingFor)
        }
    }
    const clearCartAlert = () => {
        dispatch(setClearCart())
        setClearCartModal(false)
        toast.success(
            t(
                'Previously added restaurant foods have been removed from cart. Now, try again.'
            ),
            {
                duration: 6000,
            }
        )
    }
    const handleClose = () => setOpen(false)

    const changeChoices = (
        e,
        option,
        optionIndex,
        choiceIndex,
        isRequired,
        choiceType,
        checked
    ) => {
        if (choiceType === 'single') {
            if (checked) {
                //selected or checked variation handling
                if (selectedOptions.length > 0) {
                    const isExist = selectedOptions.find(
                        (item) =>
                            item.choiceIndex === choiceIndex &&
                            item.optionIndex === optionIndex
                    )
                    if (isExist) {
                        const newSelectedOptions = selectedOptions.filter(
                            (sOption) =>
                                sOption.choiceIndex === choiceIndex &&
                                sOption.label !== isExist.label
                        )
                        setSelectedOptions(newSelectedOptions)
                        setTotalPrice(
                            (prevState) =>
                                prevState -
                                Number.parseInt(option.optionPrice) * quantity
                        )
                        setVarPrice(
                            (prevPrice) =>
                                prevPrice -
                                Number.parseInt(option.optionPrice) * quantity
                        )
                    } else {
                        const isItemExistFromSameVariation =
                            selectedOptions.find(
                                (item) => item.choiceIndex === choiceIndex
                            )
                        if (isItemExistFromSameVariation) {
                            const newObjs = selectedOptions.map((item) => {
                                if (item.choiceIndex === choiceIndex) {
                                    return {
                                        choiceIndex: choiceIndex,
                                        ...option,
                                        optionIndex: optionIndex,
                                        isSelected: true,
                                        type:
                                            isRequired === 'on'
                                                ? 'required'
                                                : 'optional',
                                    }
                                } else {
                                    return item
                                }
                            })
                            setSelectedOptions(newObjs)
                            //changing total price by removing previous ones price and adding new selection options price
                            setTotalPrice(
                                (prevState) =>
                                    prevState -
                                    Number.parseInt(
                                        isItemExistFromSameVariation.optionPrice
                                    ) *
                                        quantity +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                            setVarPrice(
                                (prevPrice) =>
                                    prevPrice -
                                    Number.parseInt(
                                        isItemExistFromSameVariation.optionPrice
                                    ) *
                                        quantity +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                        } else {
                            const newObj = {
                                choiceIndex: choiceIndex,
                                ...option,
                                optionIndex: optionIndex,
                                isSelected: true,
                                type:
                                    isRequired === 'on'
                                        ? 'required'
                                        : 'optional',
                            }
                            setSelectedOptions([...selectedOptions, newObj])
                            setTotalPrice(
                                (prevState) =>
                                    prevState +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                            setVarPrice(
                                (prevPrice) =>
                                    prevPrice +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                        }
                    }
                } else {
                    // for a new selected variation
                    const newObj = {
                        choiceIndex: choiceIndex,
                        ...option,
                        optionIndex: optionIndex,
                        isSelected: true,
                        type: isRequired === 'on' ? 'required' : 'optional',
                    }
                    setSelectedOptions([newObj])
                    setTotalPrice(
                        (prevState) =>
                            prevState +
                            Number.parseInt(option.optionPrice) * quantity
                    )
                    setVarPrice(
                        (prevPrice) =>
                            prevPrice +
                            Number.parseInt(option.optionPrice) * quantity
                    )
                }
            } else {
                // uncheck or unselect variation handle
                const filtered = selectedOptions.filter((item) => {
                    if (item.choiceIndex === choiceIndex) {
                        if (item.label !== option.label) {
                            return item
                        }
                    } else {
                        return item
                    }
                })
                setSelectedOptions(filtered)

                setTotalPrice(
                    (prevState) =>
                        prevState -
                        Number.parseInt(option.optionPrice) * quantity
                )
                setVarPrice(
                    (prevPrice) =>
                        prevPrice -
                        Number.parseInt(option.optionPrice) * quantity
                )
            }
        } else {
            //for multiple optional variation selection
            if (e.target.checked) {
                setSelectedOptions((prevState) => [
                    ...prevState,
                    {
                        choiceIndex: choiceIndex,
                        ...option,
                        optionIndex: optionIndex,
                        isSelected: true,
                        type: isRequired === 'on' ? 'required' : 'optional',
                    },
                ])
                setTotalPrice(
                    (prevState) =>
                        prevState +
                        Number.parseInt(option.optionPrice) * quantity
                )
                setVarPrice(
                    (prevPrice) =>
                        prevPrice +
                        Number.parseInt(option.optionPrice) * quantity
                )
            } else {
                const filtered = selectedOptions.filter((item) => {
                    if (item.choiceIndex === choiceIndex) {
                        if (item.label !== option.label) {
                            return item
                        }
                    } else {
                        return item
                    }
                })
                setSelectedOptions(filtered)
                setTotalPrice(
                    (prevState) =>
                        prevState -
                        Number.parseInt(option.optionPrice) * quantity
                )
                setVarPrice(
                    (prevPrice) =>
                        prevPrice -
                        Number.parseInt(option.optionPrice) * quantity
                )
            }
        }
    }
    const radioCheckHandler = (choiceIndex, option, optionIndex) => {
        const isExist = selectedOptions.find(
            (sOption) =>
                sOption.choiceIndex === choiceIndex &&
                sOption.optionIndex === optionIndex
        )
        return !!isExist
    }
    const changeAddOns = (checkTrue, addOn) => {
        if (checkTrue) {
            setAddOns([...add_on, addOn])
        } else {
            let filter = add_on.filter((item) => item.name !== addOn.name)
            setAddOns(filter)
        }
    }
    const handleTotalPrice = () => {
        let price
        if (productUpdate) {
            if (modalData.length > 0) {
                price = modalData?.[0]?.price
            }
        } else {
            price = product?.price
        }
        if (selectedOptions.length > 0) {
            selectedOptions?.forEach(
                (item) => (price += Number.parseInt(item?.optionPrice))
            )
        }
        setTotalPrice(price * quantity)
    }
    useEffect(() => {
        if (product) {
            handleTotalPrice()
        }
    }, [quantity, modalData])
    const decrementPrice = () => {
        setQuantity((prevQty) => prevQty - 1)
    }
    const incrementPrice = () => {
        setQuantity((prevQty) => prevQty + 1)
    }

    const {
        mutate: addFavoriteMutation,
        isLoading,
        error,
        data,
    } = useMutation(
        'add-favourite',
        () => ProductsApi.addFavorite(product.id),
        {
            onSuccess: (response) => {
                if (response?.data) {
                    dispatch(addWishList(product))
                    toast.success(response.data.message)
                }
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        }
    )

    const addToFavorite = () => {
        if (token) {
            addFavoriteMutation()
            // notify(data.message)
        } else toast.error(t('You are not logged in'))
    }

    const onSuccessHandlerForDelete = (res) => {
        dispatch(removeWishListFood(product.id))
        toast.success(res.message, {
            id: 'wishlist',
        })
    }
    const { mutate } = useWishListDelete()
    const deleteWishlistItem = (id) => {
        mutate(id, {
            onSuccess: onSuccessHandlerForDelete,
            onError: (error) => {
                toast.error(error.response.data.message)
            },
        })
    }
    const isInCart = (id) => {
        if (productUpdate) {
            const isInCart = cartList.filter((item) => item.id === id)
            if (isInCart.length > 0) {
                return true
            } else {
                return false
            }
        }

        // return !!cartList.find((item) => item.id === id)
    }

    const isInList = (id) => {
        return !!wishLists?.food?.find((wishFood) => wishFood.id === id)
    }
    //auth modal
    const [authModalOpen, setAuthModalOpen] = useState(false)

    const orderNow = () => {
        let checkingFor = 'campaign'
        if (token) {
            handleAddToCartOnDispatch(checkingFor)
        } else {
            setAuthModalOpen(true)
        }
    }
    const handleSignInSuccess = () => {
        dispatch(
            setCampCart({
                ...modalData[0],
                totalPrice: totalPrice,
                quantity: quantity,
                selectedAddons: add_on,
            })
        )
        router.push(`/checkout?page=campaign`)
    }
    const [selectedChoice, setChoices] = useState([])
    return (
        <>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={true}
            >
                <FoodDetailModalStyle sx={{ bgcolor: 'background.paper' }}>
                    <button onClick={handleModalClose} className="closebtn">
                        <CloseIcon sx={{ fontSize: '16px' }} />
                    </button>
                    <SimpleBar style={{ maxHeight: '60vh ' }}>
                        <FoodDetailsManager
                            handleDiscountChip={handleDiscountChip}
                            image={image}
                            modalData={modalData}
                            product={product}
                            t={t}
                            router={router}
                            isInList={isInList}
                            deleteWishlistItem={deleteWishlistItem}
                            addToFavorite={addToFavorite}
                            theme={theme}
                            currencySymbolDirection={currencySymbolDirection}
                            currencySymbol={currencySymbol}
                            digitAfterDecimalPoint={digitAfterDecimalPoint}
                        />
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            padding={{
                                xs: '10px 15px 10px 10px',
                                md: '10px 15px 10px 0px',
                            }}
                            direction="row"
                        >
                            <Grid item md={6}>
                                {modalData.length > 0 && (
                                    <StartPriceView
                                        data={modalData[0]}
                                        currencySymbolDirection={
                                            currencySymbolDirection
                                        }
                                        currencySymbol={currencySymbol}
                                        digitAfterDecimalPoint={
                                            digitAfterDecimalPoint
                                        }
                                    />
                                )}
                            </Grid>
                            <Grid item md={6} align="right">
                                <IncrementDecrementManager
                                    decrementPrice={decrementPrice}
                                    totalPrice={totalPrice}
                                    quantity={quantity}
                                    incrementPrice={incrementPrice}
                                />
                            </Grid>
                        </Grid>

                        {modalData.length > 0 &&
                            modalData[0].variations?.length > 0 && (
                                <VariationsManager
                                    t={t}
                                    modalData={modalData}
                                    radioCheckHandler={radioCheckHandler}
                                    changeChoices={changeChoices}
                                    currencySymbolDirection={
                                        currencySymbolDirection
                                    }
                                    currencySymbol={currencySymbol}
                                    digitAfterDecimalPoint={
                                        digitAfterDecimalPoint
                                    }
                                />
                            )}

                        {modalData.length > 0 &&
                            modalData[0].add_ons?.length > 0 && (
                                <AddOnsManager
                                    t={t}
                                    modalData={modalData}
                                    setTotalPrice={setTotalPrice}
                                    setVarPrice={setVarPrice}
                                    changeAddOns={changeAddOns}
                                    setProductAddOns={setProductAddOns}
                                    product={product}
                                    setAddOns={setAddOns}
                                    add_on={add_on}
                                    quantity={quantity}
                                    cartList={cartList}
                                    selectedChoice={selectedChoice}
                                />
                            )}
                    </SimpleBar>
                    <Box sx={{ marginTop: '20px' }}>
                        <Grid container direction="row">
                            <Grid
                                item
                                md={6}
                                sm={12}
                                xs={12}
                                alignSelf="center"
                                paddingLeft={{ xs: '10px', md: '0px' }}
                                paddingBottom={{ sm: '10px', md: '0px' }}
                            >
                                <TotalAmountVisibility
                                    modalData={modalData}
                                    totalPrice={totalPrice}
                                    currencySymbolDirection={
                                        currencySymbolDirection
                                    }
                                    currencySymbol={currencySymbol}
                                    digitAfterDecimalPoint={
                                        digitAfterDecimalPoint
                                    }
                                    t={t}
                                    productDiscount={product?.discount}
                                    productDiscountType={product?.discount_type}
                                    productRestaurantDiscount={
                                        product?.restaurant_discount
                                    }
                                    selectedAddOns={add_on}
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                {modalData.length > 0 &&
                                isAvailable(
                                    modalData[0].available_time_starts,
                                    modalData[0].available_time_ends
                                ) ? (
                                    <>
                                        {isInCart(product.id) && (
                                            <UpdateToCartUi
                                                addToCard={addToCard}
                                                t={t}
                                            />
                                        )}
                                        {!isInCart(product.id) && (
                                            <AddOrderToCart
                                                product={product}
                                                t={t}
                                                addToCard={addToCard}
                                                orderNow={orderNow}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <AddUpdateOrderToCart
                                        modalData={modalData}
                                        isInCart={isInCart}
                                        addToCard={addToCard}
                                        t={t}
                                        product={product}
                                        orderNow={orderNow}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </FoodDetailModalStyle>
            </Modal>
            <CartClearModal
                clearCartModal={clearCartModal}
                setClearCartModal={setClearCartModal}
                clearCartAlert={clearCartAlert}
                addToCard={addToCard}
            />
            {authModalOpen && (
                <AuthModal
                    open={authModalOpen}
                    handleClose={() => setAuthModalOpen(false)}
                    signInSuccess={handleSignInSuccess}
                    modalFor={modalFor}
                    setModalFor={setModalFor}
                />
            )}
        </>
    )
}

export default FoodDetailModal
