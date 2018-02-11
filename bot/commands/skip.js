const play = require("./play.js");

exports.run = function(client, message, args) {
    if (message.member.voiceChannel) {
        play.skip(client, message);
    } else {
        return message.reply("You need to be in a voice channel to stop playing music.");
    };
};

exports.help = {
    "name": "Skip",
    "usage": "",
    "permission-level": 1,
    "catergory": "Music",
};
