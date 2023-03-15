import { StepConnector, Stepper, styled } from "@mui/material";

import StepContent from "@mui/material/StepContent";

export const CustomStepContent = styled(StepContent)(
    ({ theme, activeStep, index, completed }) => ({
        borderLeft: "2px solid",
        color:
            activeStep === index + 1
                ? theme.palette.success.light
                : theme.palette.neutral[350],
        marginLeft: "15px",
        paddingLeft: "40px",
        paddingRight: "0px",
    })
);
export const CustomStepperStyled = styled(Stepper)(({ theme }) => ({
    "& .MuiStepConnector-line": {
        borderTopWidth: "2px",
        borderLeftWidth: "2px",
        height: "80px",
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
        borderColor: theme.palette.primary.main,
        height: "80px",
    },
    "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
        borderColor: theme.palette.primary.main,
        height: "80px",
    },
    "& .MuiStepLabel-iconContainer .Mui-active": {
        marginTop: "0px",
        width: "38px",
        height: "38px",
        borderColor: theme.palette.primary.main,
        border:`3px solid ${theme.palette.primary.main}`,
        borderRadius:"50%",
        padding: "2px"
    },
    "& .MuiStepLabel-iconContainer .Mui-completed": {
        width: "32px",
        height: "32px",
        borderColor: theme.palette.primary.main,

    },
    "& .MuiStepContent-root": {},

    "& .MuiStepLabel-label": {
        marginLeft: "20px",
    },
    "& .MuiStepLabel-iconContainer ": {
        width: "32px",
        height: "32px",
        borderColor: theme.palette.primary.main,

    },
    "& .MuiStepConnector-root ": {
       top:"16px"
    },

    "& .MuiSvgIcon-root": {
        width: "32px",
        height: "32px",
    },
    "& .MuiStepLabel-root": {
        padding: "0px",
    },
}));
