const cron = require("node-cron");
const express = require("express");
const axios = require("axios").default;
const chalk = require("chalk");

app = express();
cron.schedule("*/10 * * * * *", function () {
  var url =
    "https://mobilijeune.actionlogement.fr/api/dossiers/1.0/checkDailyQuota";

  var DateTime = new Date();
  const getData = axios.get(url).then((response) => {
    if (response.data === false)
      console.log(
        chalk.bgRed(
          `[${DateTime.getHours()}:${DateTime.getMinutes()}:${DateTime.getSeconds()}] ${
            response.data.toString().toUpperCase()
          }`
        )
      );
    else
      console.log(
        chalk.bgGreen(
          `[${DateTime.getHours()}:${DateTime.getMinutes()}:${DateTime.getSeconds()}] ${
            response.data.toString().toUpperCase()
          }`
        )
      );
  });

  axios.all([getData]);
});
app.listen(6666);
