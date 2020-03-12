'use strict';

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram('1103650145:AAEW7Q3b3raimpT5Ftm892K3jYGtn9rM0zE', {
        workers: 1
    });

const PingController = require('./controllers/ping');
const OtherwiseController = require('./controllers/otherwise');

tg.router.when(new Telegram.TextCommand('/ping', 'pingCommand'), new PingController())
    .otherwise(new OtherwiseController());

