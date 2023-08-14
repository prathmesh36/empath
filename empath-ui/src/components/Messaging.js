import React from "react";
import Grid from "@mui/material/Grid";
import ChatBox from "./ChatBox";
import Box from "@mui/material/Box";
import {Tab, Tabs, useMediaQuery} from "@mui/material";
import TabPanel from "./TabPanel";
import '../stylesheets/Messaging.css';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MessageIcon from '@mui/icons-material/Message';
import Title from "./Title";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../utility/utility";
import {apiCall} from "../api/api";
import {MESSAGES_ADD_API_CONFIG, MESSAGES_LIST_API_CONFIG} from "../metadata/apiConfig";
import {toast} from "react-toastify";
import {useAuth} from "../auth/AuthProvider";
import _ from "lodash";
import Skeleton from "@mui/material/Skeleton";


export default function Messaging() {
    const { user, logout } = useAuth();
    const [value, setValue] = React.useState(0);
    const [messageByClients, setMessageByClients] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const matches = useMediaQuery("(min-width:1000px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index, label) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
            sx: {maxWidth:"none"},
            icon: <Avatar alt={label} {...stringAvatar(label)} ></Avatar>,
            iconPosition: "start",
            className: matches ? "messaging-vertical-tabs-buttons" : "messaging-vertical-tabs-buttons messaging-vertical-tabs-buttons-sm",
            label: matches ? label : ""
        };
    }

    const transformToMessageByClients = (data)=>{
        let messageByClientsTemp = {};
        data.forEach((msg)=>{
            if (msg["clientId"] in messageByClientsTemp){
                messageByClientsTemp[msg["clientId"]].push(msg);
            }else{
                messageByClientsTemp[msg["clientId"]] = [msg];
            }
        })
        setMessageByClients(messageByClientsTemp);
        console.debug(messageByClientsTemp)
    }

    const callMessagingAddApi = (data)=> {
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        return apiCall({...(MESSAGES_ADD_API_CONFIG), headers:authorizationHeader, data: data}, ()=>{}, user.tokenExpiry)
            .then((response)=> {
                    console.debug(response);
                    if(!response[0]){
                        toast.error("Message: " + response[3] + " Reason: " + response[2]);
                    }
                }
            ).catch((error) => {
                toast.error("Message: " + error[3] + " Reason: " + error[2]);
                if(error[1] === -1) {
                    logout();
                }
            }
        );
    }

    const callMessagingFetchApi = ()=>{
        setLoading(false);
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        let apiConfig = _.cloneDeep(MESSAGES_LIST_API_CONFIG);
        apiConfig.url += user.user.userId;
        return apiCall({...apiConfig, headers:authorizationHeader}, transformToMessageByClients, user.tokenExpiry)
            .then((response)=> {
                    console.debug(response);
                    setLoading(true);
                    if(!response[0]){
                        toast.error("Message: " + response[3] + " Reason: " + response[2]);
                    }
                }
            ).catch((error) => {
                    toast.error("Message: " + error[3] + " Reason: " + error[2]);
                    if(error[1] === -1) {
                        logout();
                    }
                }
            );
    }

    React.useEffect(()=>{
        callMessagingFetchApi();
    },[]);


    return (
        <Grid container className={"messaging-top-grid"}>
            <Card className={(matches) ? "messaging-card messaging-card-width-md" : "messaging-card messaging-card-width-sm"}>
                <CardContent sx={{width:"100%"}}>
                    <Title Icon={<MessageIcon className={"messaging-icon"}/>}>Messaging</Title>
                    <Grid container spacing={10}>
                        <Grid item xs={4} md={4}>
                            <Paper className={"messaging-paper"}>
                                <Box
                                    sx={{ flexGrow: 1, display: 'flex', height: "100%", width:"100%" }}
                                >
                                    {
                                        (loading) ?
                                            (
                                                <Tabs
                                                    orientation="vertical"
                                                    variant="scrollable"
                                                    value={value}
                                                    onChange={handleChange}
                                                    aria-label="Vertical tabs example"
                                                    sx={{ borderRight: 1, borderColor: 'divider', width:"100%" }}
                                                >
                                                    {
                                                        Object.keys(messageByClients).map(( key, index) => (
                                                            <Tab key={"vertical-tab-" + index} {...a11yProps(index,messageByClients[key][0]["clientName"])} />
                                                        ))
                                                    }
                                                </Tabs>
                                            ):
                                            (
                                                <>
                                                    <Skeleton variant="rectangular"  sx={{marginBottom:"10px"}} width={350} height={50} />
                                                    <Skeleton variant="rectangular"  sx={{marginBottom:"10px"}} width={350} height={50} />
                                                    <Skeleton variant="rectangular"  sx={{marginBottom:"10px"}} width={350} height={50} />
                                                    <Skeleton variant="rectangular"  sx={{marginBottom:"10px"}} width={350} height={50} />
                                                </>
                                            )
                                        }
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} md={8} className={"messaging-chatbox-grid"}>
                            {
                                (loading) ?
                                (
                                    Object.keys(messageByClients).map(( key, index) => (
                                        <TabPanel key={"vertical-tab-panel-" + index}  className={"messaging-vertical-tabs"} value={value} index={index}>
                                            <ChatBox loading={loading} messages={messageByClients[key]} callMessagingAddApi={callMessagingAddApi} callMessagingFetchApi={callMessagingFetchApi}/>
                                        </TabPanel>
                                    ))
                                ):
                                (
                                    <TabPanel key={"vertical-tab-panel-skeleton" }  className={"messaging-vertical-tabs"} value={value} index={0}>
                                        <ChatBox loading={loading} messages={[{clientId:"loading", userId:"loading"}]} callMessagingAddApi={callMessagingAddApi} callMessagingFetchApi={callMessagingFetchApi}/>
                                    </TabPanel>
                                )
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
