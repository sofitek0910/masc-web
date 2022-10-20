import { useKeycloak } from "@react-keycloak/web";
import AssetDetails from "pages/AssetDetails";
import AssetGuid from "pages/AssetGuid";
import LfoGuid from "pages/LfoGuid";
import MidiGuid from "pages/MidiGuid";
import MidiGuidEditor from "pages/MidiGuidEditor";
import PatchDetails from "pages/PatchDetails";
import PatternDetails from "pages/PatternDetails";
import SearchAsset from "pages/SearchAsset";
import SearchPattern from "pages/SearchPattern";
import SearchPlugin from "pages/SearchPlugin";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";
import { permissions } from "../../../constants/permission";
import AudioGuidEditor from "../../../pages/AudioGuidEditor";
import Dashboard from "../../../pages/Dashboard";
import JwtPage from "../../../pages/JwtPage";
import LibraryRoutes from "../../../pages/LibraryRoutes";
import Login from "../../../pages/Login";
import SearchAudioNews from "../../../pages/SearchAudioNews";
import SearchMidi from "../../../pages/SearchMidi";
import SearchPatch from "../../../pages/SearchPatch";
import SearchRhythm from "../../../pages/SearchRhythm";
import SearchSequence from "../../../pages/SearchSequence";
import SearchTransition from "../../../pages/SearchTransition";
import Settings from "../../../pages/Settings";
import Loader from "../../../theme/Components/Loader";
import PrivateRoute from "./PrivateRoute";
import PatchEditor from '../../../View/PatchEditor';
import UpdatePatchEditor from '../../../View/UpdatePatchEditor';

// import GuidPage from "pages/GuidPage";

const MainRouter = () => {
  let location = useLocation();
  let history = useHistory();
  if (location.pathname === "/") {
    history.push("/search/audio");
  }
  const { initialized } = useKeycloak();
  const {
    myDecodedToken,
    guidRoute,
    darkMode,
    direction,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {}, [darkMode]);

  if (!initialized) {
    return <Loader imgPath="/static/img/loaders/load3.svg" />;
  }

  const publicRoutes = [];
  const authRoutes = [];
  const devRoutes = [];

  const publicAnonymousRoutes = () => {
    for (let i = 0; i < permissions.length; i++) {
      /*       if (
              permissions[i].url === "/" &&
              permissions[i].permission === "anonymous" &&
              permissions[i].visibility === true
            ) {
              publicRoutes.push(
                <Route key={i} exact path={permissions[i].url} component={Homepage} />
              );
            } */
      if (
        permissions[i].url === "/login" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route key={i} exact path={permissions[i].url} component={Login} />
        );
      }
      if (
        permissions[i].url === "/search/audio" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={SearchAudioNews}
          />
        );
      }
      if (
        permissions[i].url === "/search/pattern" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={SearchPattern}
          />
        );
      }
      if (
        permissions[i].url === "/search/patch" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={SearchPatch}
          />
        );
      }
      if (
        permissions[i].url === "/patch/new/editor" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={PatchEditor}
          />
        );
      }
      if (
        permissions[i].url === "/search/midi" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={SearchMidi}
          />
        );
      }
      if (
        permissions[i].url === "/midi/:guid" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={MidiGuid}
          />
        );
      }
      if (
        permissions[i].url === "/audio/:guid" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={AssetDetails}
          />
        );
      }
      if (
        permissions[i].url === "/patch/:guid" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={PatchDetails}
          />
        );
      }
      if (
        permissions[i].url === "/pattern/:guid" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        publicRoutes.push(
          <Route
            key={i}
            exact
            path={permissions[i].url}
            component={PatternDetails}
          />
        );
      }
    }
  };

  const privateAuthorizedRoutes = () => {
    for (let i = 0; i < permissions.length; i++) {
      if (
        permissions[i].url === "/editor" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={Dashboard}
          />
        );
      }

      if (
        permissions[i].url === "/sequence" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url + "/:guidSequenceRoute/editor"}
            component={Dashboard}
          />
        );
      }
      if (
        permissions[i].url === "/pattern" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url + "/:guidPatternRoute/editor"}
            component={Dashboard}
          />
        );
      }
      if (
        permissions[i].url === "/jwt" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={JwtPage}
          />
        );
      }
      if (
        permissions[i].url === "/settings" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={Settings}
          />
        );
      }
      if (
        permissions[i].url === "/search/sequence" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchSequence}
          />
        );
      }
      if (
        permissions[i].url === "/search/midi" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchMidi}
          />
        );
      }
      if (
        permissions[i].url === "/midi/:guid" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={MidiGuid}
          />
        );
      }
      if (
        permissions[i].url === "/search/patch" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchPatch}
          />
        );
      }
      if (
        permissions[i].url === "/search/plugin" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchPlugin}
          />
        );
      }
      if (
        permissions[i].url === "/search/rhythm" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchRhythm}
          />
        );
      }
      if (
        permissions[i].url === "/search/transition" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchTransition}
          />
        );
      }
      if (
        permissions[i].url === "/patch/:guid/editor" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={PatchDetails}
          />
        );
      }
      if (
        permissions[i].url === "/midi/:guid/editor" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={MidiGuidEditor}
          />
        );
      }
      if (
        permissions[i].url === "/asset/:guid/editor" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={AssetGuid}
          />
        );
      }
      if (
        permissions[i].url === "/lfo/:guid/editor" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={LfoGuid}
          />
        );
      }
      if (
        permissions[i].url === "/search/asset" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchAsset}
          />
        );
      }
      if (
        permissions[i].url === "/search/pattern" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={SearchPattern}
          />
        );
      }
      if (
        permissions[i].url === "/pattern/:guid" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={PatternDetails}
          />
        );
      }
      if (
        permissions[i].url === "/patch/:guid" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={PatchDetails}
          />
        );
      }
      if (
        permissions[i].url === "/patchv2/:guid/editor" &&
        permissions[i].permission === "anonymous" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={UpdatePatchEditor}
          />
        );
      }
      if (
        permissions[i].url === "/audio/:guid" &&
        permissions[i].permission === "authorized" &&
        permissions[i].visibility === true
      ) {
        authRoutes.push(
          <PrivateRoute
            key={i}
            exact
            path={permissions[i].url}
            component={AssetDetails}
          />
        );
      }
    }
  };

  const privateDeveloperRoutes = (myDecodedToken) => {
    for (let i = 0; i < permissions.length; i++) {
      if (
        myDecodedToken &&
        myDecodedToken.groups.length > 0 &&
        permissions[i].visibility === true &&
        permissions[i].permission === "developers"
      ) {
        devRoutes.push(
          <PrivateRoute
            key={i}
            path={`/audio/${guidRoute}/editor`}
            component={AudioGuidEditor}
          />
        );
      }
    }
  };

  publicAnonymousRoutes();
  privateAuthorizedRoutes();
  privateDeveloperRoutes(myDecodedToken);

  return (
    <div
      className={
        darkMode ? `theme-dark-${direction}` : `theme-light-${direction}`
      }
    >
      <Router>
        {/* Public Anonymous */}
        {publicRoutes}
        {/* Private Authorized */}
        {authRoutes}
        {/* Private Developers */}
        {devRoutes}
        <Route
          path="/:section()"
          render={(routeProps) => <LibraryRoutes {...routeProps} />}
        />
      </Router>
    </div>
  );
};

export default MainRouter;
