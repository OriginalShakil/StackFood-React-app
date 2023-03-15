import { styled } from '@mui/material/styles'
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Divider,
    Grid,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export const DeliveryTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.neutral[500],
    fontSize: '16px',
    fontWeight: '700',
    paddingBottom: '20px',
}))
export const DeliveryCaption = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '700',
    // color: '#414141',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#414141'}`,
    paddingTop: '20px',
    paddingBottom: '20px',
}))

export const PrefarableCaption = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '700',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#414141'}`,
    paddingTop: '30px',
    paddingBottom: '20px',

    [theme.breakpoints.up('xs')]: {
        textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
        textAlign: 'inherit',
    },
}))

export const SaveAddressBox = styled(Box)(() => ({
    padding: '1rem',
    textAlign: 'center',
}))

export const AddNewButton = styled(Button)(() => ({
    color: '#EF7822',
    fontSize: '14px',
    fontWeight: '700',
    background: 'rgba(239, 120, 34, 0.1)',
    borderRadious: '5px',
}))
export const DeliveryDetailsGrid = styled(Grid)(() => ({
    // background: '#FFFFFF',
    boxShadow: ' 0px 0px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px 5px 0px 0px',
    padding: '25px',
}))
export const CheckoutBox = styled(Card)(() => ({
    padding: '30px',
    // paddingBottom: '180px',
}))
export const StyledPaper = styled(Paper)(() => ({
    padding: '30px',
}))

export const OrderSummaryGrid = styled(Grid)(() => ({
    padding: '10px',
}))
export const PreferableTimeInput = styled(Autocomplete)(({theme}) => ({
    // border: '1px solid rgba(251, 222, 201)',
    borderRadius: '10px',
    '&.MuiAutocomplete-option': {
        backgroundColor: theme.palette.primary.main,
    }
}))
export const CouponGrid = styled(Grid)(() => ({
    // background: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px 5px 0px 0px',
    padding: '25px',
    alignItems: 'center',
    marginTop: '20px',
}))
export const CouponTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.neutral[1000],
    fontWeight: '700',
    fontSize: '16px',
    textAlign: 'center',
    [theme.breakpoints.up('xs')]: {
        textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
        textAlign: 'inherit',
    },
}))

export const CouponButton = styled(LoadingButton)(({ theme }) => ({
    // background: '#EF7822',
    // color: 'white',
    width: '100%',
    height: '37px',
    borderRadius: '5px',
    // [theme.breakpoints.up('xs')]: {
    //     width: '110px',
    //     height: '37px',
    // },
    // [theme.breakpoints.up('md')]: {
    //     width: '162px',
    // },
}))
export const InputField = styled(Paper)(() => ({
    border: '1px solid rgba(251, 222, 201)',
}))
export const PaymentOptionGrid = styled(Grid)(({ theme }) => ({
    // background: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px 5px 0px 0px',
    padding: '25px',
    margin: '20px 0',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
    [theme.breakpoints.up('xs')]: {
        textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
        textAlign: 'inherit',
    },
}))
export const PymentTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '700',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#414141'}`,
    paddingBottom: '16px',
}))
export const ButtonGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))
export const PaymentButton = styled(Button)(({ selected, theme }) => ({
    background: selected ? 'rgba(45, 200, 88, 0.1)' : '',
    height: '60px',
    borderRadius: '10px',
    gap: '5px',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
}))
// export const DigitalButton = styled(Button)(() => ({
//     background: 'rgba(45, 200, 88, 0.1)',
//     width: '185px',
//     height: '60px',
//     borderRadius: '10px',
//     gap: '5px',
//     color: 'black',
// }))
// export const WalletButton = styled(Button)(() => ({
//     width: '185px',
//     height: '60px',
//     borderRadius: '10px',
//     gap: '5px',
//     color: 'black',
// }))
export const ConditionTypography = styled(Typography)(() => ({
    color: '#9B9B9B',
    textAlign: 'center',
    fontSize: '16px',
    paddingTop: '15px',
    paddingBottom: '20px',
}))
export const PlaceOrderButton = styled(Button)(() => ({
    // background: '#EF7822',
    borderRadius: '5px',
    border: '1px solid rgba(239, 120, 34, 0.3)',
    // color: 'white',
    // width: '100%',
}))
export const OrderSummary = styled(Typography)(({ theme }) => ({
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#414141'}`,
    fontSize: '18px',
    fontWeight: '700',
    paddingBottom: '25px',
    textTransform: 'capitalize',
    marginLeft: 'auto',
    marginRight: 'auto',
}))
export const OrderFoodName = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: `${theme.palette.mode === 'dark' ? '#fff' : '#414141'}`,
}))
export const OrderFoodSubtitle = styled(Typography)(
    ({ theme, orderdetailscolor }) => ({
        fontSize: orderdetailscolor === 'true' ? '14px' : '12px',
        color:
            orderdetailscolor === 'true'
                ? theme.palette.neutral[1000]
                : theme.palette.neutral[500],
    })
)
export const OrderFoodAmount = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: '600',
}))
export const CalculationGrid = styled(Grid)(() => ({
    fontSize: '14px',
}))
export const TotalGrid = styled(Grid)(() => ({
    color: '#EF7822',
    fontSize: '16px',
    fontWeight: '600',
    padding: '0px',
}))
