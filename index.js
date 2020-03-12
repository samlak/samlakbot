var express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {polling: true});

let openWeatherUrl = process.env.OPENWEATHER_API_URL;


var app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/start", function(req, res) {
    bot.onText(/\/check/, (msg) => {
        bot.sendMessage(msg.chat.id, "Checking the weather information in *" + msg.text.split(' ')[1] + "*", {parse_mode : "Markdown"});
        let location = msg.text.split(' ')[1];
        getForecast(location).then((result) => {
            bot.sendMessage(msg.chat.id, result);
        });
    });


    function getForecast(location){
        let newUrl = openWeatherUrl + location+"&appid="+process.env.OPENWEATHER_API_KEY;
        return axios.get(newUrl).then(response => {
            let temp = response.data.main.temp;
            //converts temperature from kelvin to celsuis
            temp = Math.round(temp - 273.15); 
            let locationName = response.data.name;
            let res = "It's " + temp + " degrees in " + locationName;
            return res;
        }).catch(error => {
            console.log(error);
        });
    }

});

app.listen(3000, () => console.log("Telegram bot is listening on port 3000!"));

