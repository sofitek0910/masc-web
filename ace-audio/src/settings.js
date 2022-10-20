export const botSeekModes = {
  replaceBotSeekMod: "REPLACE",
  appendBotSeekMod: "APPEND",
};

export default {
  botSeekMod: botSeekModes.replaceBotSeekMod,
  baseApiUrl: process.env.REACT_APP_API_BASE_URL,
  apiPrefix: process.env.REACT_APP_API_PREFIX_URL,
  apiUrl:
    process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PREFIX_URL,
  jgenApiUrl: process.env.REACT_APP_JGEN_BASE_URL,
};
