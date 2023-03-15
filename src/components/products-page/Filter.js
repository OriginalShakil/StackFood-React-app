import React from 'react'
import Typography from '@mui/material/Typography'
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Dropdown } from 'react-bootstrap'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'

import 'bootstrap/dist/css/bootstrap.min.css'
import PageLimitDropdown from '../pagination/PageLimitDropdown'
import { useTranslation } from 'react-i18next'
import GroupButtons from "../restaurant-details/foodSection/GroupButtons";
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";

export default function Filter({ setPageLimit, page_limit, type, setType }) {
    const { t } = useTranslation()
    return (
        <Grid
            container
            item
            md={12}
            lg={12}
            xs={12}
            spacing={{ xs: 2, md: 3 }}
            sx={{ padding: '20px 0px' }}
            mt={{sx:'0px',md:"20px"}}


        >
            <Grid item xs={12} sm={12} md={12} align="center"  >
                <CustomStackFullWidth
                    alignItems="center"
                    justifyContent="center"
                >
                <GroupButtons type={type} setType={setType}/>

                <Typography
                    variant="h4"
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        textAlign: 'center',
                        paddingTop: '15px',
                    }}
                >
                    {t('We found')} <span style={{ color: '#EF7822' }}>25</span>{' '}
                    {t('food')}
                    {t('for you ')}
                </Typography>
                </CustomStackFullWidth>
            </Grid>
            {/*<Grid item md={4} xs={12}>*/}
            {/*    <Grid item container md={12} lg={12} xs={12}>*/}
            {/*        <PageLimitDropdown*/}
            {/*            page_limit={page_limit}*/}
            {/*            setPageLimit={setPageLimit}*/}
            {/*        />*/}
            {/*        <Grid*/}
            {/*            item*/}
            {/*            md={6}*/}
            {/*            xs={6}*/}
            {/*            sx={{ display: 'flex', justifyContent: 'end' }}*/}
            {/*        >*/}
            {/*            <Dropdown>*/}
            {/*                <Dropdown.Toggle*/}
            {/*                    style={{*/}
            {/*                        background: 'none',*/}
            {/*                        border: '1px solid #FFEBDD',*/}
            {/*                        color: '#4B566B',*/}
            {/*                    }}*/}
            {/*                    variant="success"*/}
            {/*                    id="dropdown-basic"*/}
            {/*                >*/}
            {/*                    <AddRoadOutlinedIcon /> {t('Sort by')}: Default*/}
            {/*                </Dropdown.Toggle>*/}

            {/*                <Dropdown.Menu>*/}
            {/*                    <Dropdown.Item href="#/action-1">*/}
            {/*                        Action*/}
            {/*                    </Dropdown.Item>*/}
            {/*                    <Dropdown.Item href="#/action-2">*/}
            {/*                        Another action*/}
            {/*                    </Dropdown.Item>*/}
            {/*                    <Dropdown.Item href="#/action-3">*/}
            {/*                        Something else*/}
            {/*                    </Dropdown.Item>*/}
            {/*                </Dropdown.Menu>*/}
            {/*            </Dropdown>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </Grid>
    )
}
