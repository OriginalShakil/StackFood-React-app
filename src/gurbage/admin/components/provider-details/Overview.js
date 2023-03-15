import React, { useState } from 'react'
import { CustomPaperBigCard } from '../../../../styled-components/CustomStyles.style'
import CustomCard from '../../../../components/custom-cards/CustomCard'
import { useTranslation } from 'react-i18next'
import CustomCardStatus from '../../../../components/custom-cards/CustomCardStatus'
import { Grid } from '@mui/material'
import InformationDetails from './InformationDetails'
import Zoom from '@mui/material/Zoom'
import {
    CustomGridForOverview,
    CustomZoomForProviderDetails,
} from './ProviderDetails.style'

const Overview = () => {
    const [checked, setChecked] = useState(true)
    const data = '$ 3,405'
    const { t } = useTranslation()
    return (
        <CustomPaperBigCard>
            <CustomGridForOverview container spacing={2}>
                <Zoom
                    in={checked}
                    style={{ transitionDelay: checked ? '200ms' : '0ms' }}
                >
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <CustomCard
                            cardTitle={t('Collect Cash From Provider')}
                            cardData={data}
                        />
                    </Grid>
                </Zoom>
                <Zoom
                    in={checked}
                    style={{ transitionDelay: checked ? '200ms' : '0ms' }}
                >
                    <Grid item xs={12} sm={6} md={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <CustomCardStatus
                                    cardTitle={t('Collect Cash From Provider')}
                                    cardData={data}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CustomCardStatus
                                    cardTitle={t('Collect Cash From Provider')}
                                    cardData={data}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Zoom>

                <Zoom
                    in={checked}
                    style={{ transitionDelay: checked ? '300ms' : '0ms' }}
                >
                    <Grid item xs={12} sm={6} md={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <CustomCardStatus
                                    cardTitle={t('Collect Cash From Provider')}
                                    cardData={data}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CustomCardStatus
                                    cardTitle={t('Collect Cash From Provider')}
                                    cardData={data}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Zoom>
                <Zoom
                    in={checked}
                    style={{ transitionDelay: checked ? '400ms' : '0ms' }}
                >
                    <Grid item xs={12} sm={6} md={3}>
                        <CustomCard
                            cardTitle={t('Collect Cash From Provider')}
                            cardData={data}
                        />
                    </Grid>
                </Zoom>
            </CustomGridForOverview>
            <InformationDetails />
        </CustomPaperBigCard>
    )
}

export default Overview
