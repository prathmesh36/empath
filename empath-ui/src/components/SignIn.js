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
import {useAuth} from "../auth/AuthProvider";
import {apiCall} from "../api/api";
import {LOGIN_API_CONFIG} from "../metadata/apiConfig";
import {toast} from "react-toastify";
import Stack from "@mui/material/Stack";
import '../stylesheets/SignIn.css'
import useMediaQuery from '@mui/material/useMediaQuery';


export default function SignIn() {
    const { login } = useAuth();
    const mqProfileForm = useMediaQuery('(max-width:900px)');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData = {
            username: data.get('username'),
            password: data.get('password'),
        }

        let mockTokenExpiry = Date.now() + 600010;

        apiCall({...LOGIN_API_CONFIG, data: loginData}, login, mockTokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                if(response[1] === 401){
                    toast.error("Invalid username or password");
                }else {
                    toast.error("Login Failed");
                }
            }
            setLoading(false);
        }).catch((error) => {
                toast.error("Login Failed");
                setLoading(false);
            }
        );

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
            <Grid item xs={12} md={6} className={mqProfileForm?"sign-in-form":""}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                loading={loading}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </LoadingButton>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
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