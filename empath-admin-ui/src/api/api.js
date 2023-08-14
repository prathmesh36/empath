import axios from "axios";
import {
  API_FAILURE_MESSAGE,
  API_SUCCESS_MESSAGE,
} from "../metadata/constants";

export const apiCall = async (axiosConfig, setFunction) => {
  return axios(axiosConfig)
    .then(function (response) {
      setFunction(response.data.body);
      console.debug(response);
      return [true, response.status, response.data.status, API_SUCCESS_MESSAGE];
    })
    .catch(function (error) {
      console.debug(error);
      return [
        false,
        error.response ? error.response.status : 0,
        error.message,
        API_FAILURE_MESSAGE,
      ];
    });
};
