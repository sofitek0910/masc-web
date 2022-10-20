import * as Tone from "tone";
import Two from "two.js";

export const toneSetUp = () => {
  Tone.Transport.bpm.value = 126.25;
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "4:0:0";

  const audioFiles = [
    "https://f.4bars.media/6E/52/6E52A9C1F2DD41ABA6397F82CD3C619B.ogg",
    "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg",
  ];

  audioFiles.forEach((url) => {
    const player = new Tone.Player(url);
    player.autostart = false;
    player.loop = true;
    player.loopStart = "0:0:0";
    player.loopEnd = "4:0:0";
    player.toMaster().sync();
    player.start();
  });
};

export const emitter = new Tone.Emitter();

export const constants = {
  rotateTriangleEvent: "rotateTriangle",
  playButtonQuery: ".play-button",
  stopButtonQuery: ".stop-button",
  triangleContainerQuery: ".triangle-container",
  triangleColor: "#00c8ff",
};

export const loop = new Tone.Loop(() => {
  emitter.emit(constants.rotateTriangleEvent);
}, "8n");

export const onEmittRotationHandler = (triangleFrame, triangleGroup) => {
  triangleGroup.rotation -= Math.PI / 2;
  triangleFrame.update();
};

export const setUpTriangleRendering = () => {
  const elem = document.querySelector(constants.triangleContainerQuery);
  const triangleFrame = new Two({ width: 30, height: 30 }).appendTo(elem);

  const triangle = triangleFrame.makePolygon(0, 0, 15, 3);
  triangle.fill = constants.triangleColor;

  const triangleGroup = triangleFrame.makeGroup(triangle);
  triangleGroup.translation.set(
    triangleFrame.width / 2,
    triangleFrame.height / 2
  );
  triangleGroup.scale = 1;
  triangleGroup.noStroke();

  triangleFrame.update();

  return [triangleFrame, triangleGroup];
};

export const onPlayButtonClickHandler = () => {
  loop.start(0);
  Tone.Transport.start();
};

export const onStopButtonClickHandler = () => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
  }
};

/* NEW */

export const Emitter = new Tone.Emitter();

export const toneSetUpNew = () => {
  Tone.Transport.bpm.value = 126.25;
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "4:0:0";

  const audioFiles = [
    "https://f.4bars.media/6E/52/6E52A9C1F2DD41ABA6397F82CD3C619B.ogg",
    "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg",
  ];

  audioFiles.forEach((url) => {
    const player = new Tone.Player(url);
    player.autostart = false;
    player.loop = true;
    player.loopStart = "0:0:0";
    player.loopEnd = "4:0:0";
    player.toDestination().sync();
    player.start();
  });
};

export const loopNew = new Tone.Loop(() => {
  //triggered every eighth note.
  Emitter.emit("trigerEightNote");
}, "8n").start(0);

export const onPlayButtonClickHandlerNew = () => {
  loopNew.start(0);
  Tone.Transport.start();
};

export const onStopButtonClickHandlerNew = () => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
  }
};

export const setUpTriangleRenderingNew = () => {
  const elem = document.getElementById("triangle");
  if (elem) {
    let two = new Two({ width: 100, height: 100 }).appendTo(elem);

    let triangle = two.makePolygon(20, 20, 20);
    triangle.linewidth = 2;
    triangle.translation = new Two.Vector(50, 50);
    triangle.stroke = "red";
    triangle.fill = "red";
    triangle.rotation = 0;
    triangle.parent = two;
    two.update();

    return [triangle, two];
  }
};

export const onEmittRotationHandlerNew = (triangle, two) => {
  two.rotation -= Math.PI / 2;
};

export const makeRotator = (obj) => {
  return function () {
    obj.rotation += Math.PI / 2;
    obj.parent.update();
  };
};

export let rotateCW90deg = setUpTriangleRenderingNew();
