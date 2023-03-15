import Router, { useRouter } from 'next/router'
import NotFound from '../error/NotFound'
import { useSelector } from 'react-redux'

const PolicyGuard = () => {
    const { global} = useSelector((state) => state.globalSettings)
   if(global?.refund_policy_status !== 0){
       Router.push('/refund-policy')
   }else {
       Router.push("/home")
   }
    return <>{children}</>

}

export default PolicyGuard