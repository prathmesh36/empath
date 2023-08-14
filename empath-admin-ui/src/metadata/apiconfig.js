import { BASE_URL } from "./constants";

export const EXP_API_CONFIG = {
  method: "get",
  url: BASE_URL + "/v1/experience/getAllExperiences",
};

export const CLIENT_API_CONFIG = {
  method: "get",
  url: BASE_URL + "/v1/client/getAllClients",
};

export const ORDER_API_CONFIG = {
  method: "get",
  url: BASE_URL + "/v1/order/getAllOrders",
};

export const USER_API_CONFIG = {
  method: "get",
  url: BASE_URL + "/v1/user/getAllUsers",
};
