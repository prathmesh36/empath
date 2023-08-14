import {BASE_URL} from "./constants";

export const UPCOMING_EXP_API_CONFIG = {
    method: 'get',
    url: BASE_URL + '/v1/experience/getAllUpcomingExperiences/'
}

export const YOUR_EXP_API_CONFIG = {
    method: 'get',
    url: BASE_URL + '/v1/experience/getUserExperience/'
}

export const LOGIN_API_CONFIG = {
    method: 'post',
    url: BASE_URL + '/v1/security/login'
}

export const REGISTER_API_CONFIG = {
    method: 'post',
    url: BASE_URL + '/v1/user/addUser'
}

export const ORDER_ADD_API_CONFIG = {
    method: 'post',
    url: BASE_URL + '/v1/order/addOrder'
}

export const ORDER_LIST_API_CONFIG = {
    method: 'get',
    url: BASE_URL + '/v1/order/getOrderByUserId/'
}

export const USER_API_CONFIG = {
    method: 'get',
    url: BASE_URL + '/v1/user/getUserByUserId/'
}

export const USER_CLIENT_API_CONFIG = {
    method: 'get',
    url: BASE_URL + '/v1/user/getUserClientDataByUserId/'
}

export const INSTAGRAM_LOGIN_API_CONFIG = {
    method: 'put',
    url: BASE_URL + '/v1/user/updateInstagramIdByUserId/'
}

export const MESSAGES_LIST_API_CONFIG = {
    method: 'get',
    url: BASE_URL + '/v1/messaging/getMessagesByUserId/'
}


export const MESSAGES_ADD_API_CONFIG = {
    method: 'post',
    url: BASE_URL + '/v1/messaging/addMessage/'
}

export const UPDATE_USER_CLIENT_DATA_API_CONFIG = {
    method: 'post',
    url: BASE_URL + '/v1/user/addUserClientId/'
}
