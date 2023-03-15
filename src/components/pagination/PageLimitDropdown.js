import React from 'react'
import { Grid } from '@mui/material'
import { Dropdown } from 'react-bootstrap'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

export default function PageLimitDropdown({ page_limit, setPageLimit }) {
    const { t } = useTranslation()
    return (
        <Grid item md={6} xs={6} justifySelf="end">
            <Dropdown>
                <Dropdown.Toggle
                    style={{
                        background: 'none',
                        border: '1px solid #FFEBDD',
                        color: '#4B566B',
                    }}
                    variant="success"
                    id="dropdown-basic"
                >
                    <GridViewOutlinedIcon /> {t('Sort Grid')}: {page_limit}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setPageLimit(10)}>
                        10
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPageLimit(20)}>
                        20
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPageLimit(30)}>
                        30
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Grid>
    )
}
