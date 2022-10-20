import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = () => {
  return new Keycloak({
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    url: process.env.REACT_APP_KEYCLOAK_LINK,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  });
};

export const keycloakProviderInitConfig = () => {
  return {
    onLoad: "check-sso",
    checkLoginIframe: false,
    idToken: window.localStorage.getItem("idToken"),
    refreshToken: window.localStorage.getItem("refreshToken"),
    token: window.localStorage.getItem("token"),
  };
};
