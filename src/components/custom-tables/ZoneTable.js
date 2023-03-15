import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Scrollbar } from '../Scrollbar'
import {
    Checkbox,
    Stack,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
} from '@mui/material'
import {
    CustomBoxForBulkActions,
    CustomEditIconButton,
    CustomIconButtonTable,
    CustomTable,
    CustomTableHead,
    CustomTypography,
} from './Tables.style'
import { TablesData } from './TablesData'
import CustomSwitch from '../custom-switch/CustomSwitch'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useTranslation } from 'react-i18next'

const ZoneTable = (props) => {
    const { t } = useTranslation()
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [selectedZone, setSelectedZone] = useState([])
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    useEffect(
        () => {
            if (selectedZone.length) {
                setSelectedZone([])
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [TablesData]
    )
    const handleSelectAllZone = (event) => {
        setSelectedZone(
            event.target.checked
                ? TablesData.map((customer) => customer.id)
                : []
        )
    }
    const handleSelectOneCustomer = (event, customerId) => {
        if (!selectedZone.includes(customerId)) {
            setSelectedZone((prevSelected) => [...prevSelected, customerId])
        } else {
            setSelectedZone((prevSelected) =>
                prevSelected.filter((id) => id !== customerId)
            )
        }
    }
    const enableBulkActions = selectedZone.length > 0
    const selectedSomeZone =
        selectedZone.length > 0 && selectedZone.length < TablesData.length
    const selectedAllZone = selectedZone.length === TablesData.length

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    return (
        <Box>
            <CustomBoxForBulkActions enableBulkActions={enableBulkActions}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                >
                    <Stack alignItems="center" direction="row" spacing={4}>
                        <Checkbox
                            checked={selectedAllZone}
                            indeterminate={selectedSomeZone}
                            onChange={handleSelectAllZone}
                        />
                        <CustomTypography variant="h5">
                            {selectedZone.length} {t('items selected')}
                        </CustomTypography>
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={1}>
                        <CustomSwitch />
                        <CustomIconButtonTable>
                            <DeleteIcon />
                        </CustomIconButtonTable>
                    </Stack>
                </Stack>
            </CustomBoxForBulkActions>

            <Scrollbar>
                <CustomTable>
                    <CustomTableHead enableBulkActions={enableBulkActions}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAllZone}
                                    indeterminate={selectedSomeZone}
                                    onChange={handleSelectAllZone}
                                />
                            </TableCell>
                            <TableCell>
                                <CustomTypography variant="h5">
                                    {t('Zone Name')}
                                </CustomTypography>
                            </TableCell>
                            <TableCell align="center">
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <ArrowUpwardIcon fontSize="small" />
                                    <CustomTypography variant="h5">
                                        {t('Providers')}
                                    </CustomTypography>
                                </Stack>
                            </TableCell>
                            <TableCell align="center">
                                <CustomTypography variant="h5">
                                    {t('Services')}
                                </CustomTypography>
                            </TableCell>
                            <TableCell align="center">
                                <CustomTypography variant="h5">
                                    {t('Status')}
                                </CustomTypography>
                            </TableCell>
                            <TableCell align="center">
                                <CustomTypography variant="h5">
                                    {t('Action')}
                                </CustomTypography>
                            </TableCell>
                        </TableRow>
                    </CustomTableHead>
                    <TableBody>
                        {TablesData.map((zone) => {
                            const isZoneSelected = selectedZone.includes(
                                zone.id
                            )
                            return (
                                <TableRow
                                    hover
                                    key={zone.id}
                                    selected={isZoneSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isZoneSelected}
                                            onChange={(event) =>
                                                handleSelectOneCustomer(
                                                    event,
                                                    zone.id
                                                )
                                            }
                                            value={isZoneSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CustomTypography
                                            fontWeight
                                            variant="h5"
                                        >
                                            {zone.zone_name}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <CustomTypography
                                            fontWeight
                                            variant="h5"
                                        >
                                            {zone.providers}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <CustomTypography
                                            fontWeight
                                            variant="h5"
                                        >
                                            {zone.services}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <CustomSwitch />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <CustomEditIconButton>
                                                <EditIcon />
                                            </CustomEditIconButton>
                                            <CustomIconButtonTable>
                                                <DeleteIcon />
                                            </CustomIconButtonTable>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </CustomTable>
            </Scrollbar>
            <TablePagination
                labelRowsPerPage={t('Rows Per Page')}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={TablesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

ZoneTable.propTypes = {}

export default ZoneTable
