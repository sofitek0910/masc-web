import { useState, useEffect } from "react";
import axios from "axios";

import { useKeycloak } from "@react-keycloak/web";

let axiosIns = null;

export const useAxios = (baseURL) => {
  const [keycloak, initialized] = useKeycloak();
  const [axiosInstance, setAxiosInstance] = useState({});

  useEffect(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: process.env.NODE_ENV !== "development"
          ? initialized
            ? `Bearer ${keycloak.token}`
            : undefined
          : `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    });

    setAxiosInstance({ instance });
    if (!axiosIns) axiosIns = { instance };
    return () => {
      setAxiosInstance({});
    };
  }, [baseURL, initialized, keycloak, keycloak.token]);

  return axiosInstance.instance;
};

export const getAxiosInstance = () => axiosIns;
