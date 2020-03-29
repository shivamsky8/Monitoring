import axios from "axios";
import {storeData} from './actions'

function getDataAsync() {
    return (dispatch) => {
       axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res =>{
        console.log(res.data)
        return res.data
      })
      .then((data) => dispatch(storeData(data)))
    }
}

export {getDataAsync}