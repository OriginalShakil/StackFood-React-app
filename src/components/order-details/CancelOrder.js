import React, {useState} from 'react';
import {WrapperForCustomDialogConfirm} from "../custom-dialog/confirm/CustomDialogConfirm.style";
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {t} from "i18next";
import DialogContent from "@mui/material/DialogContent";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import DialogActions from "@mui/material/DialogActions";
import {Button, Stack} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {CustomButtonCancel} from "../../styled-components/CustomButtons.style";


const CancelOrder = ({cancelReason,
                         setCancelReason,cancelReasonsData,setModalOpen,handleOnSuccess}) => {
    const [value,setValue]=useState()
    const handleChange=(event)=>{
        setCancelReason(event.target.value)
    }
    const onClose=()=>{
        setModalOpen(false)
    }

    return (
        <WrapperForCustomDialogConfirm>
            <CustomStackFullWidth  spacing={1}>
                <DialogTitle id="alert-dialog-title" sx={{padding:"10px 24px"}}>
                    <Typography textAlign="center" variant="h3">{t("What’s Wrong With This Order? ")}</Typography>
                </DialogTitle>
                <DialogContent sx={{padding:"10px 24px"}}>
                    <CustomStackFullWidth>
                        <FormControl component="fieldset">
                            <Typography fontWeight="600" variant="h4" paddingY=".5rem">{t("Cancel Reason")}</Typography>
                        <RadioGroup aria-label="gender" name="gender1" value={cancelReason} onChange={handleChange}>
                            {cancelReasonsData && cancelReasonsData?.reasons?.length >0 &&
                                cancelReasonsData?.reasons?.map((reason)=>{
                                    return(<FormControlLabel key={reason?.id} value={reason.reason} checked={(reason.reason == cancelReason)? cancelReason:false} editable={true} control={<Radio />} label={reason.reason} />)
                                })
                            }

                        </RadioGroup>
                    </FormControl>
                    </CustomStackFullWidth>
                </DialogContent>

                    <DialogActions sx={{paddingX:"20px"}}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                            spacing={2}
                        >


                            <Button
                                variant="contained"
                                onClick={onClose}
                                sx={{width:"100%",
                                    backgroundColor: theme=>theme.palette.neutral[300],
                                    color:theme=>theme.palette.neutral[1000],

                                    '&:hover': {
                                        backgroundColor: theme=>theme.palette.neutral[400],
                                    },
                                }}
                            >
                                {t('Back')}
                            </Button>
                            <Button onClick={handleOnSuccess} variant="contained" sx={{width:"100%"}}
                            >
                                {t("Submit")}
                            </Button>
                        </Stack>
                    </DialogActions>

            </CustomStackFullWidth>
        </WrapperForCustomDialogConfirm>
    );
};

export default CancelOrder;
