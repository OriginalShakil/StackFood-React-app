import React from 'react'
import Sidebar from '../../../src/components/sidebar/Sidebar'
import DashboardSidebarContent from './components/navbar/dashboard-sidebar-content/DashboardSidebarContent'

const DashboardSidebar = (props) => {
    return (
        <Sidebar content={<DashboardSidebarContent {...props} />} {...props} />
    )
}

DashboardSidebar.propTypes = {}

export default DashboardSidebar
