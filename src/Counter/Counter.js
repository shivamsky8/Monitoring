import React,{useEffect} from 'react';

const Counter = (props) => {
    useEffect(()=>{
        props.getDataAsync()
    },[])
    return  (
        <>
        <div> {props.counterValue}</div>
        <button onClick={props.incCounter}> Increment Counter </button>
        </>
        
    )
}

export {Counter}