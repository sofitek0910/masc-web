import * as Tone from 'tone';
import Two from "two.js";
import React, {useEffect, useRef, useState} from 'react';

const CreateTriangle = () => {
    let triangleElement =  useRef();
    useEffect(setup,[]);

    function setup(){
        let twoTriangle = new Two({
            width: 100,
            height: 100
        }).appendTo(triangleElement.current);
        let triangle = twoTriangle.makePolygon(20, 20, 20);
        triangle.linewidth = 2;
        triangle.translation = new Two.Vector(50, 50);
        triangle.stroke = "red";
        triangle.fill = "red";
        triangle.rotation = 0;
        triangle.parent = twoTriangle;
        triangle.className = "triangle";
        twoTriangle.update();

        function makeRotator(obj) {
            return function () {
                obj.rotation += Math.PI / 2;
                obj.parent.update();
            };
        }

        let rotateCW90deg = makeRotator(triangle, twoTriangle);

        let Emitter = new Tone.Emitter();
        Emitter.on("triggerEightNote", rotateCW90deg);

        let loop = new Tone.Loop(function () {
            Emitter.emit("triggerEightNote");
        }, "8n").start(0)
    }

    return (<div className="triangle" ref={triangleElement} style={{display: "inline-block"}}/>);
}

export default CreateTriangle;




