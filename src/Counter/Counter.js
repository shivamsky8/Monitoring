import React,{useEffect} from 'react';

const Counter = (props) => {
    console.log(props)
    useEffect(()=>{
        props.getDataAsync()
    },[])
    return  (
        <>
        <div>{props.api_Data}</div>
        <div> {props.counterValue}</div>
        <button onClick={props.incCounter}> Increment Counter </button>
        </>
        
    )
}

export {Counter}