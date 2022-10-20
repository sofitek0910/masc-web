import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const setAccessToken = (token) => {
  Cookies.set("keycloak_token", token);
};

export const getAccessToken = () => {
  return Cookies.get("keycloak_token");
};

export const getAccessTokenState = (state) => state.dashboard.token;
export const isAuthenticated = () => {
  if (getAccessToken()) {
    return true;
  } else {
    return false;
  }
};

export const decodeJwtToken = (token) => {
  return jwt_decode(token);
};

export const getResponseBody = (state) => state.dashboard.responseBody;
export const getActiveNode = (state) => state.assets.active_node;
