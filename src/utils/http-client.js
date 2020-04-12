import axios from "axios";

const instance = axios.create({
  baseURL: "https://coronavirus-monitor.p.rapidapi.com/coronavirus",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
  }
});

export default instance;
