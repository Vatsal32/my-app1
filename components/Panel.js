import React from "react";
import Item from "./Item";

function dist(arr, dst) {
    let ans = 100000;

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(arr[i] - dst) < ans) {
            ans = Math.abs(arr[i] - dst);
        }
    }

    return ans;
}

const Panel = (props) => {
    let i = 0;
    return (
        <>
            {
                props.items.map((item) => (
                    <Item key={i++} {...item} distance={dist(item.station_path, props.listCity[props.city])}/>
                ))
            }
        </>
    );
}

export default Panel