import React, { useCallback, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { withKeycloak } from "@react-keycloak/web";

const LoginPage = withRouter(
  withKeycloak(({ keycloak, location }) => {
    const { from } = location.state || { from: { pathname: "/search/audio" } };
    if (keycloak.authenticated) return <Redirect to={from} />;

    const login = useCallback(() => {
      keycloak.login( {idpHint: 'discord'});
    }, [keycloak]);

    useEffect(() => {
      login();
    });

    return <div></div>;
  })
);

export default LoginPage;
