import { Box } from '@mui/system';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Resturant from '../../../public/static/Resturantimage/Rectangle 8240.png'
import { Typography } from '@mui/material';

const AllShowresturant = () => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <img className='resturant__img' src={Resturant.src} alt="" />
            <Box>
                <Typography sx={{ fontSize: '18px', fontWeight: '500', lineHeight: '22px' }} >Chessy Resturant</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: '700', lineHeight: '16px', color: '#4B566B' }} >4.5 <StarIcon sx={{ width: '16px', color: 'orange' }} /></      Typography>
            </Box>
        </Box>
    );
};

export default AllShowresturant;