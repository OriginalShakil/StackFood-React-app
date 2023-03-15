import { useSelector } from 'react-redux'
import NotFound from '../error/NotFound'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const WithAuth = (Component) => {
    return (props) => {
        //const { token } = useSelector((state) => state.globalSettings)
        // let token = localStorage.getItem('token')

        // let token = undefined

        if (typeof window !== 'undefined') {
            const Router = useRouter()
            const zoneid = localStorage.getItem('zoneid')
            if (!zoneid) {
                return <NotFound />
            }
            return <Component {...props} />
        }

        // Login data added to props via redux-store (or use react context for example)
        // const { isLoggedIn } = props

        //  const isLoggedIn = false
        // If user is not logged in, return login component
        // if (!token) {
        //     return <NotFound />
        // }

        // If user is logged in, return original component
    }

    // Copy getInitial props so it will run as well
    // if (Component.getInitialProps) {
    //     Auth.getInitialProps = Component.getInitialProps
    // }

    return null
}

export default WithAuth
