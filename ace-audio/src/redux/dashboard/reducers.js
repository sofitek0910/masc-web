import { decodeToken, isExpired } from "react-jwt";
import {
  decodeJwtToken
} from "../../utilities/hooks/auth/util";
import {
  findByIdAndUpdate, findByIdAndUpdateTreeTile,
  findByIdAndUpdateTreeURL, findIndexInData,
  insertByIndexInArray
} from "../../utilities/hooks/common";
import * as types from "./types";

const initState = {
  language: "en",
  darkMode: false,
  direction: "ltr",
  loading: false,
  success: false,
  requestBody: "",
  requestLink: "",
  responseBody: "",
  treeData: [],
  currentTreeId: "",
  currentTreeElementTitle: "",
  requestStatus: "",
  requestStatusBoolean: false,
  requestSpeed: "",
  responseLength: "",
  responseNotFound: false,
  keyCloak: null,
  keyCloakToken: "",
  user: null,
  token: null,
  myDecodedToken: null,
  isMyTokenExpired: null,
  current_tab: "sequence",

  tuneJs: true,

  assetSize: 0,
  assetData: null,

  guidRoute: "ABCD000",
  createdPattern: false,
  createdAsset: false,
  newAddValue: "",
  newAddState: false,
  newPatternState: false,
  newPattern: {
    name: "FogSteady-99OK65",
    tempo: "126.25",
    posStart: "0:0:0",
    posEnd: "4:0:0",
    tracks: [
      {
        a_guid: "52CA59A79DAD42549710599E45B77E2A",
        volume: -15,
        mute: false,
        pan: 64,
        s_category: "BASS",
        order: "01",
      },
    ],
  },
  newAsset: {
    guid: "BB7F8006B346406AA355469E7BAB259C",
    name: "4BARS_BASS_F# 0167 [2020-05-20 030442]",
    key: "F#",
    bpm: "126.25",
    category: "BASS",
    items: [
      {
        "aif+org+org": {
          guid: "B83B4310ED394650845E6F94F887B48F",
          md5: "d2b46565ab6957763f809fe517e1d848",
          duration: "7.603958",
          format_name: "aiff",
          bit_rate: "2304000",
          sample_rate: "48000",
          channels: 2,
          size: "2189994",
          bpm: "126.25",
          m_scale: "",
          m_key: "",
        },
      },
      {
        "ogg+320k+libvorbis": {
          guid: "9A8E38CBE89340BCAAA33338986343F9",
          md5: "ce5fa743e59ba04c033bd2d973154a37",
          duration: "7.603958",
          format_name: "ogg",
          bit_rate: "320000",
          sample_rate: "48000",
          channels: 2,
          size: "242431",
          bpm: "126.25",
          m_scale: "",
          m_key: "",
        },
      },
      {
        "ogg+96k+libvorbis": {
          guid: "883653418A3E41F69A329A7788B7DCE3",
          md5: "544aec489a98e8e2ad63d6237c929a45",
          duration: "7.603958",
          format_name: "ogg",
          bit_rate: "96000",
          sample_rate: "48000",
          channels: 2,
          size: "101655",
          bpm: "126.25",
          m_scale: "",
          m_key: "",
        },
      },
    ],
  },
  guidSequenceRoute: "NEW",
  guidPatternRoute: "NEW",

  guidMidiRoute: "NEW",
  guidAssetRoute: "NEW",
  guidPatchRoute: "NEW",
  guidLfoRoute: "NEW",

  vol: -15,
  mute: false,
  locked: false,
  position: "0:0:0",
  back: false,
  players: null,
  selectedBit: 1,
  tracks: [],
  currentAsset: [],
  currentId: [],
  count: [[0, 0]],
  trackNum: [Math.floor(Math.random() * 10000)],
  size: 0,
  data: null,
  value: "10000000000000001000000000000000",

  playing: false,
  started: false,
  timeSig: [4, 4],
  bpm: 126.25,
  bars: "2",

  patternList: null,
  assetList: null,
  searchPattern: [],
};

