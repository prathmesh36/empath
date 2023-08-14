import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MobileStepper from '@mui/material/MobileStepper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import CreditBalance from './CreditBalance';
import Review from './Review';
import {Divider} from "@mui/material";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useLocation} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import {apiCall} from "../api/api";
import {ORDER_ADD_API_CONFIG, USER_API_CONFIG} from "../metadata/apiConfig";
import {toast} from "react-toastify";
import _ from "lodash";
import useMediaQuery from '@mui/material/useMediaQuery';

const steps = ['Shipping address',  'Review your order', 'Empath Credit Balance'];


export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [addressInfo, setAddressInfo] = React.useState(null);
    const [pageUpdateFlag, setPageUpdateFlag] = React.useState(false);
    const [orderId, setOrderId] = React.useState("#####");

    let {user, setUser, logout} = useAuth();
    const {state:navigationProps} = useLocation();
    const {card:itemDetails} = navigationProps;
    const mqStepper = useMediaQuery('(max-width:500px)');

    const updateUserData = (data)=>{
        user.user = data;
        setUser(user)
    }

    const callUserApi = ()=>{
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        let apiConfig = _.cloneDeep(USER_API_CONFIG);
        apiConfig.url += user.user.userId
        return apiCall({...apiConfig, headers:authorizationHeader}, updateUserData, user.tokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                console.error("User data update failed");
                console.error("Message: " + response[3] + " Reason: " + response[2]);
            }else{
                console.debug("User data update successful")
            }
        }).catch((error) => {
                toast.error("Message: " + error[3] + " Reason: " + error[2]);
                logout()
            }
        );
    }

    const callOrderApo = ()=>{
        let data = {
            expId: itemDetails.expId,
            userId: user.user.userId,
            orderAddress: addressInfo.userAddress1 + " " + addressInfo.userAddress2 + " " + addressInfo.userCity + " " + addressInfo.userState + " " + addressInfo.userZip + " " + addressInfo.userCountry,
            totalCost: itemDetails.expCost,
            totalQuantity: itemDetails.expSelectedQuantity,
        }
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`
        }
        return apiCall({...ORDER_ADD_API_CONFIG, data: data, headers:authorizationHeader}, setOrderId, user.tokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                toast.error("Message: " + response[3] + " Reason: " + response[2]);
            }else{
                toast.success("Order placed successfully");
                setActiveStep(activeStep + 1);
            }
        }).catch((error) => {
                toast.error("Message: " + error[3] + " Reason: " + error[2]);
                logout()
            }
        );
    }

    React.useEffect(()=>{
        callUserApi();
    },[]);


    const validationSchema = Yup.object().shape({
        userFirstName: Yup.string().required('First Name is required'),
        userLastName: Yup.string().required('Last Name is required'),
        userAddress1: Yup.string()
            .required('Country is required'),
        userAddress2: Yup.string()
            .optional(),
        userCity: Yup.string()
            .required('City is required'),
        userZip: Yup.string()
            .required('Zip is required'),
        userState: Yup.string()
            .required('State is required')
            .length(2, 'Must be state code eg. CA for California'),
        userCountry: Yup.string()
            .required('Country is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleNext = (data) => {
        console.debug(data)
        switch (activeStep){
            case 0:
                setAddressInfo(data);
                setPageUpdateFlag(!pageUpdateFlag);
                setActiveStep(activeStep + 1);
                break;
            case 1:
                callUserApi().then(()=>{
                    setPageUpdateFlag(!pageUpdateFlag);
                    setActiveStep(activeStep + 1);
                });
                break;
            case 2:
                callOrderApo().then(()=>{
                    setPageUpdateFlag(!pageUpdateFlag);
                });
                break;
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitFunctionsMapper = {
        0: handleSubmit(handleNext),
        1:handleNext,
        2:handleNext
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm errors={errors} register={register} user={user}/>;
            case 1:
                return <Review itemDetails={itemDetails} addressInfo={addressInfo} user={user}/> ;
            case 2:
                return <CreditBalance itemDetails={itemDetails} user={user}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                {mqStepper?
                    <MobileStepper activeStep={activeStep} sx={{ pt: 3, pb: 2 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </MobileStepper>
                    :
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 2 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                }
                <Divider sx={{mb:2}}/>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is {orderId}. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment key={"page-id"+ pageUpdateFlag}>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={submitFunctionsMapper[activeStep]}
                                sx={{ mt: 3, ml: 1 }}
                                disabled={activeStep === steps.length - 1 && (parseInt(user.user.userPoints) - parseInt(itemDetails.expCost)) < 0}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Paper>
        </Container>

    );
}