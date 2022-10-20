import React, { useEffect, useState } from "react";
import McMidiBitsSequence from "../McMidiBitsSequence/McMidiBitsSequence";
import removeIcon from "../img/remove.png";
import settings from "../../../../../settings";
import {
  FastForwardRounded,
  FastRewindRounded,
  VolumeUpRounded,
  VolumeOffRounded,
  LockRounded,
  LockOpenRounded,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../../redux/dashboard/action";

const McTrackAudio = ({ id, num, pos }) => {
  const Dispatch = useDispatch();
  const {
    newRequestBody_Action,
    changeVolume_Action,
    changeMute_Action,
    changeLocked_Action,
    changeBack_Action,
    change_players_Action,
    change_tracks_Action,
    change_current_assets_Action,
    change_current_id_Action,
    change_count_Action,
    change_track_num_Action,
    changeAssetValue_Action,
    track_volume_Action,
    removeTrack_Action,
  } = Actions;
  const {
    newPattern,
    vol,
    mute,
    locked,
    back,
    players,
    tracks,
    currentId,
    count,
    trackNum,
    size,
    data,
    value,
  } = useSelector((state) => state.dashboard);
  let PATTERN = newPattern;

  useEffect(() => {
    if (data) {
      let obj = {};
      obj.list = [];
      for (let i = 0; i <= size - 1; i++) {
        if (!players.has(data.assets[i]["a.guid"])) {
          players.add(data.assets[i]["a.guid"], data.assets[i].url);
        }
        obj.list.push(data.assets[i]["a.guid"]);
      }
      obj.current = obj.list[0];
      obj.left = -1;
      obj.right = obj.list.length;
      obj.volume = -10;
      obj.mute = false;
      obj.freeze = false;
      obj.back = false;
      obj.bits = value;
      Dispatch(change_tracks_Action(pos, obj));
      // tracks[pos] = obj;
      Dispatch(change_current_assets_Action(pos, obj.list[0]));
      //ca[pos] = obj.list[0];
      //currentId[pos] = tracks[pos].list[0];
      Dispatch(change_current_id_Action(pos, tracks[pos].list[0]));
      Dispatch(change_count_Action(pos, [tracks[pos].left, tracks[pos].right]));
      //count[pos] = [tracks[pos].left, tracks[pos].right];
      Dispatch(changeAssetValue_Action(tracks[pos].bits));
      //setValue(tracks[pos].bits);
    }
  }, [data]);

  const muteButton = () => {
    if (players.state === "started") {
      let pl = players.player(currentId[pos]);
      pl.mute = !mute;
    }
    //tracks[pos].mute = !mute;
    Dispatch(changeMute_Action(!mute, pos));
    PATTERN.tracks[pos].mute = !mute;
    Dispatch(newRequestBody_Action(JSON.stringify(PATTERN, null, 4)));
  };
  const volumeSlider = (e) => {
    if (players.state === "started" && !tracks[pos].mute) {
      let pl = players.player(currentId[pos]);
      pl.volume.value = parseInt(e.target.value);
    }
    //tracks[pos].volume = parseInt(e.target.value);
    Dispatch(track_volume_Action(pos, parseInt(e.target.value)));
    Dispatch(changeVolume_Action(parseInt(e.target.value)));
    PATTERN.tracks[pos].volume = parseInt(e.target.value);
    Dispatch(newRequestBody_Action(JSON.stringify(PATTERN, null, 4)));
  };

  const freezeHandler = () => {
    let ind = tracks[pos].list.indexOf(tracks[pos].current);
    if (players.state === "started" && !tracks[pos].freeze) {
      if (!tracks[pos].back) {
        ind === 0
          ? (tracks[pos].current =
              tracks[pos].list[tracks[pos].list.length - 1])
          : (tracks[pos].current = tracks[pos].list[ind - 1]);
      } else {
        ind === tracks[pos].list.length - 1
          ? (tracks[pos].current = tracks[pos].list[0])
          : (tracks[pos].current = tracks[pos].list[ind + 1]);
      }
    } else if (players.state === "started") {
      if (tracks[pos].back) {
        ind === 0
          ? (tracks[pos].current =
              tracks[pos].list[tracks[pos].list.length - 1])
          : (tracks[pos].current = tracks[pos].list[ind - 1]);
      } else {
        ind === tracks[pos].list.length - 1
          ? (tracks[pos].current = tracks[pos].list[0])
          : (tracks[pos].current = tracks[pos].list[ind + 1]);
      }
    }
    tracks[pos].freeze = !locked;
    Dispatch(changeLocked_Action(!locked));
  };
  const seek = () => {
    tracks[pos].back = !back;
    Dispatch(changeBack_Action(!back));
  };
  const removeTrack = () => {
    if (players.state === "started") {
      let pl = players.player(currentId[pos]);
      pl.mute = true;
    }
    let arr = [...trackNum];
    let index = arr.indexOf(num);
    arr.splice(index, 1);
    Dispatch(change_track_num_Action(arr));
    Dispatch(removeTrack_Action(index));
    PATTERN.tracks.splice(index, 1);
    Dispatch(newRequestBody_Action(JSON.stringify(PATTERN, null, 4)));
  };

  const handleCategoryChanged = (data) => {
    PATTERN.tracks[pos].s_category = data;
    Dispatch(newRequestBody_Action(JSON.stringify(PATTERN, null, 4)));
  };

  return (
    <>
      <div class="d-flex justify-content-start track_inner">
        <div>
          <button className="remove-btn" onClick={removeTrack}>
            {
              /* <img src={removeIcon} alt="" /> */
              <i class="bi bi-x-circle-fill"></i>
            }
          </button>
        </div>
        <div>
          <div className="category">
            <span>Category</span>
            <br />
            <input
              type="radio"
              id="Private"
              name="category-options"
              value="Private"
            />
            <label htmlFor="Private"> Private</label>
            <br />
            <input
              type="radio"
              id="Public"
              name="category-options"
              value="Public"
            />
            <label htmlFor="Public"> Public</label>
            <br />
            <input
              type="radio"
              id="Favorites"
              name="category-options"
              value="Favorites"
            />
            <label htmlFor="Favorites"> Favorites</label>
            <br />
            <select
              name="cat-dropdown"
              onChange={(e) => {
                handleCategoryChanged(e.target.value);
              }}
            >
              <option value="Bass">Bass</option>
              <option value="cat 2">cat 2</option>
              <option value="cat 3">cat 3</option>
            </select>
          </div>
        </div>
        <div>
          {" "}
          <div className="beat-search">
            <span>Beat Search</span>
            <McMidiBitsSequence num={pos} />
          </div>
        </div>
        <div>
          <div className=" d-flex justify-content-start controls">
            <div
              class="d-flex align-items-start flex-column"
              style={{ height: "200px" }}
            >
              <div class="">
                <span>Results Controls</span>
              </div>
              <div class="p-2">
                <div className="currentId">{currentId[pos]}</div>
              </div>
              <div class="p-2">
                <div className=" d-flex justify-content-start">
                  <div>
                    <input
                      onChange={volumeSlider}
                      type="range"
                      min="-70"
                      max="-10"
                      value={
                        tracks && tracks[pos] !== undefined
                          ? tracks[pos].volume
                          : -15
                      }
                      className="vol-slider"
                    />
                  </div>
                  <div>
                    <p className="volume-label">
                      {tracks && tracks[pos] !== undefined
                        ? tracks[pos].volume
                        : -15}
                      db
                    </p>
                  </div>
                  <div>
                    <button className="mute-btn" onClick={muteButton}>
                      {mute ? (
                        <VolumeOffRounded style={{ fontSize: 90 }} />
                      ) : (
                        <VolumeUpRounded style={{ fontSize: 90 }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-2">
                <div className=" d-flex justify-content-start">
                  <div className="seek-controls">
                    <p>
                      {count && count[pos] !== undefined ? count[pos][0] : "0"}
                    </p>
                    <p>
                      {count && count[pos] !== undefined ? count[pos][1] : "0"}
                    </p>
                    <button className={`seek-btn`} onClick={seek}>
                      <FastRewindRounded style={{ fontSize: 90 }} />
                    </button>
                    <button className={`seek-btn`} onClick={seek}>
                      <FastForwardRounded style={{ fontSize: 90 }} />
                    </button>
                  </div>
                  <button className="seek-btn" onClick={freezeHandler}>
                    {locked ? (
                      <LockRounded style={{ fontSize: 90 }} />
                    ) : (
                      <LockOpenRounded style={{ fontSize: 90 }} />
                    )}
                  </button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default McTrackAudio;
