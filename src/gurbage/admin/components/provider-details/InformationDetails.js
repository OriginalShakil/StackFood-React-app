import React from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { CustomBoxFullWidth } from '../../../../styled-components/CustomStyles.style'
import { Button, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CustomInfoCardWithImage from '../../../../components/custom-cards/CustomInfoCardWithImage'
import CustomInfoCardWithoutImage from '../../../../components/custom-cards/CustomInfoCardWithoutImage'
import { FlexContainerForInformationDetails } from './ProviderDetails.style'

const InformationDetails = () => {
    const { t } = useTranslation()
    return (
        <CustomBoxFullWidth>
            <FlexContainerForInformationDetails>
                <Typography variant="h3">{t('Information Details')}</Typography>
                <Button
                    startIcon={<EditIcon fontSize="small" />}
                    variant="contained"
                >
                    {t('Edit')}
                </Button>
            </FlexContainerForInformationDetails>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <CustomInfoCardWithImage />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomInfoCardWithoutImage />
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    )
}

export default InformationDetails
