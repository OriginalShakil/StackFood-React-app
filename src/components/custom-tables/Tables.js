import React from 'react'
import { CustomTableWrapper } from './Tables.style'
import TableTypeOne from './TableTypeOne'
import TableTypeTwo from './TableTypeTwo'
import TableTypeThree from './TableTypeThree'

const Tables = (props) => {
    return (
        <>
            <TableTypeOne />
            <CustomTableWrapper>
                <TableTypeTwo />
            </CustomTableWrapper>
            <CustomTableWrapper>
                <TableTypeThree />
            </CustomTableWrapper>
        </>
    )
}

Tables.propTypes = {}

export default Tables
