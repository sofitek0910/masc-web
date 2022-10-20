import React, {useEffect, useRef} from "react";
import * as Tone from 'tone';
import Two from "two.js";
import * as axios from "axios";


function CreatePattern({
                           guid,
                           tonDataSettings,
                           selection,
                           key
                       }) {

    let patternElement = useRef();

    useEffect(setup, [tonDataSettings]);

    function setup() {
        let BLOCK_RADIUS = 5;
        let ASSET_BLOCK_SIZE = 24;
        let LINE_SIZE = 2;
        let isSelected = selection;


        let setSelect = (e, thisBlock, player, selector, loop) => {
            let dropDownModeImmediate = document.getElementById('immediate-selected-end').checked

            if (e.target.closest("#aboveditor")) {
                if (e.target.closest("." + thisBlock.className) === thisBlock) {
                    if (isSelected) {
                        isSelected = false
                        selector.opacity = 0;
                    } else {
                        isSelected = true
                        /*thisBlock.style.backgroundColor = "PaleGreen"*/
                        thisBlock.style.borderWidth = "3px"
                        selector.opacity = 1;
                        loop.start(0)
                    }
                } else {
                    isSelected = false;
                    thisBlock.style.backgroundColor = ""
                    selector.opacity = 0;
                    loop.stop(0)
                }
                if (!dropDownModeImmediate) {
                    player.mute = !isSelected;
                }
            } else {
                return e;
            }

        }

        let createSamplerBlock = (track) => {
            let samplerBlock = document.createElement("div");
            let multiPlayer = new Tone.Players()
            samplerBlock.className = "sampler-block";
            samplerBlock.style.display = 'inline-block';
            document.body.appendChild(samplerBlock);
            document.body.addEventListener('dblclick', (e) => {
                setSelect(e, samplerBlock, multiPlayer, borderGroup, loop)
            })

            samplerBlock.onmousedown = (e) => {
                onMousedownSampler(e, samplerBlock);
            }

            let baseTwo = new Two({
                width: ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 + track.length * ASSET_BLOCK_SIZE,
                height: ASSET_BLOCK_SIZE * track.length + LINE_SIZE + 7 + track.length + 25
            });
            baseTwo.appendTo(samplerBlock);
            samplerBlock.onmouseup = () => {
                baseTwo.update();
            }

            let samplerGroup = baseTwo.makeGroup();

            let patternBlock = createPatternBlock(track.length);
            patternBlock.addTo(samplerGroup);

            let selectBorder = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE / 2 * track.length + 1,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE / 2 + 2,
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE / 2 * track.length + 1,
                -baseTwo.height / 2 + (track.length + 10) + ASSET_BLOCK_SIZE / 2 + 2);
            selectBorder.stroke = "red";

            let selectBorder2 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE / 2 + 2,
                -(baseTwo.width / 2) + track.length + 10 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE / 2 + 2);
            selectBorder2.stroke = "red";

            let selectBorder3 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + 2 + ASSET_BLOCK_SIZE / 2,
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 - (track.length + 10) + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + 2 + ASSET_BLOCK_SIZE / 2);
            selectBorder3.stroke = "red";

            let selectBorder4 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 - 1 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + 2 + ASSET_BLOCK_SIZE / 2,
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 - 1 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + 2 + track.length + 10 + ASSET_BLOCK_SIZE / 2);
            selectBorder4.stroke = "red";

            let selectBorder5 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 4 + 1 + ASSET_BLOCK_SIZE / 2,
                -(baseTwo.width / 2) + track.length + 10 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 4 + 1 + ASSET_BLOCK_SIZE / 2);
            selectBorder5.stroke = "red";

            let selectBorder6 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 5 + ASSET_BLOCK_SIZE / 2,
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 5 - (track.length + 10) + ASSET_BLOCK_SIZE / 2);
            selectBorder6.stroke = "red";

            let selectBorder7 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 4 + ASSET_BLOCK_SIZE / 2 + 1,
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 4 - (track.length + 10) + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 4 + ASSET_BLOCK_SIZE / 2 + 1);
            selectBorder7.stroke = "red";

            let selectBorder8 = baseTwo.makeLine(
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 3 + 1 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 5 + ASSET_BLOCK_SIZE / 2,
                -(baseTwo.width / 2) + ASSET_BLOCK_SIZE * 2 + LINE_SIZE * 3 + 1 + ASSET_BLOCK_SIZE / 2 * track.length,
                -baseTwo.height / 2 + ASSET_BLOCK_SIZE * track.length + LINE_SIZE * 5 - (track.length + 10) + ASSET_BLOCK_SIZE / 2);
            selectBorder8.stroke = "red";

            let borderGroup = baseTwo.makeGroup();
            (selectBorder).addTo(borderGroup);
            (selectBorder2).addTo(borderGroup);
            (selectBorder3).addTo(borderGroup);
            (selectBorder4).addTo(borderGroup);
            (selectBorder5).addTo(borderGroup);
            (selectBorder6).addTo(borderGroup);
            (selectBorder7).addTo(borderGroup);
            (selectBorder8).addTo(borderGroup);
            borderGroup.linewidth = 2
            borderGroup.translation = new Two.Vector((baseTwo.width / 2), baseTwo.height / 2 - 1);
            borderGroup.scale = 1;
            borderGroup.opacity = 0;


            function makeRotator(rotateObj) {
                let scaleDir = 1;
                return function () {
                    rotateObj.rotation += Math.PI / 16;
                    /* obj.parent.update();*/
                    rotateObj.scale += 0.014 * scaleDir
                    if (rotateObj.scale >= 1.21 || rotateObj.scale < 1) {
                        scaleDir *= -1
                    }
                };
            }

            let rotateCW90deg = makeRotator(borderGroup);

            let Emitter = new Tone.Emitter();
            Emitter.on("triggerEightNote", rotateCW90deg);

            let loop = new Tone.Loop(function () {
                Emitter.emit("triggerEightNote");
            }, "32n")


            let loopSixteens = new Tone.Loop(() => {
                makeGradientStep(patternBlock, multiPlayer);
                baseTwo.update()
            }, "0:0:1").start(0);

            let loopQueue = new Tone.Loop(() => {
                let dropDownModeImmediate = document.getElementById('immediate-selected-end').checked
                if (dropDownModeImmediate) {
                    multiPlayer.mute = !isSelected;
                }
            }, "0:0:0").start(0);

            track.forEach((track, index) => {
                let asset = createAssetForIndex(index);
                multiPlayer.add(`${track.a_guid}${index}`, track.url, () => {
                    let player = multiPlayer.player(`${track.a_guid}${index}`)
                    playerSettings(player, track)
                    asset._renderer.elem.addEventListener("mouseup", (e) => {
                        onClickAsset(e, asset, player);
                    })
                })
                asset.addTo(samplerGroup);
                baseTwo.update();
            })

            if (isSelected) {
                borderGroup.opacity = 1;
                multiPlayer.mute = false;
                loop.start(0)
            } else {
                borderGroup.opacity = 0;
                multiPlayer.mute = true;
            }

            multiPlayer.toDestination()
            /*multiPlayer.mute = false;*/
            samplerGroup.translation = new Two.Vector(LINE_SIZE * 2 + ASSET_BLOCK_SIZE * track.length / 2, ASSET_BLOCK_SIZE / 2 + LINE_SIZE * 2);
            samplerGroup.linewidth = LINE_SIZE;
            samplerGroup.scale = 0.95
            baseTwo.update();
            patternElement.current.appendChild(samplerBlock);


        }

        let playerSettings = (player, track) => {
            player.autostart = false;
            player.loop = true;
            player.volume.value = track.volume;
            player.sync().start("0:0:0")
        }

        let createAssetForIndex = (index) => {
            const asset = new Two.RoundedRectangle(ASSET_BLOCK_SIZE * 1.5,
                ASSET_BLOCK_SIZE * index + ASSET_BLOCK_SIZE / 2,
                ASSET_BLOCK_SIZE, ASSET_BLOCK_SIZE, BLOCK_RADIUS);
            asset.fill = "rgb(234,199,51)";
            asset.stroke = "orange";
            asset.className = "asset";
            return asset
        }

        let onClickAsset = (e, asset, player) => {
            if (asset.fill !== "rgb(234,199,51)") {
                asset.fill = "rgb(234,199,51)";
                player.mute = false
            } else {
                asset.fill = "lightgrey";
                player.mute = true;
            }
        }

        let createPatternBlock = (length) => {
            const pattern = new Two.RoundedRectangle(
                ASSET_BLOCK_SIZE / 2, (ASSET_BLOCK_SIZE * length) / 2, ASSET_BLOCK_SIZE,
                (ASSET_BLOCK_SIZE * length), BLOCK_RADIUS);
            pattern.stroke = "orange";
            pattern.className = "pattern";
            pattern.fill = "rgb(234,199,51)";

            return pattern
        }

        let makeGradientStep = (gradient, player) => {
            let interpolationColorArray = [
                "rgb(234,199,51)",
                "rgb(204,179,64)",
                "rgb(157,152,90)",
                "rgb(105,119,117)",
                "rgb(70,98,135)"
            ]

            let transport = Tone.Transport.position.split('.')[0].split(':')
            let lastIndex = parseInt(transport[2])
            let middleIndex = parseInt(transport[1])
            let currentColor = 0;

            if (player.mute === false) {
                if (middleIndex % 2 === 0) currentColor = lastIndex;
                else currentColor = 4 - lastIndex;
            } else {
                if (isSelected) {
                    if (lastIndex % 2 === 0) currentColor = lastIndex * 2;
                    else currentColor = 2;
                }else{
                    currentColor=0;
                }


            }
            gradient.fill = interpolationColorArray[currentColor]
        }

        let onMousedownSampler = (e, sampler) => {
            let initX = e.pageX;
            let initY = e.pageY;
            const initLeft = Number.parseFloat(sampler.style.left) || 0;
            const initTop = Number.parseFloat(sampler.style.top) || 0;
            sampler.style.position = "relative";

            function moveAt(e) {
                const difX = e.pageX - initX;
                const difY = e.pageY - initY;
                sampler.style.left = initLeft + difX + 'px';
                sampler.style.top = initTop + difY + 'px';
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            sampler.ondragstart = function (e) {
                e.preventDefault()
            };
        }
        Tone.Transport.bpm.value = tonDataSettings.pattern.tempo;
        Tone.Transport.loop = true;
        Tone.Transport.loopStart = tonDataSettings.pattern.posStart;
        Tone.Transport.loopEnd = tonDataSettings.pattern.posEnd;
        createSamplerBlock(tonDataSettings.pattern.tracks);


    }

    return (
        <div className="pattern-block" style={{display: "inline-block"}}>
            <div ref={patternElement}/>
        </div>
    );
}

export default CreatePattern;