import Box from "@mui/material/Box";
import Copyright from "./Copyright";
import Container from "@mui/material/Container";
import * as React from "react";
import '../stylesheets/AppBody.css';
import MyRoutes from '../routes/MyRoutes';
import { useEffect } from 'react';
import {INSTAGRAM_LOGIN_API_CONFIG} from "../metadata/apiConfig";
import {apiCall} from "../api/api";
import {useAuth} from "../auth/AuthProvider";
import _ from "lodash";

export default function AppBody() {

    const {user} = useAuth();
    const [response, setResponse] = React.useState(null);

    const callUserApi = (code)=> {
        let authorizationHeader = {
            Authorization: `Bearer ${user.token}`,
            "ngrok-skip-browser-warning": "69420"
        }
        let apiConfig = _.cloneDeep(INSTAGRAM_LOGIN_API_CONFIG);
        apiConfig.url += user.user.userId + "?code=" + code;

        return apiCall({...apiConfig, headers: authorizationHeader}, setResponse, user.tokenExpiry).then((response) => {
            console.log(response);
            window.location.replace(window.location.origin.toString() + "/#/profile");
        }).catch((error) => {
                console.log(error)
            }
        );

    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            console.log('Code:', code);
            callUserApi(code);
        }
    }, []);

    return (
        <Container className={"top-container"} maxWidth={"xl"}>
            <Box sx={{ my: 4 }}>
                <MyRoutes/>
                <Copyright/>
            </Box>
        </Container>
    );

}
