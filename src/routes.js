import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomeLayout from './layouts/home/HomeLayout'
import AuthLayout from './layouts/auth/AuthLayout'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import ServiceCategoriesChildOne from './gurbage/admin/service-categories/ServiceCategoriesChildOne'
import ServiceCategoriesChildTwo from './gurbage/admin/service-categories/ServiceCategoriesChildTwo'
import ServicesChildOne from './gurbage/admin/services/ServicesChildOne'
import CustomTables from './gurbage/admin/components/CustomTables'
import CustomAlerts from './gurbage/admin/components/CustomAlerts'
import CustomToasters from './gurbage/admin/components/CustomToasters'
import CustomDialogs from './gurbage/admin/components/dialogs/CustomDialogs'
import FormWithFormik from './gurbage/admin/components/forms/FormWithFormik'
import Charts from './gurbage/admin/components/charts/Charts'
import ProviderDetails from './gurbage/admin/components/provider-details/ProviderDetails'
import MultistepFormWithSteppers from './gurbage/admin/components/multistep-form-with-steppers/MultistepFormWithSteppers'
import NotFound from './gurbage/error/NotFound'
import ServiceZones from './gurbage/admin/ServiceZones'


const HomePage = React.lazy(() => import('./gurbage/home/HomePage'))
const SignIn = React.lazy(() => import('./gurbage/auth/SignIn'))
const SignUp = React.lazy(() => import('./gurbage/auth/SignUp'))
const Dashboard = React.lazy(() => import('./gurbage/admin/Dashboard'))
const Other = React.lazy(() => import('./gurbage/admin/Other'))

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" exact={true} element={<HomeLayout />}>
                    <Route path="" index element={<HomePage />} />
                </Route>
            </Routes>

            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                </Route>
            </Routes>
            <Routes>
                <Route path="/admin" element={<DashboardLayout />}>
                    <Route path="" element={<Navigate to="dashboard" />} />

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route
                        path="components/tables"
                        element={<CustomTables />}
                    />
                    <Route
                        path="components/alerts"
                        element={<CustomAlerts />}
                    />
                    <Route
                        path="components/toasters"
                        element={<CustomToasters />}
                    />
                    <Route
                        path="components/dialogs"
                        element={<CustomDialogs />}
                    />
                    <Route
                        path="components/form-with-formik"
                        element={<FormWithFormik />}
                    />
                    <Route path="components/charts" element={<Charts />} />
                    <Route
                        path="components/provider-details"
                        element={<ProviderDetails />}
                    />
                    <Route
                        path="components/multistep-form-with-steppers"
                        element={<MultistepFormWithSteppers />}
                    />
                    <Route
                        path="/admin/service-zones/"
                        element={<ServiceZones />}
                    />
                    <Route
                        path="service-categories/category-setup/"
                        element={<ServiceCategoriesChildOne />}
                    />
                    <Route
                        path="service-categories/sub-category-setup"
                        element={<ServiceCategoriesChildTwo />}
                    />
                    <Route
                        path="services/service-list"
                        element={<ServicesChildOne />}
                    />
                    <Route path="dashboard" element={<Other />} />
                </Route>
                <Route path="/admin/*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default AllRoutes
