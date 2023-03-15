import React, { useState } from 'react'
import { CustomChip } from '../../styled-components/CustomStyles.style'
import CustomSearch from '../custom-search/CustomSearch'
import { Button, useMediaQuery } from '@mui/material'
import CustomDownloadButton from '../custom-download-button/CustomDownloadButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTranslation } from 'react-i18next'
import CustomSideDrawer from '../side-drawer/CustomSideDrawer'
import SideDrawerFilter from '../../gurbage/admin/components/filter/SideDrawerFilter'
import {
    CustomIconButtonTable,
    CustomStackForTablesTop,
    CustomTypographyFilterForTablesTop,
    FlexContainerFilterWrapperTable,
    FlexContainerForTablesTop,
    TablesSearchWrapper,
} from './Tables.style'

const TableTop = (props) => {
    const [open, setOpen] = useState(false)
    const filterSideBarOpen = () => {
        setOpen(true)
    }
    const filterSideBarClose = () => {
        setOpen(false)
    }
    const { t } = useTranslation()
    const xsUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        noSsr: true,
    })
    return (
        <>
            <FlexContainerForTablesTop>
                <TablesSearchWrapper>
                    <CustomSearch />
                </TablesSearchWrapper>
                <CustomStackForTablesTop direction="row" spacing={xsUp ? 3 : 0}>
                    <CustomDownloadButton text={t('Download')} />
                    <FlexContainerFilterWrapperTable>
                        <Button
                            onClick={filterSideBarOpen}
                            variant="text"
                            startIcon={<FilterListIcon />}
                            endIcon={<CustomChip label="15" />}
                        >
                            <CustomTypographyFilterForTablesTop>
                                {t('Filter')}
                            </CustomTypographyFilterForTablesTop>
                        </Button>
                        <CustomIconButtonTable gray marginLeft size="medium">
                            <SettingsIcon fontSize="medium" />
                        </CustomIconButtonTable>
                    </FlexContainerFilterWrapperTable>
                </CustomStackForTablesTop>
            </FlexContainerForTablesTop>
            <CustomSideDrawer open={open} onClose={filterSideBarClose}>
                <SideDrawerFilter />
            </CustomSideDrawer>
        </>
    )
}

TableTop.propTypes = {}

export default TableTop
