import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { ButtonGroup, Container, Dropdown, DropdownButton, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Tone from "tone";
import * as Actions from "../../../redux/dashboard/action";
import Button from "../../../theme/Components/Button";
import Switch from "../../../theme/Components/Switch";
import { makeid } from "../../../utilities/helper/helper";
import DetectOnclickOutside from "../../../utilities/hooks/DetectOnclickOutside";

const Index = () => {
  const { keycloak } = useKeycloak();
  const [typeBtn, setTypeBtn] = useState("");
  const [userProfile, setUserProfile] = useState(false);
  const {
    user,
    current_tab,
    darkMode,
    guidSequenceRoute,
    newPattern,
    guidPatternRoute,
    position,
    players,
    selectedBit,
    tracks,
    currentAsset,
    data,
    playing,
    started,
    timeSig,
    bpm,
    bars,
  } = useSelector((state) => state.dashboard);

  let samplePttern = newPattern;

  const Dispatch = useDispatch();

  const {
    logout_Action,
    changeTabs_Action,
    themechanger_Action,
    changeNewAddValue_Action,
    newRequestBody_Action,
    changeRequestLink_Action,
    changePosition_Action,
    change_selectedbit_Action,
    change_current_id_Action,
    change_current_assets_Action,
    change_current_assetsEmpty_Action,
    change_count_Action,
    setPlaying_Action,
    setStarting_Action,
    setTimeSig_Action,
    setBpm_Action,
    setBars_Action,
  } = Actions;
  let history = useHistory();

  const handleBtnClick = (type, guid) => {
    Dispatch(changeTabs_Action(type));
    if (!guid) {
      history.push(`/editor`);
    } else {
      history.push(`/${type}/${guid}/editor`);
    }
    if (!guidSequenceRoute) history.push(`/editor`);
  };
  useEffect(() => {
    history.push(`/pattern/${guidPatternRoute}/editor`);
  }, [guidPatternRoute]);

  const emitter = new Tone.Emitter();
  emitter.on("stepEvent", (pos, sig) => {
    Dispatch(changePosition_Action(pos));
    let b = parseInt(pos.split(":")[0]);
    let e = parseInt(pos.split(":")[1]);
    let q = parseInt(pos.split(":")[2]) + 1;
    let n = sig[0];
    let d = sig[1];
    Dispatch(change_selectedbit_Action(b * (n * d) + e * d + q));
  });
  const moveNext = (track, n) => {
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
  emitter.on("next", () => {
    players.stopAll();
    Dispatch(change_current_assetsEmpty_Action([]));
    // currentAsset = [];
    for (let i in tracks) {
      let nextId = moveNext(tracks[i], i);
      let player = players.player(nextId);
      if (!tracks[i].mute) {
        player.volume.value = tracks[i].volume;
      } else {
        player.mute = true;
      }

      Dispatch(change_current_assets_Action(i, nextId));
      //currentAsset[i] = nextId;
      Dispatch(change_current_id_Action(i, nextId));
      //currentId[i] = nextId;
      Dispatch(change_count_Action(i, [tracks[i].left, tracks[i].right]));
      //count[i] = [tracks[i].left, tracks[i].right];
      player.start();
    }
  });
  const repeat = () => {
    Tone.Transport.scheduleRepeat((time) => {
      if (Tone.Transport.position.split(".")[0] === "0:0:0") {
        emitter.emit("next");
      }
      emitter.emit("stepEvent", Tone.Transport.position.split(".")[0], timeSig);
    }, "16n");
  };
  useEffect(() => {
    Tone.Transport.loopEnd = bars + ":0:0";
  }, [bars]);
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
  const play = () => {
    if (!started) {
      Dispatch(setStarting_Action(true));
      Tone.start();
      Tone.getDestination();
      Tone.Transport.timeSignature = timeSig;
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.loopStart = "0:0:0";
      Tone.Transport.loopEnd = bars + ":0:0";
      Tone.Transport.loop = true;
      repeat();
    }
    if (playing) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      players.stopAll();
      Dispatch(setPlaying_Action(false));
      Dispatch(change_selectedbit_Action(1));
      Dispatch(changePosition_Action("0:0:0"));
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

  const tempoOptions = [
    {
      key: 60,
      text: "60",
      value: "60",
    },
    {
      key: 90,
      text: "90",
      value: "90",
    },
    {
      key: 120,
      text: "120",
      value: "120",
    },
    {
      key: 126.25,
      text: "126.25",
      value: "126.25",
    },
    {
      key: 135,
      text: "135",
      value: "135",
    },
  ];

  const barsOptions = [
    {
      key: 1,
      text: "1",
      value: "1",
    },
    {
      key: 2,
      text: "2",
      value: "2",
    },
    {
      key: 3,
      text: "3",
      value: "3",
    },
    {
      key: 4,
      text: "4",
      value: "4",
    },
  ];

  const bpbOptions = [
    {
      key: "[16, 16]",
      text: "[16, 16]",
      value: "[16, 16]",
    },
    {
      key: "[12, 8]",
      text: "[12, 8]",
      value: "[12, 8]",
    },
    {
      key: "[4, 4]",
      text: "[4, 4]",
      value: "[4, 4]",
    },
  ];

  const onSelectBPM = (data) => {
    Dispatch(setBpm_Action(parseFloat(data.target.innerText)));
    samplePttern.tempo = data.target.innerText;
    Dispatch(newRequestBody_Action(JSON.stringify(samplePttern, null, 4)));
  };

  const onLogout = () => {
    Dispatch(logout_Action());
    keycloak.logout();
    window.localStorage.removeItem("idToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("session-token");
    /*     window.localStorage.setItem("idToken", "");
    window.localStorage.setItem("refreshToken", "");
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("session-token", ""); */
  };

  const handleNewPattern = () => {
    samplePttern.name = `NEW-${makeid(9)}`;
    samplePttern.tempo = `${bpm}`;
    samplePttern.tracks[0].a_guid = currentAsset[0];
    samplePttern.tracks[0].order = '1';
    Dispatch(newRequestBody_Action(JSON.stringify(samplePttern, null, 4)));
  };

  return (
    <>
      <Navbar expand="lg" className="header-nav">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/static/logo-rec-500px.png"
              className="nav-logo-img"
              alt="play"
              title="play"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="justify-content-end"
              style={{ maxHeight: "60px", width: "100%" }}
              navbarScroll
            >
              {user ? (
                <div className="user_active">
                  <div className="button-wrapper">
                    <p>FIXED LOOP TEMPO</p>
                    <DropdownButton
                      as={ButtonGroup}
                      key={"light"}
                      id={`dropdown-variants-light `}
                      variant={"light"}
                      title={bpm}
                      className="nav_dropdown"
                      onSelect={(e, data) => {
                        onSelectBPM(data);
                      }}
                    >
                      {tempoOptions.map((data, i) => {
                        return (
                          <Dropdown.Item eventKey={i} key={i}>
                            {data.text}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                  <div className="button-wrapper">
                    <p>BARS</p>
                    <DropdownButton
                      as={ButtonGroup}
                      key={"light"}
                      id={`dropdown-variants-light`}
                      variant={"light"}
                      title={bars}
                      onSelect={(e, data) => {
                        Dispatch(setBars_Action(data.target.innerText));
                      }}
                    >
                      {barsOptions.map((data, i) => {
                        return (
                          <Dropdown.Item eventKey={i} key={i}>
                            {data.text}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                  <div className="button-wrapper">
                    <p>BEATS PER BAR</p>
                    <DropdownButton
                      as={ButtonGroup}
                      key={"light"}
                      id={`dropdown-variants-light`}
                      variant={"light"}
                      title={`${timeSig}`}
                      onSelect={(e, data) => {
                        Dispatch(
                          setTimeSig_Action(eval(data.target.innerText))
                        );
                      }}
                    >
                      {bpbOptions.map((data, i) => {
                        return (
                          <Dropdown.Item eventKey={i} key={i}>
                            {data.value}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </div>
                  <div className="button-wrapper">
                    <p>POSITION</p>
                    <div className="pos-string">{position}</div>
                  </div>

                  <div className="button_wrapper_text">
                    <p>selected bit: {selectedBit}</p>
                  </div>
                  <button
                    className="header_play_btn"
                    onClick={
                      data
                        ? () => {
                            play();
                          }
                        : null
                    }
                    disabled={!data}
                  >
                    {!playing ? (
                      <img src={"/static/play.svg"} alt="play" title="play" />
                    ) : (
                      <img
                        src={"/static/pause.svg"}
                        alt="pause"
                        title="pause"
                      />
                    )}
                  </button>
                  <div className="tab-sec mx-3">
                    <Button
                      btnStyleClass={`${
                        current_tab === "sequence" ? "tab_btn_active" : ""
                      } tab-btn`}
                      handleBtnClick={() => {
                        setTypeBtn("sequence");
                        handleBtnClick("sequence", guidSequenceRoute);
                        history.push(`/sequence/${guidSequenceRoute}/editor`);
                        Dispatch(changeNewAddValue_Action("new sequence"));
                      }}
                      BtnInnerValue="S"
                    />
                    <Button
                      btnStyleClass={`${
                        current_tab === "pattern" ? "tab_btn_active" : ""
                      } tab-btn`}
                      handleBtnClick={() => {
                        handleBtnClick("pattern", guidPatternRoute);
                        Dispatch(changeNewAddValue_Action("new pattern"));
                        handleNewPattern();
                        Dispatch(
                          changeRequestLink_Action(
                            "https://masc-api.musicascode.com/mc/pattern"
                          )
                        );
                      }}
                      BtnInnerValue="P"
                    />
                    <Button
                      btnStyleClass={`${
                        current_tab === "transition" ? "tab_btn_active" : ""
                      } tab-btn`}
                      handleBtnClick={() => {
                        handleBtnClick("transition");
                        history.push("/editor");
                        Dispatch(changeRequestLink_Action(""));
                        Dispatch(changeNewAddValue_Action("new transition"));
                      }}
                      BtnInnerValue="T"
                    />
                    <Button
                      btnStyleClass={`${
                        current_tab === "asset" ? "tab_btn_active" : ""
                      } tab-btn`}
                      handleBtnClick={() => {
                        handleBtnClick("asset");
                        history.push("/editor");
                        Dispatch(changeRequestLink_Action(""));
                        Dispatch(changeNewAddValue_Action("new asset"));
                      }}
                      BtnInnerValue="A"
                    />
                  </div>
                  <div className="user-sec">
                    <svg
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                      className="nav-setting-img mx-2"
                    >
                      <path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z" />
                    </svg>

                    {/*  <img
                      src="/static/settings.svg"
                      className="nav-setting-img mx-2"
                      alt="play"
                      title="play"
                    /> */}
                  </div>
                  <div className="user-sec">
                    <i
                      className="bi bi-person-circle mx-2"
                      onClick={() => {
                        setUserProfile(!userProfile);
                      }}
                    ></i>
                    {/*  <img
                      src="/static/user.svg"
                      className="nav-user-img mx-2"
                      alt="play"
                      title="play"
                      onClick={() => {
                        setUserProfile(!userProfile);
                      }}
                    /> */}
                    <div className="circle"></div>
                  </div>
                  <div
                    className="user-sec"
                    onClick={() => {
                      setUserProfile(!userProfile);
                    }}
                  >
                    <p>{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="user_active">
                  <img
                    src="/static/user.svg"
                    className="nav-user-img mx-2"
                    alt="play"
                    title="play"
                    onClick={() => {
                      setUserProfile(!userProfile);
                    }}
                  />
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <DetectOnclickOutside open={userProfile} setOpen={setUserProfile}>
        <div
          style={{ display: userProfile ? "block" : "none" }}
          className="user_profile"
        >
          {/* <div className="user_name">
          <div>
            <p>UserName: {user.preferred_username}</p>
          </div>
        </div> */}
          <div className="item left">
            <div>
              <p>{`Switch to ${darkMode ? "light" : "dark"} Mode`}</p>
            </div>
            <div>
              <Switch
                Dispatch={Dispatch}
                funCall={themechanger_Action}
                stateValue={darkMode}
              />
            </div>
          </div>
          <div className="item left">
            <div>
              <i className="bi bi-person-bounding-box"></i>
            </div>
            <div>
              <p>Account</p>
            </div>
          </div>
          <div className="item left">
            <div>
              <i className="bi bi-box-arrow-left"></i>
            </div>
            <div
              onClick={() => {
                onLogout();
                history.push("/");
              }}
            >
              <p>Logout</p>
            </div>
          </div>
        </div>
      </DetectOnclickOutside>
    </>
  );
};

export default Index;
