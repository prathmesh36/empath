import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import "../stylesheets/SignUp.css";
import {apiCall} from "../api/api";
import {REGISTER_API_CONFIG} from "../metadata/apiConfig";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SignUp() {
    const [loading, setLoading] = React.useState(false);
    const validationSchema = Yup.object().shape({
        userFirstName: Yup.string().required('First Name is required'),
        userLastName: Yup.string().required('Last Name is required'),
        userName: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        userEmail: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        userPassword: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('userPassword'), null], 'Confirm Password does not match'),
        userAge: Yup.number()
            .required('Age is required')
            .min(12, "Age must be atleast 12"),
        userGender: Yup.string()
            .required('Gender is required')
            .oneOf(['male', 'female', 'other'], "Should be male, female or other"),
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

    const navigate = useNavigate();
    const mqProfileForm = useMediaQuery('(max-width:900px)');

    const onSubmit = (data) => {
        setLoading(true);
        let mockTokenExpiry = Date.now() + 600010;

        apiCall({...REGISTER_API_CONFIG, data: data}, ()=>{}, mockTokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                toast.error("Message: " + response[3] + " Reason: " + response[2]);
            }else{
                navigate("/sign-in", { replace: true });
            }
            setLoading(false);
        });
    };

    return (
        <Grid container spacing={10}>
            <Grid className={"sign-up-about-section"} item xs={12} md={6}>
            <Box
                sx={{
                    pt: 8,
                    pb: 0,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="left"
                        color="text.primary"
                        gutterBottom
                    >
                        Empath
                    </Typography>
                    <Typography variant="h5" align="left" color="text.secondary" paragraph>
                        We have a huge catalogue of experiences at Empath for you.
                        Something short and leading about the collection below—its contents,
                        the creator, etc. Make it short and sweet, but not too short so folks
                        don&apos;t simply skip over it entirely.
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                    </Stack>
                </Container>
            </Box>
            </Grid>
            <Grid item xs={12} md={6} className={mqProfileForm?"sign-up-form":""}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="userFirstName"
                                    required
                                    fullWidth
                                    id="userFirstName"
                                    label="First Name"
                                    autoFocus
                                    {...register('userFirstName')}
                                    error={!!errors.userFirstName}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userFirstName?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userLastName"
                                    label="Last Name"
                                    name="userLastName"
                                    autoComplete="family-name"
                                    {...register('userLastName')}
                                    error={!!errors.userLastName}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userLastName?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userEmail"
                                    label="Email Address"
                                    name="userEmail"
                                    autoComplete="userEmail"
                                    {...register('userEmail')}
                                    error={!!errors.userEmail}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userEmail?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    name="userName"
                                    autoComplete="username"
                                    {...register('userName')}
                                    error={!!errors.userName}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userName?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="userPassword"
                                    label="Password"
                                    type="password"
                                    id="userPassword"
                                    autoComplete="new-password"
                                    {...register('userPassword')}
                                    error={!!errors.userPassword}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userPassword?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    {...register('confirmPassword')}
                                    error={!!errors.confirmPassword}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.confirmPassword?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="age"
                                    name="userAge"
                                    required
                                    fullWidth
                                    id="userAge"
                                    label="Age"
                                    type="number"
                                    {...register('userAge')}
                                    error={!!errors.userAge}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userAge?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="gender"
                                    name="userGender"
                                    required
                                    fullWidth
                                    id="userGender"
                                    label="Gender"
                                    {...register('userGender')}
                                    error={!!errors.userGender}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userGender?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="state"
                                    name="userState"
                                    required
                                    fullWidth
                                    id="userState"
                                    label="State"
                                    {...register('userState')}
                                    error={!!errors.userState}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userState?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="country"
                                    name="userCountry"
                                    required
                                    fullWidth
                                    id="userCountry"
                                    label="Country"
                                    {...register('userCountry')}
                                    error={!!errors.userCountry}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.userCountry?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit(onSubmit)}
                            loading={loading}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            </Grid>
        </Grid>
    );
}