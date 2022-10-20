import axios from "axios";
import qs from "querystring";
import settings from "../../settings";

const {
  REACT_APP_KEYCLOAK_GRANT_TYPE,
  REACT_APP_KEYCLOAK_CLIENT_ID,
  REACT_APP_KEYCLOAK_USERNAME,
  REACT_APP_KEYCLOAK_PASSWORD,
  REACT_APP_KEYCLOAK_URL,
} = process.env;

export const sendPostRequest = async (body, link, config) => {
  let data;
  let duration;
  let startTime;
  let err;
  try {
    startTime = Date.now();
    await axios.post(link, body, config).then((response) => {
      duration = axiosTimerFunc(startTime);
      data = JSON.stringify(response, null, 2);
    });
  } catch (error) {
    duration = axiosTimerFunc(startTime);
    if (error) {
      err = "404 Not found";
    }
    console.log(error);
  }
  return { data, duration, err };
};

// for sequence page
export const sendPutRequest = async (body, link, config) => {
  let data;
  let duration;
  let startTime;
  let err;
  try {
    startTime = Date.now();
    await axios.put(link, body, config).then((response) => {
      duration = axiosTimerFunc(startTime);
      data = JSON.stringify(response, null, 2);
    });
  } catch (error) {
    duration = axiosTimerFunc(startTime);
    if (error) {
      err = "404 Not found";
    }
    console.log(error);
  }
  return { data, duration, err };
};

export const axiosTimerFunc = (startTime) => {
  let now = Date.now();
  //let seconds = Math.floor((now - startTime) / 1000);
  let milliseconds = Math.floor((now - startTime) % 1000);
  return `${milliseconds} ms`;
};

export const sendKeyCloakRequest = async () => {
  let config = {
    grant_type: REACT_APP_KEYCLOAK_GRANT_TYPE,
    client_id: REACT_APP_KEYCLOAK_CLIENT_ID,
    username: REACT_APP_KEYCLOAK_USERNAME,
    password: REACT_APP_KEYCLOAK_PASSWORD,
  };
  let data;
  try {
    await axios
      .post(REACT_APP_KEYCLOAK_URL, qs.stringify(config))
      .then(function (response) {
        data = response;
      });
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const sendAssetSearchRequest = async (value) => {
  let data;
  try {
    await axios
      .get(`${settings.apiUrl}asset/search/126.25?bits=${value}`)
      .then((response) => {
        data = response;
      });
  } catch (error) {
    console.log(error);
  }
  return { data };
};

export const createPatternRequest = async (body, link, config) => {
  let data;
  try {
    await axios
      .put(`${settings.apiUrl}${link}`, body, config)
      .then((response) => {
        data = response;
      });
  } catch (error) {
    console.log(error);
  }
  return { data };
};

export const sendPatternListRequest = async (value, config) => {
  let data;
  try {
    await axios
      .get(`https://masc-api.musicascode.com/mc/pattern/${value}`, config)
      .then((response) => {
        data = response;
      });
  } catch (error) {
    console.log(error);
  }
  return { data };
};

export const sendAssetListRequest = async (value, config) => {
  let data;
  try {
    await axios
      .get(`https://masc-api.musicascode.com/mc/pattern/${value}/assets`, config)
      .then((response) => {
        data = response;
      });
  } catch (error) {
    console.log(error);
  }
  return { data };
};

export const setSearchPattern = async (link, config) => {
  let data;
  try {
    await axios
      .get(`https://masc-api.musicascode.com/mc/pattern/search${link}`, config)
      .then((response) => {
        data = response;
      });
  } catch (error) {
    console.log(error);
  }
  return { data };
};
