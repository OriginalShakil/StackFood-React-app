import { useSelector } from 'react-redux'
import moment from 'moment'

const CustomFormatedTime = ({ date }) => {
    const { global } = useSelector((state) => state.globalSettings)
    let timeFormat = global?.timeformat
    if (timeFormat === '12') {
        return moment(date).format('hh:mm a')
    } else {
        return moment(date).format('HH:mm')
    }
}

export default CustomFormatedTime
