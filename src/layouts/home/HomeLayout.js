import React, { Fragment, Suspense } from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
const Home = (props) => {
    return (
        <Fragment>
            <main>
                <Suspense fallback={<LinearProgress />}>
                    <Outlet />
                </Suspense>
            </main>
        </Fragment>
    )
}
Home.propTypes = {
    route: PropTypes.object,
}

export default Home
