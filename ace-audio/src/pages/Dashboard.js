import { useTransition } from "@react-spring/web";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Tone from "tone";
import Header from "../modules/Header";
import * as Actions from "../redux/dashboard/action";
import settings from "../settings";
import DashboardStructure from "../theme/Main/DashbaordStructure";

const Dashboard = (props) => {
  const Dispatch = useDispatch();
  const {
    changePosition_Action,
    change_players_Action,
    change_selectedbit_Action,
    change_tracks_Action,
    change_current_assets_Action,
    change_current_id_Action,
    change_count_Action,
    changeAssetDataSize_Action,
    changeAssetData_Action,
    changeAssetValue_Action,
    setPlaying_Action,
    setStarting_Action
  } = Actions;
  const {
    token,
    players,
    tracks,
    trackNum,
    size,
    data,
    value,
    playing,
  } = useSelector((state) => state.dashboard);

  //const [players, setPlayers] = useState(null);
  //const [selectedBit, setSelectedBit] = useState(1);
  // const [tracks, setTracks] = useState([]);
  // const [currentAsset, setCurrentAsset] = useState([]);
  //const [currentId, setCurrentId] = useState([]);
  //const [count, setCount] = useState([[0, 0]]);
  //const [trackNum, setTrackNum] = useState([Math.floor(Math.random() * 10000)]);

  //const [size, setSize] = useState(0);
  //const [data, setData] = useState(null);
  //const [mute, setMute] = useState(false);
  //const [vol, setVol] = useState(-15);
  //const [locked, setLocked] = useState(false);
  //const [back, setBack] = useState(false);
  //const [value, setValue] = useState("10000000000000001000000000000000");

  //const [playing, setPlaying] = useState(false);
  //const [started, setStarted] = useState(false);
  // const [timeSig, setTimeSig] = useState([4, 4]);
  //const [bpm, setBpm] = useState(126.25);
  //const [bars, setBars] = useState("2");
  //const [position, setPosition] = useState("0:0:0");

  //react-spring animations
  const listTransition = useTransition(trackNum, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 190 },
    leave: { opacity: 0, height: 0 },
    keys: trackNum.map((item) => item),
  });

  useEffect(() => {}, [tracks]);

  useEffect(() => {
    let pl = new Tone.Players().toDestination();
    Dispatch(change_players_Action(pl));
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${settings.apiUrl}asset/search/126.25?bits=${value}`, config)
      .then((res) => res.json())
      .then((data) => {
        Dispatch(changeAssetDataSize_Action(data?.assets?.length));
        Dispatch(changeAssetData_Action(data));
      })
      .catch((err) => console.log(err));
  }, [value]);

  const newData = () => {
    listTransition((styles, item, t, pos) => {
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
        Dispatch(change_current_assets_Action(pos, obj.list[0]));
        Dispatch(change_current_id_Action(pos, tracks[pos].list[0]));
        Dispatch(
          change_count_Action(pos, [tracks[pos].left, tracks[pos].right])
        );
        Dispatch(changeAssetValue_Action(tracks[pos].bits));
        //currentAsset[pos] = obj.list[0];
        //currentId[pos] = tracks[pos].list[0];
        //count[pos] = [tracks[pos].left, tracks[pos].right];
        //setValue(tracks[pos].bits);
      }
    });
  };

  useEffect(() => {
    newData();
  }, [data]);

  const Stop = () => {
    if (playing) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      players.stopAll();
      Dispatch(setPlaying_Action(false));
      Dispatch(change_selectedbit_Action(1));
      Dispatch(changePosition_Action("0:0:0"));
      Dispatch(setStarting_Action(false));
    } else {
      Tone.Transport.start();
      Dispatch(setPlaying_Action(true));
    }
  };

  return (
    <div>
      <Header />
      <DashboardStructure Stop={Stop} />
    </div>
  );
};

export default Dashboard;
