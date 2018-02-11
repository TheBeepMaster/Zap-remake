const play = require("./play.js");

exports.run = function(client, message, args) {
    if (message.member.voiceChannel) {
        play.stop(client, message);
    } else {
        return message.reply("You need to be in a voice channel to stop playing music.");
    };
};

exports.help = {
    "name": "Stop",
    "usage": "",
    "permission-level": 1,
    "catergory": "Music",
};
