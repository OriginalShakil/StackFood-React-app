// import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { CustomBoxFullWidth } from '../../styled-components/CustomStyles.style'

const Dashboard = () => {
    const { t } = useTranslation()
    return (
        <CustomBoxFullWidth>
            {/* <Helmet> */}
            <title>{t('Dashboard')}</title>
            {/* </Helmet> */}
            <p>{t('Dashboard')}</p>
        </CustomBoxFullWidth>
    )
}

export default Dashboard
