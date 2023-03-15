import React, { Fragment, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Grid, LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AuthLayoutWrapper, CustomBoxForAuthLayout } from './AuthLayout.style'

const Auth = (props) => {
    const { route } = props
    return (
        <Fragment>
            <main>
                <Suspense fallback={<LinearProgress />}>
                    <AuthLayoutWrapper>
                        <CustomBoxForAuthLayout>
                            <Grid container>
                                <Grid item md={12}>
                                    <Outlet />
                                </Grid>
                            </Grid>
                        </CustomBoxForAuthLayout>
                    </AuthLayoutWrapper>
                </Suspense>
            </main>
        </Fragment>
    )
}

Auth.propTypes = {
    route: PropTypes.object,
}

export default Auth