const AuthReducer = (state = initState, action) => {
  const { payload } = action;

  switch (action.type) {
    // CHANGE_CURRENTASSETS_INDEX
    case types.CHANGE_CURRENTASSETS_INDEX:
      const replaceCurrentAssetIndex = (
        currentAsset,
        currentAssetIndex,
        ...payload
      ) => [
        ...currentAsset.slice(0, currentAssetIndex),
        ...payload,
        ...currentAsset.slice(currentAssetIndex + 1),
      ];
      return {
        ...state,
        currentAsset: replaceCurrentAssetIndex,
      };
    // CHANGE_CURRENT_ID_INDEX
    case types.CHANGE_CURRENT_ID_INDEX:
      const replaceCurrentIdIndex = (currentId, currentIdIndex, ...payload) => [
        ...currentId.slice(0, currentIdIndex),
        ...payload,
        ...currentId.slice(currentIdIndex + 1),
      ];
      return {
        ...state,
        currentId: replaceCurrentIdIndex,
      };
    // CHANGE_COUNT_INDEX
    case types.CHANGE_COUNT_INDEX:
      const replaceCurrentCountIndex = (
        count,
        currentCountIndex,
        ...payload
      ) => [
        ...count.slice(0, currentCountIndex),
        ...payload,
        ...count.slice(currentCountIndex + 1),
      ];
      return {
        ...state,
        count: replaceCurrentCountIndex,
      };
    // CHANGE_TABS
    case types.CHANGE_TABS:
      return {
        ...state,
        current_tab: payload,
      };
    // CHANGE_POSITION_VALUE
    case types.CHANGE_POSITION_VALUE:
      return {
        ...state,
        positionValue: payload,
      };
    // CHANGE_TREE_DATA
    case types.CHANGE_TREE_DATA:
      return {
        ...state,
        treeData: payload,
      };
    // CHANGE_TONEJS
    case types.CHANGE_TONEJS:
      return {
        ...state,
        tuneJs: payload,
      };
    // ADD_TREE_DATA
    case types.ADD_TREE_DATA:
      return {
        ...state,
        treeData: [...state.treeData, payload],
      };
    // SAVE_TREE_ID
    case types.SAVE_TREE_ID:
      return {
        ...state,
        currentTreeId: payload,
      };
    // UPDATE_TREE_ID
    case types.UPDATE_TREE_ID:
      const newState = findByIdAndUpdate(
        state.treeData,
        state.currentTreeId,
        state.requestBody
      );
      return {
        ...state,
        treeData: newState,
      };
    // CHANGE_REQUEST_LINK
    case types.CHANGE_REQUEST_LINK:
      const newChangenTreeState = findByIdAndUpdateTreeURL(
        state.treeData,
        state.currentTreeId,
        payload
      );
      return {
        ...state,
        requestLink: payload,
        treeData: newChangenTreeState,
      };
    // CHANGE_REQUEST_BODY
    case types.CHANGE_REQUEST_BODY:
      return {
        ...state,
        requestBody: payload,
      };
    // SEND_REQUEST
    case types.SEND_REQUEST:
      return {
        ...state,
        loading: true,
        responseBody: "",
        responseNotFound: false,
        requestStatusBoolean: false,
      };
    //SEND_PUT_REQUEST
    case types.SEND_PUT_REQUEST:
      return {
        ...state,
        loading: true,
        responseBody: "",
        responseNotFound: false,
        requestStatusBoolean: false,
      };
    // SEND_SUCCESS
    case types.SEND_SUCCESS:
      const objJson = JSON.parse(payload.data);
      const objDataString = payload.data.split('"data":')[1].split('"status":');
      const noQuotes = objDataString[0].split("").join("");
      return {
        ...state,
        success: true,
        loading: false,
        responseBody: noQuotes.replace(/,\s*$/, ""),
        requestStatus: objJson.status,
        requestSpeed: payload.duration,
        responseLength: `${objJson.headers["content-length"]} B`,
        responseNotFound: false,
        requestStatusBoolean: true,
      };
    // SEND_RESET
    case types.SEND_RESET:
      return {
        ...state,
        loading: false,
      };
    // SEND_FAILURE
    case types.SEND_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        responseNotFound: true,
        requestStatusBoolean: false,
      };
    // ASSET_SEARCH_REQUEST
    case types.ASSET_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // ASSET_SEARCH_SUCCESS
    case types.ASSET_SEARCH_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        assetSize: payload.assets.length,
        assetData: payload,
      };
    // ASSET_SEARCH_RESET
    case types.ASSET_SEARCH_RESET:
      return {
        ...state,
        loading: false,
      };
    // ASSET_SEARCH_FAILURE
    case types.ASSET_SEARCH_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
      };
    // KEY_CLOAK_REQUEST
    case types.KEY_CLOAK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // AUTH_TOKEN
    case types.AUTH_TOKEN:
      return {
        ...state,
        token: payload,
        user: action.isRouteVisible ? true : false,
        myDecodedToken: decodeToken(payload),
        isMyTokenExpired: isExpired(payload),
      };
    // KEY_CLOAK_SUCCESS
    case types.KEY_CLOAK_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        keyCloak: payload,
        keyCloakToken: `Bearer ${payload.access_token}`,
        user: decodeJwtToken(payload.access_token),
      };
    // KEY_CLOAK_RESET
    case types.KEY_CLOAK_RESET:
      return {
        ...state,
        loading: false,
      };
    // KEY_CLOAK_FAILURE
    case types.KEY_CLOAK_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
      };
    // DELETE_TREE_ELEMENT
    case types.DELETE_TREE_ELEMENT:
      return {
        ...state,
        treeData: state.treeData.filter(
          (item) => item.id !== state.currentTreeId
        ),
      };
    // DUPLICATE_TREE_ELEMENT
    case types.DUPLICATE_TREE_ELEMENT:
      const selectObjectData = findIndexInData(
        state.treeData,
        "id",
        state.currentTreeId
      );
      const newArrayTree = insertByIndexInArray(
        state.treeData,
        selectObjectData[0],
        selectObjectData[1]
      );

      return {
        ...state,
        treeData: newArrayTree,
      };

    // ADD_TREE_ELEMENT_TITLE
    case types.ADD_TREE_ELEMENT_TITLE:
      return {
        ...state,
        currentTreeElementTitle: payload,
      };
    // CHANGE_TREE_ELEMENT_TITLE
    case types.CHANGE_TREE_ELEMENT_TITLE:
      const newStateTreeOne = findByIdAndUpdateTreeTile(
        state.treeData,
        state.currentTreeId,
        payload
      );

      return {
        ...state,
        currentTreeElementTitle: payload,
        treeData: newStateTreeOne,
      };
    // CHANGE_REQUEST_BODY_STATIC
    case types.CHANGE_REQUEST_BODY_STATIC:
      return {
        ...state,
        responseBody: payload,
      };
    // LOGOUT
    case types.LOGOUT:
      return {
        ...state,
        keyCloak: null,
        keyCloakToken: "",
        token: "",
        loading: false,
        success: false,
        user: null,
      };

    // ASSETS EDITOR
    case types.CLEAR_EDITOR_RESPONSE_ACTION: {
      return {
        ...state,
        responseBody: "",
      };
    }
    // THEME_CHANGER
    case types.THEME_CHANGER: {
      return {
        ...state,
        darkMode: payload,
      };
    }

    // CREATE_PATTERN_REQUEST
    case types.CREATE_PATTERN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // CREATE_PATTERN_SUCCESS
    case types.CREATE_PATTERN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        createdAsset: true,
        //requestBody: "",
        guidPatternRoute: payload.pattern.guid,
      };
    // CREATE_PATTERN_RESET
    case types.CREATE_PATTERN_RESET:
      return {
        ...state,
        loading: false,
      };
    // CREATE_PATTERN_FAILURE
    case types.CREATE_PATTERN_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        createdPattern: false,
      };
    // CHANGE_CREATED_PATTERN
    case types.CHANGE_CREATED_PATTERN:
      return {
        ...state,
        createdPattern: payload,
      };
    // CHANGE_NEW_ADD_VALUE
    case types.CHANGE_NEW_ADD_VALUE:
      return {
        ...state,
        newAddValue: payload,
      };
    // NEW_REQUEST_BODY
    case types.NEW_REQUEST_BODY:
      return {
        ...state,
        requestBody: payload,
      };
    // CHANGE_NEW_ADD_STATE
    case types.CHANGE_NEW_ADD_STATE:
      return {
        ...state,
        newAddState: payload,
      };
    // CHANGE_NEW_PATTERN_STATE
    case types.CHANGE_NEW_PATTERN_STATE:
      return {
        ...state,
        newPatternState: payload,
      };

    // CREATE_ASSET_REQUEST
    case types.CREATE_ASSET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // CREATE_ASSET_RESET
    case types.CREATE_ASSET_RESET:
      return {
        ...state,
        loading: false,
      };
    // CREATE_ASSET_FAILURE
    case types.CREATE_ASSET_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        createdAsset: false,
      };
    case types.CHANGE_SEQUENCE_GUID_ROUTE:
      return {
        ...state,
        guidSequenceRoute: payload,
      };

    // PATTERN_ASSET_LOAD_REQUEST
    case types.PATTERN_ASSET_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // PATTERN_ASSET_LOAD_SUCCESS
    case types.PATTERN_ASSET_LOAD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        data: payload.assets,
        size: payload.assets.length,
      };
    // PATTERN_ASSET_LOAD_RESET
    case types.PATTERN_ASSET_LOAD_RESET:
      return {
        ...state,
        loading: false,
      };
    // PATTERN_ASSET_LOAD_FAILURE
    case types.PATTERN_ASSET_LOAD_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
      };

    /* *****************************    Pattern Player     ******************************* */
    // CHANGE_VOLUME
    case types.CHANGE_VOLUME:
      return {
        ...state,
        vol: payload,
      };
    // CHANGE_TRACK_VOLUME
    case types.CHANGE_TRACK_VOLUME:
      state.tracks[action.pos].volume = action.obj;
      return {
        ...state,
      };
    // REMOVE_TRACK
    case types.REMOVE_TRACK:
      state.tracks.splice(action.pos, 1);
      return {
        ...state,
      };
    // CHANGE_MUTE
    case types.CHANGE_MUTE:
      state.tracks[action.pos].mute = payload;
      return {
        ...state,
        mute: payload,
      };
    // CHANGE_LOCKED
    case types.CHANGE_LOCKED:
      return {
        ...state,
        locked: payload,
      };
    // CHANGE_POSITION
    case types.CHANGE_POSITION:
      return {
        ...state,
        position: payload,
      };
    // CHANGE_BACK
    case types.CHANGE_BACK:
      return {
        ...state,
        back: payload,
      };
    // CHANGE_PLAYERS
    case types.CHANGE_PLAYERS:
      return {
        ...state,
        players: payload,
      };

    // CHANGE_SLECTEDBIT
    case types.CHANGE_SLECTEDBIT:
      return {
        ...state,
        selectedBit: payload,
      };

    // CHANGE_TRACKS
    case types.CHANGE_TRACKS:
      state.tracks[action.pos] = action.obj;
      return {
        ...state,
      };
    // CHANGE_CURRENTASSETS
    case types.CHANGE_CURRENTASSETS:
      state.currentAsset[action.pos] = action.obj;
      return {
        ...state,
      };
    // CHANGE_CURRENTASSETS_EMPTY
    case types.CHANGE_CURRENTASSETS_EMPTY:
      return {
        ...state,
        currentAsset: payload,
      };

    // CHANGE_CURRENT_ID
    case types.CHANGE_CURRENT_ID:
      state.currentId[action.pos] = action.obj;
      return {
        ...state,
      };
    // CHANGE_COUNT
    case types.CHANGE_COUNT:
      state.count[action.pos] = action.obj;
      return {
        ...state,
      };
    // CHANGE_TRACK_NUM
    case types.CHANGE_TRACK_NUM:
      return {
        ...state,
        trackNum: payload,
      };

    // CHANGE_ASSET_DATA_SIZE
    case types.CHANGE_ASSET_DATA_SIZE:
      return {
        ...state,
        size: payload,
      };
    // CHANGE_ASSET_DATA
    case types.CHANGE_ASSET_DATA:
      return {
        ...state,
        data: payload,
      };
    // CHANGE_ASSET_VALUE
    case types.CHANGE_ASSET_VALUE:
      return {
        ...state,
        value: payload,
      };
    // SET_PLAYING
    case types.SET_PLAYING:
      return {
        ...state,
        playing: payload,
      };
    // SET_STARTING
    case types.SET_STARTING:
      return {
        ...state,
        started: payload,
      };
    // SET_TIME_SIG
    case types.SET_TIME_SIG:
      return {
        ...state,
        timeSig: payload,
      };
    // SET_BPM
    case types.SET_BPM:
      return {
        ...state,
        bpm: payload,
      };
    // SET_BARS
    case types.SET_BARS:
      return {
        ...state,
        bars: payload,
      };
    // PATTERN_LIST_REQUEST
    case types.PATTERN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // PATTERN_LIST_SUCCESS
    case types.PATTERN_LIST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        patternList: [payload],
      };
    //PATTERN_LIST_RESET
    case types.PATTERN_LIST_RESET:
      return {
        ...state,
        loading: false,
      };
    //PATTERN_LIST_FAILURE
    case types.PATTERN_LIST_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
      };
    // ASSET_LIST_REQUEST
    case types.ASSET_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // ASSET_LIST_SUCCESS
    case types.ASSET_LIST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        assetList: [payload],
      };
    //ASSET_LIST_RESET
    case types.ASSET_LIST_RESET:
      return {
        ...state,
        loading: false,
      };
    //ASSET_LIST_FAILURE
    case types.ASSET_LIST_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
      };
    // SET_SEARCH_PATTERN_REQUEST
    case types.SET_SEARCH_PATTERN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // SET_SEARCH_PATTERN_SUCCESS
    case types.SET_SEARCH_PATTERN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        searchPattern: payload.pattern_search,
      };
    //SET_SEARCH_PATTERN_RESET
    case types.SET_SEARCH_PATTERN_RESET:
      return {
        ...state,
        loading: false,
      };
    //SET_SEARCH_PATTERN_FAILURE
    case types.SET_SEARCH_PATTERN_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
      };
    //CHANGE_SEARCH_PATTERN
    case types.CHANGE_SEARCH_PATTERN:
      return {
        ...state,
        searchPattern: payload,
      };
    default:
      return state;
  }
};
export default AuthReducer;
