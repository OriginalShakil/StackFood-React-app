import React from 'react'
//import dashboardIcon from '../../../../assets/images/icons/dashboard-icon.png'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MapIcon from '@mui/icons-material/Map'
import CategoryIcon from '@mui/icons-material/Category'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import ReportIcon from '@mui/icons-material/Report'

export const getSections = (t) => [
    {
        title: t('Dashboard'),
        items: [
            {
                title: t('Dashboard'),
                path: '/admin/dashboard/',
                icon: <DashboardIcon fontSize="small" />,
            },
        ],
    },

    {
        title: t('SOME COMPONENTS'),
        items: [
            {
                title: t('Components'),
                path: '/admin/components/',
                icon: <CategoryIcon fontSize="small" />,
                children: [
                    {
                        title: t('Tables'),
                        path: '/admin/components/tables',
                    },
                    {
                        title: t('Alerts'),
                        path: '/admin/components/alerts',
                    },
                    {
                        title: t('Toasters'),
                        path: '/admin/components/toasters',
                    },
                    {
                        title: t('Dialogs'),
                        path: '/admin/components/dialogs',
                    },
                    {
                        title: t('Form with formik'),
                        path: '/admin/components/form-with-formik',
                    },
                    {
                        title: t('Charts'),
                        path: '/admin/components/charts',
                    },

                    {
                        title: t('Provider Details'),
                        path: '/admin/components/provider-details',
                    },
                    {
                        title: t('Multistep Form With Steppers'),
                        path: '/admin/components/multistep-form-with-steppers',
                    },
                ],
            },
        ],
    },

    {
        title: t('SERVICE MANAGEMENT'),
        items: [
            {
                title: t('Service Zones'),
                path: '/admin/service-zones/',
                icon: <MapIcon fontSize="small" />,
            },
            {
                title: t('Service Categories'),
                path: '/admin/service-categories/',
                icon: <CategoryIcon fontSize="small" />,
                children: [
                    {
                        title: t('Category Setup'),
                        path: '/admin/service-categories/category-setup',
                    },
                    {
                        title: t('Sub Category Setup'),
                        path: '/admin/service-categories/sub-category-setup',
                    },
                ],
            },
            {
                title: t('Services'),
                path: '/admin/services/',
                icon: <HomeRepairServiceIcon fontSize="small" />,
                children: [
                    {
                        title: t('Service List'),
                        path: '/admin/services/service-list',
                    },
                ],
            },
        ],
    },
    {
        title: t('ERROR PAGES'),
        items: [
            {
                title: t('404'),
                path: '/admin/404',
                icon: <ReportIcon fontSize="small" />,
            },
        ],
    },
]
