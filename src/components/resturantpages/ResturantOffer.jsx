import {
    Box,
    Grid,
    IconButton,
    Typography,
    styled,
    Button,
    Link,
    Modal,
} from '@mui/material'
import React from 'react'
import ResturantOfferImg from '../../../public/static/resturantpages/image 3.png'
import OfferAdImg from '../../../public/static/resturantpages/offerimg.PNG'
import ResturantLogo from '../../../public/static/resturantpages/Rectangle 8234.png'
import StarIcon from '@mui/icons-material/Star'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import cartImg from '../../../public/static/resturantpages/Group 34390.png'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Dropdown } from 'react-bootstrap'
import FilterListIcon from '@mui/icons-material/FilterList'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import cardImg from '../../../public/static/featurecatagori/Rectangle 8222.png'
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardImg from '../../../public/static/featurecatagori/Rectangle 8223.png'
import CardImg2 from '../../../public/static/featurecatagori/Rectangle 8223.png'
import CardImg3 from '../../../public/static/featurecatagori/Rectangle 8221.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { ModalBox } from './Resturant.style'
import { useTranslation } from 'react-i18next'

const ResturantOffer = () => {
    const { t } = useTranslation()
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    })

    const handleChangeCheck = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        })
    }

    const { gilad, jason, antoine } = state
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [alignment, setAlignment] = React.useState('web')

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    const orangeColor = '#EF7822'
    const orangeColor2 = '#ff903f'
    const PrimaryButton = styled(Button)(({ theme }) => ({
        color: '#fff',
        backgroundColor: orangeColor,
        '&:hover': {
            backgroundColor: orangeColor2,
        },
    }))
    return (
        <Box sx={{ paddingTop: '20px' }}>
            <Grid container item lg={12} spacing={{ xs: 1 }}>
                <Grid item xs={12} lg={6} md={6} className="Resturent__offer">
                    <img src={ResturantOfferImg.src} alt="" />
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                    <Box
                        className="cart__resturant"
                        sx={{
                            display: { xs: 'none', md: 'inline' },
                            flexGrow: 1,
                        }}
                    >
                        <img src={cartImg.src} alt="" />
                    </Box>
                    <Grid
                        container
                        item
                        md={12}
                        xs={12}
                        spacing={{ xs: 1, lg: 1 }}
                    >
                        <Grid className="Resturent__offer" item xs={3} md={1.8}>
                            <img src={ResturantLogo.src} alt="" />
                        </Grid>
                        <Grid item xs={9} md={10.2}>
                            <Box sx={{ lineHeight: '0px' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        aliginItems: 'center',
                                        height: '22px',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ fontSize: '16px' }}
                                    >
                                        The Capital Grill
                                    </Typography>
                                    <IconButton className="loc__button">
                                        <AddLocationIcon
                                            sx={{
                                                color: '#EF7822',
                                                display: {
                                                    xs: 'inline',
                                                    md: 'none',
                                                },
                                                flexGrow: 1,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                                <Typography>
                                    4.5{' '}
                                    <StarIcon
                                        sx={{ width: '16px', color: 'orange' }}
                                    />
                                </Typography>{' '}
                                <br />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItem: 'baseline',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            color: '#9B9B9B',
                                        }}
                                    >
                                        Adress: house:00,Road:00,Streed:00, Test
                                        city
                                    </Typography>
                                    <IconButton className="loc__button">
                                        <AddLocationIcon
                                            sx={{
                                                color: '#EF7822',
                                                display: {
                                                    xs: 'none',
                                                    md: 'inline',
                                                },
                                                flexGrow: 1,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Grid item xs={4} md={3}>
                            <Typography className="info__value">44</Typography>
                            <Typography sx={{ fontSize: '12px' }}>
                                Ratings
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <Typography className="info__value">
                                30-60{' '}
                                <span style={{ fontSize: '12px' }}>min</span>
                            </Typography>
                            <Typography sx={{ fontSize: '12px' }}>
                                {' '}
                                <AccessTimeIcon
                                    sx={{ fontSize: '12px' }}
                                />{' '}
                                Delivery Time
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <Typography className="info__value">
                                $ 10
                            </Typography>
                            <Typography sx={{ fontSize: '12px' }}>
                                Minimum Order Value
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={3}
                            sx={{
                                display: { xs: 'none', md: 'inline' },
                                flexGrow: 1,
                            }}
                        >
                            <PrimaryButton
                                onClick={handleOpen}
                                aria-label="add to"
                                sx={{
                                    flex: '1 0',
                                    display: 'block',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography className="fav__icon">
                                    <FavoriteBorderIcon />
                                </Typography>
                                <Typography sx={{ fontSize: '12px' }}>
                                    {' '}
                                    Add to Favorite
                                </Typography>
                            </PrimaryButton>

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <ModalBox>
                                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography> */}
                                    <Grid container spacing={2}>
                                        <Grid item md={4.5} xs={3.5}>
                                            <img
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: '10px',
                                                }}
                                                src={cardImg.src}
                                                alt=""
                                            />
                                            <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    color: ' #9B9B9B',
                                                    display: {
                                                        xs: 'none',
                                                        md: 'inline',
                                                    },
                                                }}
                                            >
                                                Start from{' '}
                                                <span
                                                    style={{
                                                        color: 'red',
                                                        textDecorationLine:
                                                            'line-through',
                                                    }}
                                                >
                                                    {' '}
                                                    $ 40.00
                                                </span>{' '}
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        color: 'black',
                                                    }}
                                                >
                                                    {' '}
                                                    $34.00
                                                </span>{' '}
                                            </Typography>

                                            <PrimaryButton
                                                aria-label="add to"
                                                sx={{
                                                    borderRadius: '10px',
                                                    display: {
                                                        xs: 'none',
                                                        md: 'inline',
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        flex: '1 0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontSize: '12px',
                                                    }}
                                                    className="fav__icon"
                                                >
                                                    <FavoriteBorderIcon
                                                        sx={{
                                                            fontSize: '14px',
                                                        }}
                                                    />{' '}
                                                    Add to Favorite
                                                </Typography>
                                            </PrimaryButton>
                                        </Grid>
                                        <Grid item md={7.5} xs={8.5}>
                                            <Typography variant="h5">
                                                Japanees style plain rice
                                                without oil but with cheese
                                            </Typography>
                                            <Typography variant="caption">
                                                Hungry pupets
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '2px',
                                                }}
                                            >
                                                4.5{' '}
                                                <StarIcon
                                                    sx={{
                                                        fontSize: '16px',
                                                        color: '#FE961C',
                                                    }}
                                                />
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontSize: '16px',
                                                    padding: '10px 0px 3px 0px',
                                                    display: {
                                                        xs: 'none',
                                                        md: 'inline',
                                                    },
                                                }}
                                            >
                                                Description
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#9B9B9B',
                                                    display: {
                                                        xs: 'none',
                                                        md: 'inline',
                                                    },
                                                }}
                                            >
                                                Get 1 pc hot crispy, 1 rizo rice
                                                with gravy 1 pepsi. This is the
                                                gravy-yard shift! Rice layered
                                                with spicy, exotic gravy topped
                                                off with crispy popcorn chicken
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    color: ' #9B9B9B',
                                                    display: {
                                                        xs: 'inline',
                                                        md: 'none',
                                                    },
                                                }}
                                            >
                                                Start from{' '}
                                                <span
                                                    style={{
                                                        color: 'red',
                                                        textDecorationLine:
                                                            'line-through',
                                                    }}
                                                >
                                                    {' '}
                                                    $ 40.00
                                                </span>{' '}
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        color: 'black',
                                                    }}
                                                >
                                                    {' '}
                                                    $34.00
                                                </span>{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12} xs={12}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontSize: '16px',
                                                    padding: '10px 0px 3px 0px',
                                                    display: {
                                                        xs: 'inline',
                                                        md: 'none',
                                                    },
                                                }}
                                            >
                                                Description
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#9B9B9B',
                                                    display: {
                                                        xs: 'inline',
                                                        md: 'none',
                                                    },
                                                }}
                                            >
                                                Get 1 pc hot crispy, 1 rizo rice
                                                with gravy 1 pepsi. This is the
                                                gravy-yard shift! Rice layered
                                                with spicy, exotic gravy topped
                                                off with crispy popcorn chicken
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            Select Variations
                                        </Typography>
                                        <Box>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">
                                                    Size:{' '}
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControlLabel
                                                        value="1:2"
                                                        control={<Radio />}
                                                        label="1:2"
                                                    />
                                                    <FormControlLabel
                                                        value="1:3"
                                                        control={<Radio />}
                                                        label="1:3"
                                                    />
                                                    <FormControlLabel
                                                        value="1:4"
                                                        control={<Radio />}
                                                        label="1:4"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">
                                                    Spicy Level:{' '}
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControlLabel
                                                        value="Normal"
                                                        control={<Radio />}
                                                        label="Normal"
                                                    />
                                                    <FormControlLabel
                                                        value="Extra-Spicy"
                                                        control={<Radio />}
                                                        label="Extra-Spicy"
                                                    />
                                                    <FormControlLabel
                                                        value="Naga"
                                                        control={<Radio />}
                                                        label="Naga"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">
                                                    Sticky Level:{' '}
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControlLabel
                                                        value="Normal Sticky"
                                                        control={<Radio />}
                                                        label="Normal Sticky"
                                                    />
                                                    <FormControlLabel
                                                        value="Partial Sticky"
                                                        control={<Radio />}
                                                        label="Partial Sticky"
                                                    />
                                                    <FormControlLabel
                                                        value="Fully Sticky"
                                                        control={<Radio />}
                                                        label="Fully Sticky"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <FormControl
                                                sx={{ m: 3 }}
                                                component="fieldset"
                                                variant="standard"
                                            >
                                                <FormLabel component="legend">
                                                    Add Ons{' '}
                                                    <span>(optional)</span>
                                                </FormLabel>
                                                <RadioGroup>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        gilad
                                                                    }
                                                                    onChange={
                                                                        handleChangeCheck
                                                                    }
                                                                    name="gilad"
                                                                />
                                                            }
                                                            label="15ml watet (1 bottle)"
                                                        />
                                                        <Typography>
                                                            14
                                                        </Typography>
                                                    </Box>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={jason}
                                                                onChange={
                                                                    handleChangeCheck
                                                                }
                                                                name="jason"
                                                            />
                                                        }
                                                        label="Half boiled egg (1pcs)"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    antoine
                                                                }
                                                                onChange={
                                                                    handleChangeCheck
                                                                }
                                                                name="antoine"
                                                            />
                                                        }
                                                        label="Spring Onion (4pcs)"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>

                                        <Box sx={{ paddingTop: '27px' }}>
                                            <Dropdown
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Dropdown.Toggle
                                                    style={{
                                                        background: 'none',
                                                        color: 'black',
                                                        border: 'none',
                                                    }}
                                                    variant="success"
                                                    id="dropdown-basic"
                                                >
                                                    See more(3)
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">
                                                        See more(1)
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">
                                                        See more(2)
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">
                                                        See more(3)
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Box>
                                        <Box sx={{ paddingTop: '40px' }}>
                                            <Grid
                                                container
                                                spacing={2}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Grid item md={6}>
                                                    <Typography variant="h4">
                                                        Total Amount:{' '}
                                                        <span> $ 42.00</span>{' '}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <PrimaryButton
                                                        sx={{
                                                            width: '100%',
                                                            borderRadius:
                                                                '10px',
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </PrimaryButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </ModalBox>
                            </Modal>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <img src={OfferAdImg.src} alt="" />
                </Grid>
            </Grid>

            <Box sx={{ paddingTop: '30px' }}>
                <Grid container item lg={7} spacing={{ xs: 2, md: 2 }}>
                    <Grid item xs={12} lg={7}>
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                flexWrap: 'nowrap',
                                border: '1px solid rgba(239, 120, 34, 0.3)',
                                borderRadius: '10px',
                                padding: '8px 0px 8px 5px',

                                // justifyContent: 'center',
                                typography: 'body1',
                                '& > :not(style) + :not(style)': {
                                    ml: 2,
                                },
                            }}
                        >
                            <Link
                                sx={{
                                    color: 'White',
                                    background: '#EF7822',
                                    borderRadius: '10px',
                                    padding: '2px 10px 2px 10px',
                                    textAlign: 'center',
                                }}
                                href="#"
                                underline="none"
                            >
                                All
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Burger
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Pizza
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Asian
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Pasta
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Noodles
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Maxican-pasta
                            </Link>
                            <Link
                                sx={{ color: 'black' }}
                                href="#"
                                underline="none"
                            >
                                Japanees
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item lg={5} xs={12}>
                        <Grid container xs={12} md={12}>
                            <Grid md={6} xs={6}>
                                <Box>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{
                                                background: 'none',
                                                padding: '10px',
                                                color: 'black',
                                                border: '1px solid rgba(239, 120, 34, 0.3)',
                                                borderRadius: '10px',
                                            }}
                                            variant="success"
                                            id="dropdown-basic"
                                        >
                                            <FilterListIcon /> Filter by: All
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                                Action
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">
                                                Another action
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                Something else
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Box>
                            </Grid>
                            <Grid
                                md={6}
                                xs={6}
                                sx={{ display: 'flex', justifyContent: 'end' }}
                            >
                                <Box>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{
                                                background: 'none',
                                                padding: '10px',
                                                color: 'black',
                                                border: '1px solid rgba(239, 120, 34, 0.3)',
                                                borderRadius: '10px',
                                            }}
                                            variant="success"
                                            id="dropdown-basic"
                                        >
                                            <FilterListIcon /> Filter by: All
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                                Action
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">
                                                Another action
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                Something else
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '30px',
                }}
            >
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton className="tggle__btn" value="web">
                        {' '}
                        {t('Veg')}
                    </ToggleButton>
                    <ToggleButton className="tggle__btn2" value="android">
                        {' '}
                        {t('Non-Veg')}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ paddingTop: '30px' }}>
                <Typography
                    sx={{
                        paddingBottom: '30px',
                        textAlign: 'center',
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    We found 25 food for you
                </Typography>
                <Grid container item lg={12} md={12} spacing={2}>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg2.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg3.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg2.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                        <Card sx={{ maxWidth: 250, maxHeight: 400 }}>
                            <Typography className="offer__tag">
                                30% OFF
                            </Typography>

                            <CardMedia
                                component="img"
                                alt="green iguana"
                                maxHeight="250"
                                image={CardImg.src}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    padding: '10px 8px',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                >
                                    Salmon avogada sushi with chees
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Hungry pupptes
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    4.5{' '}
                                    <StarIcon
                                        sx={{
                                            fontSize: '14px',
                                            color: 'orange',
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    padding: '0px 0px 0px 0px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '17px', fontWeight: '400' }}
                                >
                                    {' '}
                                    <span
                                        style={{
                                            color: 'red',
                                            textDecorationLine: 'line-through',
                                            fontSize: '12px',
                                        }}
                                    >
                                        $ 14.00
                                    </span>{' '}
                                    $ 34.00
                                </Typography>
                                <Button size="small" className="card__btn">
                                    <ArrowForwardIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '30px 0px 70px 0px',
                }}
            >
                <Stack spacing={2}>
                    <Pagination count={10} />
                </Stack>
            </Box>
        </Box>
    )
}

export default ResturantOffer
