import { KeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";
import "./style/globals.scss";
import MainRouter from "./utilities/hooks/auth/MainRouter";
import {
  generateSessionGuid, getSessionGuid
} from "./utilities/hooks/auth/trackerService";
class App extends Component {
  get keycloak() {
    return new Keycloak({
      realm: process.env.REACT_APP_KEYCLOAK_REALM,
      url: process.env.REACT_APP_KEYCLOAK_LINK,
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    });
  }

  get keycloakProviderInitConfig() {
    return {
      onLoad: "check-sso",
      checkLoginIframe: false,
      idToken: window.localStorage.getItem("idToken"),
      refreshToken: window.localStorage.getItem("refreshToken"),
      token: window.localStorage.getItem("token"),
    };
  }

  componentDidMount() {
    // For tracking service
    if (!getSessionGuid()) {
      generateSessionGuid();
    }
  }

  handleOnKeycloakEvent = (event, error) => {
    //console.log("onKeycloakEvent", event, error);
  };

  handleOnKeycloakTokens = (tokens) => {
    const { idToken, refreshToken, token } = tokens;
    if (!window.localStorage.getItem("token")) {
      const url = `${
        process.env.REACT_APP_API_BASE_URL +
        process.env.REACT_APP_API_PREFIX_URL
      }user/info`;
      getFetchData({ url, token })
        .then((res) => res.json())
        .then((res) => {
        });
    }
    window.localStorage.setItem("idToken", idToken);
    window.localStorage.setItem("refreshToken", refreshToken);
    window.localStorage.setItem("token", token);
  };

  render() {
    return (
      <KeycloakProvider
        onEvent={this.handleOnKeycloakEvent}
        onTokens={this.handleOnKeycloakTokens}
        keycloak={this.keycloak}
        initConfig={this.keycloakProviderInitConfig}
      >
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </KeycloakProvider>
    );
  }
}

export default App;
