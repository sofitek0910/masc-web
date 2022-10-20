import { TRACKING_EVENT } from '../../../constants/common';
import { generateRandomGuid } from './helper';
import { getAxiosInstance } from './keycloakService';


export const generateSessionGuid = () => {
  const guid = generateRandomGuid();
  localStorage.setItem('session-token', guid);
  return guid;
}

export const getSessionGuid = () => {
  return localStorage.getItem('session-token');
}

export const handleTrackerReducer = async (action) => {
  const time = (new Date()).toISOString();
  let data = [];
  switch(action.event) {
    case TRACKING_EVENT.ASSET_PLAYER_STOP: {
      if (action?.data?.completed) {
        data = [{
          eventType: "APP",
          "a.guid": action?.data?.guid,
          "s.guid": getSessionGuid(),
          completed: action?.data?.completed,
          created_utc: time
        }]
      } else {
        data = [{
          eventType: "APP",
          "a.guid": action?.data?.guid,
          "s.guid": getSessionGuid(),
          duration_ms: action?.data?.duration,
          completed: action?.data?.completed,
          created_utc: time
        }];
      }
      break;
    }
    case TRACKING_EVENT.PATTERN_PLAYER_STOP: {
      if (action?.data?.completed) {
        data = action?.data?.listGuids.map((guid) => ({
          eventType: "PPP",
          "p.guid": guid,
          "s.guid": getSessionGuid(),
          completed: action?.data?.completed,
          created_utc: time
        }))
      } else {
        data = action?.data?.listGuids.map((guid) => ({
          eventType: "PPP",
          "p.guid": guid,
          "s.guid": getSessionGuid(),
          completed: action?.data?.completed,
          duration_ms: action?.data?.duration,
          created_utc: time
        }))
      }
      break;
    }
    default: {
      break;
    }
  };
  const { instance: axiosInstance } = getAxiosInstance();
  const url = 'metric';
  await axiosInstance.put(url, {
    eventBatch: "metric.action",
    data
  });
}