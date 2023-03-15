import React, { useMemo } from 'react'
import { CustomIconButton } from '../../../../../styled-components/CustomButtons.style'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'react-i18next'
import AdminDetails from './admin-details/AdminDetails'
import { getSections } from './SectionsData'
import { DashboardSidebarSection } from './DashboardSidebarSection'
import { useLocation } from 'react-router'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTheme } from '@mui/material/styles'
import DashboardNavbarLogo from '../../../DashboardNavbarLogo'
import {
    CustomFlexContainer,
    CustomIconButtonForDashboardSidebarContent,
    CustomScrollbarForDashboardSidebarContent,
    CustomSectionWrapper,
    CustomStackForDashboardSidebarContent,
} from './DashboardSidebar.style'

const DashboardSidebarContent = (props) => {
    const { open, onOpen, onClose, hover, alwaysOpen } = props
    const theme = useTheme()
    const { pathname } = useLocation()
    //const router = useParams()
    const { t } = useTranslation()
    const admindetails = {
        email: 'Admin@admin.com',
        type: 'admin',
    }
    const sections = useMemo(() => getSections(t), [t])
    return (
        <>
            <CustomScrollbarForDashboardSidebarContent>
                <CustomStackForDashboardSidebarContent
                    onMouseEnter={hover && onOpen}
                    onMouseLeave={hover && onClose}
                    height="100%"
                >
                    <CustomFlexContainer>
                        {open ? (
                            <CustomFlexContainer noPaddingY>
                                <DashboardNavbarLogo />
                                {hover ? (
                                    <CustomIconButton
                                        onClick={alwaysOpen}
                                        edge="start"
                                    >
                                        <ChevronRightIcon />
                                    </CustomIconButton>
                                ) : (
                                    <CustomIconButton
                                        onClick={onClose}
                                        edge="start"
                                    >
                                        <ChevronLeftIcon />
                                    </CustomIconButton>
                                )}
                            </CustomFlexContainer>
                        ) : (
                            <CustomIconButtonForDashboardSidebarContent
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                open={open}
                                onClick={onOpen}
                                edge="start"
                            >
                                <MenuIcon />
                            </CustomIconButtonForDashboardSidebarContent>
                        )}
                    </CustomFlexContainer>
                    <AdminDetails data={admindetails} open={open} />
                    <CustomSectionWrapper>
                        {sections.map((section) => (
                            <DashboardSidebarSection
                                open={open}
                                key={section.title}
                                path={pathname}
                                {...section}
                            />
                        ))}
                    </CustomSectionWrapper>
                </CustomStackForDashboardSidebarContent>
            </CustomScrollbarForDashboardSidebarContent>
        </>
    )
}

export default DashboardSidebarContent
