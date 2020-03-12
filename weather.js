const bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");

const TelegramBot = require('node-telegram-bot-api');

let openWeatherUrl = process.env.OPENWEATHER_API_URL;
const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {polling: true});

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