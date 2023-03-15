import React from 'react'
import ZoneTable from './ZoneTable'
import Box from '@mui/material/Box'
import TableTop from './TableTop'
import { CustomCardForTables } from './Tables.style'

const TableTypeOne = (props) => {
    return (
        <Box>
            <CustomCardForTables>
                <TableTop />
                <ZoneTable />
            </CustomCardForTables>
        </Box>
    )
}

TableTypeOne.propTypes = {}

export default TableTypeOne
