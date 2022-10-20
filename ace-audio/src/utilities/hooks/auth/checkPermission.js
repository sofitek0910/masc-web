import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";

export const HandleCheckPermission = (
  permissionObjectValue,
  myDecodedToken
) => {
  const [keycloak] = useKeycloak();
  let location = useLocation();

  const { pathname } = location;

  const permissonMatch = new Map();

  for (let i = 0; i < permissionObjectValue.length; i++) {
    //if (!keycloak.authenticated) {
      permissonMatch.set("anonymous", {
        url: permissionObjectValue[i].url === pathname ? true : false,
        permission:
          permissionObjectValue[i].permission === "anonymous" ? true : false,
        visibility: permissionObjectValue[i].visibility === true ? true : false,
      });
    //}
    if (keycloak.authenticated) {
      permissonMatch.set("authorized", {
        url: permissionObjectValue[i].url === pathname ? true : false,
        permission:
          permissionObjectValue[i].permission === "authorized" ? true : false,
        visibility: permissionObjectValue[i].visibility === true ? true : false,
      });
    }
    if (myDecodedToken) {
      if (keycloak.authenticated && myDecodedToken.groups[0] === "web-dev") {
        permissonMatch.set("developers", {
          url: permissionObjectValue[i].url === pathname ? true : false,
          permission:
            permissionObjectValue[i].permission === "developers" ? true : false,
          visibility:
            permissionObjectValue[i].visibility === true ? true : false,
        });
      }
    }
  }

  return permissonMatch;
};

export const HandleCheckPermissionComponent = (
  permissionObjectValue,
  myDecodedToken,
  componentName,
  groupName
) => {
  const [keycloak] = useKeycloak();

  const permissonMatch = new Map();

  for (let i = 0; i < permissionObjectValue.length; i++) {
    //if (!keycloak.authenticated) {
      permissonMatch.set("anonymous", {
        permission: permissionObjectValue[i].permission === "anonymous" ? true : false,
        visibility: permissionObjectValue[i].visibility === true ? true : false,
        component: permissionObjectValue[i].component === componentName ? true : false,
        name: permissionObjectValue[i].name,
        group: permissionObjectValue[i].groups.find((el) => el === groupName) !== undefined,
        web: permissionObjectValue[i].web,
        mobile: permissionObjectValue[i].mobile,
      });
    //}
    if (keycloak.authenticated) {
      permissonMatch.set("authorized", {
        permission: permissionObjectValue[i].permission === "authorized" ? true : false,
        visibility: permissionObjectValue[i].visibility === true ? true : false,
        component: permissionObjectValue[i].component === componentName ? true : false,
        name: permissionObjectValue[i].name,
        group: permissionObjectValue[i].groups.find((el) => el === groupName) !== undefined,
        web: permissionObjectValue[i].web,
        mobile: permissionObjectValue[i].mobile,
      });
    }
    if (myDecodedToken) {
      if (keycloak.authenticated && myDecodedToken.groups[0] === "web-dev") {
        permissonMatch.set("developers", {
          permission: permissionObjectValue[i].permission === "developers" ? true : false,
          visibility: permissionObjectValue[i].visibility === true ? true : false,
          component: permissionObjectValue[i].component === componentName ? true : false,
          name: permissionObjectValue[i].name,
          group: permissionObjectValue[i].groups.find((el) => el === groupName) !== undefined,
          web: permissionObjectValue[i].web,
          mobile: permissionObjectValue[i].mobile,
        });
      }
    }
  }

  return permissonMatch;
};
