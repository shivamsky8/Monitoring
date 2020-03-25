import React from 'react';

const Counter = (props) => {
    return  (
        <>
        <div> {props.counterValue}</div>
        <button onClick={props.incCounter}> Increment Counter </button>
        </>
        
    )
}

export {Counter}