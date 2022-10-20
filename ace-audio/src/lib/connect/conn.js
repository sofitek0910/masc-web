import axios from "axios";

const callToBackend = async (ENDPOINT, METHOD, AUTH, PAYLOAD) => {
  const headerObj = { "Content-Type": "application/json" };

  if (AUTH) {
    headerObj.Authorization = `Bearer ${AUTH}`;
  }
  
  const params = {
    url: `${process.env.REACT_APP_URL}${ENDPOINT}`,
    method: METHOD,
    data: PAYLOAD,
    headers: headerObj,
  };
  const response = await axios(params);
  return response.data;
};

export default callToBackend;
