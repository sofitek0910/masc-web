import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { GROUP_DEVELOPERS } from "../../../constants/common";
import * as Actions from "../../../redux/dashboard/action";

const PrivateRoute = ({ component: Component, forDevOnly, ...rest }) => {
  const [keycloak] = useKeycloak();
  let history = useHistory();
  const isRouteVisible = forDevOnly
    ? keycloak.authenticated &&
      keycloak?.tokenParsed?.groups?.includes(GROUP_DEVELOPERS)
    : keycloak.authenticated;

  const Dispatch = useDispatch();
  const { authToken_Action, logout_Action } = Actions;
  const { user, myDecodedToken } = useSelector((state) => state.dashboard);

  const onLogout = () => {
    Dispatch(logout_Action());
    keycloak.logout();
    window.localStorage.removeItem("idToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("session-token");
  };

  if (myDecodedToken && myDecodedToken.exp < Date.now() / 1000) {
    onLogout();
    history.push("/");
  }
  useEffect(() => {
    Dispatch(
      authToken_Action(window.localStorage.getItem("token"), isRouteVisible)
    );
  }, [isRouteVisible, user]);

  return (
    // props means components passed down to this private route component
    <Route
      {...rest}
      render={(props) =>
        isRouteVisible ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
