// import axios from "axios";
const axios = require("axios");

exports.getWorldWide = async (req, res) => {
  axios({
    method: "GET",
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
    }
  })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send({ err });
    });
};

exports.getCountryWise = async (req, res) => {
  const { country } = req.query;
  axios({
    method: "GET",
    url:
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
    },
    params: {
      country: country
    }
  })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send({ err });
    });
};

exports.getAffectedCountry = async (req, res) => {
  axios({
    method: "GET",
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
    }
  })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send({ err });
    });
};
