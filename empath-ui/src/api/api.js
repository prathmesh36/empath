import axios from "axios";
import {
    API_FAILURE_MESSAGE,
    API_SUCCESS_MESSAGE,
    TOKEN_EXPIRY_REASON,
    USER_LOGGED_OUT_MESSAGE
} from "../metadata/constants";


export const apiCall = async (axiosConfig, setFunction, tokenExpiry)=> {
    if(tokenExpiry && tokenExpiry > (Date.now()/1000) + 600 ) {
        return axios(axiosConfig).then(function (response) {
            setFunction(response.data.body)
            console.debug(response)
            return [true, response.status, response.data.status, API_SUCCESS_MESSAGE]
        }).catch(function (error) {
            console.log(error);
            return [false, error.response ? error.response.status : 0, error.response.data.status, API_FAILURE_MESSAGE]
        });
    }else{
        return new Promise((resolve, reject)=>{
            reject([false, -1, TOKEN_EXPIRY_REASON, USER_LOGGED_OUT_MESSAGE])
        })
    }
}