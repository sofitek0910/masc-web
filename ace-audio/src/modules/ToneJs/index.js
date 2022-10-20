import * as Tone from "tone";

const emitter = new Tone.Emitter();

export const tone_hook = (
  players,
  tracks,
  currentAsset,
  Dispatch,
  changePositionValue_Action,
  change_selectedbit_Action,
  change_current_assets_Action,
  changeAssetIndex_Action,
  changeCurrentIdIndex_Action,
  changeCountIndex_Action
) => {
  emitter.on("stepEvent", (pos, sig) => {
    Dispatch(changePositionValue_Action(pos));
    let b = parseInt(pos.split(":")[0]);
    let e = parseInt(pos.split(":")[1]);
    let q = parseInt(pos.split(":")[2]) + 1;
    let n = sig[0];
    let d = sig[1];
    Dispatch(change_selectedbit_Action(b * (n * d) + e * d + q));
  });
  emitter.on("next", () => {
    players.stopAll();
    Dispatch(change_current_assets_Action([]));
    //currentAsset = [];
    for (let i in tracks) {
      let nextId = moveNext(currentAsset, tracks[i], i);
      let player = players.player(nextId);
      if (!tracks[i].mute) {
        player.volume.value = tracks[i].volume;
      } else {
        player.mute = true;
      }
      Dispatch(changeAssetIndex_Action(nextId, i));
      Dispatch(changeCurrentIdIndex_Action(nextId, i));
      Dispatch(changeCountIndex_Action([tracks[i].left, tracks[i].right], i));
      /* currentAsset[i] = nextId;
      currentId[i] = nextId;
      count[i] = [tracks[i].left, tracks[i].right]; */
      player.start();
    }
  });
};

export const repeat = (timeSig) => {
  Tone.Transport.scheduleRepeat((time) => {
    if (Tone.Transport.position.split(".")[0] === "0:0:0") {
      emitter.emit("next");
    }
    emitter.emit("stepEvent", Tone.Transport.position.split(".")[0], timeSig);
  }, "16n");
};

export const moveNext = (currentAsset, track, n) => {
  let index = track.list.indexOf(track.current);
  if (!track.freeze) {
    if (!track.back) {
      if (track.left === track.list.length - 1) {
        track.left = 0;
        track.right = track.list.length - 1;
      } else {
        track.left++;
        track.right--;
      }
      for (let i of currentAsset) {
        if (i === track.list[index]) {
          index++;
          if (index >= track.list.length - 1) {
            index = 0;
          }
        }
      }
      if (index === track.list.length - 1) {
        track.current = track.list[0];
        // track.left = 0;
        // track.right = track.list.length;
      } else {
        track.current = track.list[index + 1];
      }
    } else {
      if (track.left === 0) {
        track.right = 0;
        track.left = track.list.length - 1;
      } else {
        track.left--;
        track.right++;
      }
      for (let i of currentAsset) {
        if (i === track.list[index]) {
          index--;
          if (index <= 0) {
            index = track.list.length - 1;
          }
        }
      }
      if (index === 0) {
        track.current = track.list[track.list.length - 1];
      } else {
        track.current = track.list[index - 1];
      }
    }
  }
  return track.list[index];
};

export const tone_bars = (bars) => {
  Tone.Transport.loopEnd = bars + ":0:0";
};

export const tone_bpm = (bpm) => {
  Tone.Transport.bpm.value = bpm;
};

export const play = (
  started,
  playing,
  timeSig,
  bars,
  bpm,
  players,
  Dispatch,
  setStarting_Action,
  setPlaying_Action,
  change_selectedbit_Action,
  changePositionValue_Action
) => {
  if (!started) {
    Dispatch(setStarting_Action(true));
    Tone.start();
    Tone.getDestination();
    Tone.Transport.timeSignature = timeSig;
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.loopStart = "0:0:0";
    Tone.Transport.loopEnd = bars + ":0:0";
    Tone.Transport.loop = true;
    repeat(timeSig);
  }
  if (playing) {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    players.stopAll();
    Dispatch(setPlaying_Action(false));
    Dispatch(change_selectedbit_Action(1));
    Dispatch(changePositionValue_Action("0:0:0"));
    Dispatch(setStarting_Action(false));
    // for (let i in tracks) {
    //   let ind = tracks[i].list.indexOf(tracks[i].current);
    //   if (ind === 0) {
    //     tracks[i].current = tracks[i].list[tracks[i].list.length - 1];
    //   } else {
    //     tracks[i].current = tracks[i].list[ind - 1];
    //   }
    // }
  } else {
    Tone.Transport.start();
    Dispatch(setPlaying_Action(true));
  }
};

export const audioApiCall = (
  assetSize,
  assetData,
  assetValue,
  players,
  count,
  ca,
  ci,
  pos,
  tracks,
  Dispatch,
  changeAssetValue_Action
) => {
  if (assetData) {
    let obj = {};
    obj.list = [];
    for (let i = 0; i <= assetSize - 1; i++) {
      if (!players.has(assetData.assets[i]["a.guid"])) {
        players.add(assetData.assets[i]["a.guid"], assetData.assets[i].url);
      }
      obj.list.push(assetData.assets[i]["a.guid"]);
    }
    obj.current = obj.list[0];
    obj.left = -1;
    obj.right = obj.list.length;
    obj.volume = -10;
    obj.mute = false;
    obj.freeze = false;
    obj.back = false;
    obj.bits = assetValue;
    tracks[pos] = obj;
    ca[pos] = obj.list[0];
    ci[pos] = tracks[pos].list[0];
    count[pos] = [tracks[pos].left, tracks[pos].right];
    Dispatch(changeAssetValue_Action(tracks[pos].bits));
  }
};
