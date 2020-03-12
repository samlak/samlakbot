process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const token = '1103650145:AAEW7Q3b3raimpT5Ftm892K3jYGtn9rM0zE';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, msg.text);
    
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        // bot.sendMessage(msg.chat.id, "How are you " + msg.from.first_name);
        // bot.sendMessage(msg.chat.id,"Hello dear user");
        // bot.sendMessage(msg.chat.id,"<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.learnershood.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
        bot.sendMessage(msg.chat.id, 
            '*bold text* \n _italic text_ \n [text](http://www.example.com/) `inline fixed-width code`' ,{parse_mode : "Markdown"});
    }
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        // bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
        
        bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name); 
    } 
    var robot = "I'm robot";
    if(msg.text.indexOf(robot) === 0){
        bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
    }

    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id,44.97108, -104.27719);
        bot.sendMessage(msg.chat.id, "Here is the point");
    }
    
    var picture = "picture";
    if(msg.text.indexOf(picture) === 0){
        let user = bot.getUserProfilePhotos(msg.chat.id);
        bot.sendPhoto(
            msg.chat.id, 
            user, 
            {caption : "This the image you requested for \n there something else to this"}
        );
    }
});

// bot.onText(/\/start/, (msg) => {
//     bot.sendMessage(msg.chat.id, "Welcome to the mother fucking bot");
// });

bot.onText(/\/sendpic/, (msg) => {
    bot.sendPhoto(
        msg.chat.id, 
        "http://learnershood.com/images/pair_programming.png", 
        {caption : "This the image you requested for \n there something else to this"}
    );
});

bot.onText(/\/sendaudio/, (msg) => {
    bot.sendAudio(
        msg.chat.id, 
        "https://www.hoerspielbox.de/wp-content/blogs.dir/sites/1/4-4-10002.mp3", 
        {caption : "This the audio you requested for \n there something else to this"});
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to the mother fucking bot", {
        "reply_markup": {
            "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        }
    });
});
