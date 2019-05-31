const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 9000;

const WOLFRAM_API_KEY = process.env.WOLFRAM;

app.get("/login/quotes", (req, res) => {
  axios
    .get("https://api.adviceslip.com/advice")
    .then(response => res.send(response.data));
});

app.get("/main/wolfram/:query", (req, res) => {
  let link =
    "http://api.wolframalpha.com/v2/query?input=" +
    req.params.query +
    "&appid=G46Y72-L8RU6XJHYX&format=text&output=json";
  axios.get(link).then(response => {
    let img = response.data.queryresult.pods;
    res.send(img);
    console.log(req.params.query)
    console.log(response.data)
  });
});

app.listen(port, () => console.log(`Server is now running on port ${port}`));
