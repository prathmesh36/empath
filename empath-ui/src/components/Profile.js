import {Fragment} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import '../stylesheets/Profile.css';
import userDefaultPhoto from '../images/user.png'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import * as React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {useAuth} from "../auth/AuthProvider";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExplicitTwoToneIcon from '@mui/icons-material/ExplicitTwoTone';
import Orders from "./Orders";
import Deposits from "./Deposits";
import Chart from "./Charts";
import Title from "./Title";
import {apiCall} from "../api/api";
import {
    UPDATE_USER_CLIENT_DATA_API_CONFIG,
    ORDER_LIST_API_CONFIG,
    USER_API_CONFIG,
    USER_CLIENT_API_CONFIG
} from "../metadata/apiConfig";
import {toast} from "react-toastify";
import _ from "lodash";
import useMediaQuery from '@mui/material/useMediaQuery';
import {INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URL} from "../metadata/constants";

export default function Profile() {
    const {user, logout} = useAuth();
    const [userData, setUserData] = React.useState({
        firstName:user.user.userFirstName,
        lastName:user.user.userLastName,
        email:user.user.userEmail,
        phoneNo:"2134148496",
        country:user.user.userCountry,
        state:user.user.userState,
        points:user.user.userPoints,
        age:user.user.userAge,
        instagramId: user.user.instagramId,
        username:user.user.userName
    });

    const [orders, setOrders] = React.useState([])
    const [clients, setClients] = React.useState([])
    const [loading, setLoading] = React.useState(false);
    const mqProfileImage = useMediaQuery('(max-width:450px)');

    const updateUserData = (user)=>{
        let data = {
            ...userData,
            firstName:user.userFirstName,
            lastName:user.userLastName,
            email:user.userEmail,
            country:user.userCountry,
            state:user.userState,
            points:user.userPoints,
            age:user.userAge,
            instagramId: user.instagramId,
            username:user.userName
        }
        setUserData(data);
    }

    const callUserClientApi = ()=>{
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        let apiConfig = _.cloneDeep(USER_CLIENT_API_CONFIG);
        apiConfig.url += user.user.userId
        return apiCall({...apiConfig, headers:authorizationHeader}, setClients, user.tokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                console.error("User data update failed");
                console.error("Message: " + response[3] + " Reason: " + response[2]);
            }else{
                console.debug("User data update successful")
            }
        }).catch((error) => {
                toast.error("Message: " + error[3] + " Reason: " + error[2]);
                if(error[1] === -1) {
                    logout();
                }
            }
        );
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
                if(error[1] === -1) {
                    logout();
                }
            }
        );
    }

    const updateUserClientDataApi = (clientId) =>{
        setLoading(true);
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`
        }
        let body = {
            clientId: clientId,
            userId: user.user.userId
        }
        return apiCall({...UPDATE_USER_CLIENT_DATA_API_CONFIG, data: body, headers:authorizationHeader}, ()=>{}, user.tokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                console.error("Client User Data Update failed");
                console.error("Message: " + response[3] + " Reason: " + response[2]);
            }else{
                console.debug("Client User Data Update successful");
                toast.success("Client User Id successfully updated");
            }
            setLoading(false);
        }).catch((error) => {
                toast.error("Message: " + error[3] + " Reason: " + error[2]);
                setLoading(false);
                if(error[1] === -1) {
                    logout();
                }
            }
        );
    }

    const callOrderApi = ()=>{
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        let apiConfig = _.cloneDeep(ORDER_LIST_API_CONFIG);
        apiConfig.url += user.user.userId
        return apiCall({...apiConfig, headers:authorizationHeader}, setOrders, user.tokenExpiry).then((response)=>{
            console.debug(response);
            if(!response[0]){
                console.error("Order data update failed");
                console.error("Message: " + response[3] + " Reason: " + response[2]);
            }else{
                console.debug("Order data update successful")
            }
        }).catch((error) => {
                toast.error("Message: " + error[3] + " Reason: " + error[2]);
                if(error[1] === -1) {
                    logout();
                }
            }
        );
    }

    React.useEffect(()=>{
        callUserApi();
        callOrderApi();
        callUserClientApi();
    },[])


    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className={"profile-top-card"} sx={{ minWidth: 275 }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={"https://source.unsplash.com/random?wallpapers"}
                            title="green iguana"
                        />
                        <CardContent className={"profile-top-card-content"}>
                            <Box
                                sx={{
                                    display: "-webkit-box",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                               <img className={mqProfileImage?"profile-user-image-mobile":"profile-user-image"} src={userDefaultPhoto}></img>
                                <Box xs={12}>
                                    <Typography className={"profile-username"} variant="h5" gutterBottom>
                                        {userData.firstName} {userData.lastName}
                                    </Typography>
                                    <Box sx={{display:"flex"}}>
                                        <PaidIcon fontSize={"small"} className={"profile-credit-icon"} ></PaidIcon>
                                        <Typography variant="h7" gutterBottom>
                                             Credits:
                                            <Typography variant="h7" className={"profile-credits"} gutterBottom>
                                                {userData.points} points
                                            </Typography>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ minWidth: 275 }} className={"profile-data-card"} >
                        <CardContent>
                            <Title Icon={<AccountBoxIcon className={"profile-icon"}/>} >Profile</Title>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="outlined"
                                        value={userData["firstName"]}
                                        onChange={(event) => {
                                            setUserData({...userData, firstName: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="outlined"
                                        value={userData["lastName"]}
                                        onChange={(event) => {
                                            setUserData({...userData, lastName: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Email Address"
                                        name="Email Address"
                                        label="Email Address"
                                        fullWidth
                                        autoComplete="Email Address"
                                        variant="outlined"
                                        value={userData["email"]}
                                        onChange={(event) => {
                                            setUserData({...userData, email: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="Phone Number"
                                        name="Phone Number"
                                        label="Phone Number"
                                        fullWidth
                                        variant="outlined"
                                        value={userData["phoneNo"]}
                                        onChange={(event) => {
                                            setUserData({...userData, phoneNo: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhoneIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Country"
                                        name="Country"
                                        label="Country"
                                        fullWidth
                                        autoComplete="Country"
                                        variant="outlined"
                                        value={userData["country"]}
                                        onChange={(event) => {
                                            setUserData({...userData, country: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PublicIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="State"
                                        name="State"
                                        label="State"
                                        fullWidth
                                        autoComplete="State"
                                        variant="outlined"
                                        value={userData["state"]}
                                        onChange={(event) => {
                                            setUserData({...userData, state: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationCityIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Age"
                                        name="Age"
                                        label="Age"
                                        fullWidth
                                        autoComplete="Age"
                                        variant="outlined"
                                        value={userData["age"]}
                                        onChange={(event) => {
                                            setUserData({...userData, state: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarMonthIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        autoComplete="Username"
                                        variant="outlined"
                                        value={userData["username"]}
                                        onChange={(event) => {
                                            setUserData({...userData, state: event.target.value});
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarMonthIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        disabled
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, ml: 3, width:"20%" }}
                                >
                                    Edit
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ minWidth: 275 }} className={"profile-socials-card"} >
                        <CardContent>
                            <Title Icon={<TagIcon className={"profile-icon"}/>} >Socials</Title>
                            <Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="instagram"
                                            name="instagram"
                                            label="Instagram ID"
                                            fullWidth
                                            autoComplete="Instagram"
                                            variant="outlined"
                                            value={userData["instagramId"]}
                                            onChange={(event) => {
                                                setUserData({...userData, state: event.target.value});
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <InstagramIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button
                                            href={"https://api.instagram.com/oauth/authorize?client_id=" + INSTAGRAM_CLIENT_ID + "&redirect_uri=" + INSTAGRAM_REDIRECT_URL + "&scope=user_profile,user_media&response_type=code"}
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            sx={{ mt: 3, mb: 2, ml: 3, width:"100%" }}
                                            className={"profile-socials-button"}
                                        >
                                            <InstagramIcon /> &nbsp; Update
                                        </Button>
                                    </Grid>
                                    {
                                        clients.map((client, index)=> (
                                            <React.Fragment key={"clients"+index}>
                                                <Grid item xs={12} sm={8}>
                                                    <TextField
                                                        required
                                                        id={"client-" + index}
                                                        name={"client-" + index}
                                                        label={client.clientName.split(" ")[0] + " ID"}
                                                        fullWidth
                                                        autoComplete={client.clientName.split(" ")[0]}
                                                        variant="outlined"
                                                        value={client.clientUserId}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <ExplicitTwoToneIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <LoadingButton
                                                        type="submit"
                                                        variant="contained"
                                                        color="success"
                                                        loading={loading}
                                                        sx={{ mt: 3, mb: 2, ml: 3, width:"100%" }}
                                                        className={"profile-socials-button"}
                                                        onClick={()=>{
                                                            updateUserClientDataApi(client.clientId).then(()=>{
                                                                callUserClientApi();
                                                            });
                                                        }}
                                                    >
                                                        <ExplicitTwoToneIcon /> &nbsp; Update
                                                    </LoadingButton>
                                                </Grid>
                                            </React.Fragment>
                                        ))
                                    }

                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ minWidth: 275 }} className={"profile-chart-card"} >
                        <CardContent className={"profile-order-table"}>
                            <Orders orders={orders}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Card sx={{ minWidth: 275 }} className={"profile-chart-card"} >
                        <CardContent className={"profile-chart"}>
                            <Chart />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Card sx={{ minWidth: 275 }} className={"profile-chart-card"} >
                        <CardContent>
                            <Deposits userData={userData}/>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Fragment>
    );
}