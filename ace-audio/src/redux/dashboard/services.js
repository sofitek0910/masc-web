import {
  sendPostRequest,
  sendKeyCloakRequest,
  sendAssetSearchRequest,
  createPatternRequest,
  sendPutRequest,
  sendPatternListRequest,
  sendAssetListRequest,
  setSearchPattern,
} from "../../utilities/hooks/sendRequest";

export const sendRequest_Service = async (data, token) => {
  const { body, link } = data;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/yaml",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await sendPostRequest(body, link, config);

  return response;
};

export const sendPutRequest_Service = async (data, token) => {
  const { body, link } = data;
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await sendPutRequest(body, link, config);

  return response;
};

export const assetSearch_Service = async (data) => {
  const response = await sendAssetSearchRequest(data);
  return response;
};

export const keyCloak_Service = async () => {
  const response = await sendKeyCloakRequest();

  return response;
};

export const createPattern_Service = async (data, token) => {
  const link = "pattern";
  const body = data;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await createPatternRequest(body, link, config);

  return response;
};

export const createAsset_Service = async (data, token) => {
  const link = "asset";
  const body = data;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await createPatternRequest(body, link, config);

  return response;
};

export const patternAssetLoad_Service = async (value) => {
  const response = await sendAssetSearchRequest(value);

  return response;
};

export const patternList_Service = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await sendPatternListRequest(value, config);

  return response;
};

export const assetList_Service = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await sendAssetListRequest(value, config);

  return response;
};

export const setSearchPattern_Service = async (value, token) => {
  const Link = value;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await setSearchPattern(Link, config);

  return response;
};
