import React, { Fragment, Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import DashboardNavbar from './DashboardNavbar'
import { OutletWrapper } from '../../styled-components/CustomStyles.style'
import DashboardSidebar from './DashboardSidebar'
import { useSelector } from 'react-redux'

const DashboardLayout = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { iconicSidebar } = useSelector((state) => state.layout)
    return (
        <Fragment>
            <main>
                <Suspense fallback={<LinearProgress />}>
                    <DashboardNavbar
                        onOpenSidebar={() => setIsSidebarOpen(true)}
                    />
                    <DashboardSidebar
                        onClose={() => setIsSidebarOpen(false)}
                        open={isSidebarOpen}
                    />
                    <OutletWrapper maxWidth="xl" iconicSidebar={iconicSidebar}>
                        <Outlet />
                    </OutletWrapper>
                </Suspense>
            </main>
        </Fragment>
    )
}

DashboardLayout.propTypes = {
    route: PropTypes.object,
}

export default DashboardLayout
