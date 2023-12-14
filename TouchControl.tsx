import { events, useThree } from "@react-three/fiber";
import React from "react";
import { NativeTouchEvent, View } from "react-native";
import { Vector2 } from "three";


let currentGestureTouches: {[id: string]: Vector2[]} = {};
let updateCamera: boolean = false;
let cameraOffset: Vector2;

export const getCameraOffset = () => cameraOffset;
export const resetCameraUpdate = () => { updateCamera = false };
export const shouldUpdateCamera = () => updateCamera;

export default function TouchControl() {
    return <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    }} 
    onStartShouldSetResponder={(event) => {
        currentGestureTouches = {};
        return true;
    }}
    onMoveShouldSetResponder={() => {
        return true;
    }}
    onResponderMove={(event) => {
        readTouches(event.nativeEvent.touches);
    }}
    onResponderRelease={(event) => {
        console.clear();
        const directions: Vector2[] = [];

        Object.keys(currentGestureTouches).forEach(id => {
            directions.push((new Vector2())
                .subVectors(last(currentGestureTouches[id]), currentGestureTouches[id][0]));
        });

        if(directions.length == 0)
            return;


        // is movement gesture
        if(directions.length == 2)
        {
            updateCamera = true;
            cameraOffset = directions[0].normalize();
        }
    }}
    ></View>
}

function readTouches(touchesEvt: NativeTouchEvent[])
{ 
    touchesEvt.forEach(touch => {
        if(currentGestureTouches[touch.identifier] === undefined)
            currentGestureTouches[touch.identifier] = [];

        currentGestureTouches[touch.identifier].push(new Vector2(touch.pageX, touch.pageY));
    });
}

function last(array: any[])
{
    return array[array.length - 1];
}