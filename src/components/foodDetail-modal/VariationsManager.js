import React from 'react'
import { FoodTitleTypography } from '../food-card/FoodCard.style'
import VariationButtons from './VariationButtons'
import { ChoiceValues } from './ChoiceValues'

const VariationsManager = (props) => {
    const {
        t,
        modalData,
        radioCheckHandler,
        changeChoices,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
    } = props

    return (
        <>
            <FoodTitleTypography
                gutterBottom
                variant="h6"
                component="h6"
                sx={{
                    margin: '5px 0',
                    textAlign: 'center',
                }}
                fontWeight="600"
            >
                {t('Select Variations')}
            </FoodTitleTypography>
            {modalData.length > 0 && modalData[0].variations?.length > 0 ? (
                modalData[0].variations?.map((choice, choiceIndex) => (
                    <ChoiceValues
                        key={choiceIndex}
                        choice={choice}
                        t={t}
                        radioCheckHandler={radioCheckHandler}
                        choiceIndex={choiceIndex}
                        changeChoices={changeChoices}
                        currencySymbolDirection={currencySymbolDirection}
                        currencySymbol={currencySymbol}
                        digitAfterDecimalPoint={digitAfterDecimalPoint}
                    />
                ))
            ) : (
                <VariationButtons
                    modalData={modalData}
                    changeChoices={changeChoices}
                />
            )}
        </>
    )
}

VariationsManager.propTypes = {}

export default VariationsManager
