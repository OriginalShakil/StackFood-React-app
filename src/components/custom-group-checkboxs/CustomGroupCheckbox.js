import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import { useSelector } from 'react-redux'
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {CustomTypographyLabel} from "../../styled-components/CustomTypographies.style";
import {Skeleton, Stack} from "@mui/material";

const CustomGroupCheckbox = (props) => {
    const { checkboxState, handleChangeFilter,forcuisine,checkboxData,isLoading } = props
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [state, setState] = React.useState(filterData.filterBy)
    const [cuisineState,setCuisineState]=React.useState(filterData.filterByCuisine)
    const [checkAddOne, setCheckAddOn] = useState(false)
    const handleChange = (event) => {

        setState({
            ...state,
            [event.target.name]: event.target.checked,
        })
        handleChangeFilter(event)
    }
    const handleChangeCuisine = (event) => {
        if(event.target.checked){
            setCuisineState(
                [...cuisineState ,event.target.value]
            )
        }else {
            let filter = cuisineState.filter((item) => item !== event.target.value)
            setCuisineState(
                filter)
        }
        handleChangeFilter(event)
    }

    return (
        <div>
            {forcuisine==="true" ? (
                <FormGroup >
                        {checkboxData?.map((item)=>{
                            return(
                                <FormControlLabel
                                    key={item?.id}
                                    value={item?.name}
                                    control={
                                        <Checkbox
                                            onChange={handleChangeCuisine}
                                        />
                                    }
                                    label={
                                        <CustomTypographyLabel>
                                            {item?.name}
                                        </CustomTypographyLabel>
                                    }
                                />
                            )
                        })}
                    {isLoading && (
                       <>
                          <Stack spacing={1}>
                              <Skeleton variant="rectangular" width={100} height={20}/>
                              <Skeleton variant="rectangular" width={100} height={20}/>
                              <Skeleton variant="rectangular" width={100} height={20}/>
                              <Skeleton variant="rectangular" width={100} height={20}/>
                          </Stack>
                       </>
                    )}

                </FormGroup>
            ):( <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.veg}
                                onChange={handleChange}
                                name="veg"
                            />
                        }
                        label="Veg"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.nonVeg}
                                onChange={handleChange}
                                name="nonVeg"
                            />
                        }
                        label="Non-Veg"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.currentAvailableFoods}
                                onChange={handleChange}
                                name="currentAvailableFoods"
                            />
                        }
                        label="Currently Available Foods"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.discountedFoods}
                                onChange={handleChange}
                                name="discountedFoods"
                            />
                        }
                        label="Discounted Foods"
                    />
                </FormGroup>
            </FormControl>)}
        </div>
    )
}

CustomGroupCheckbox.propTypes = {}

export default CustomGroupCheckbox
