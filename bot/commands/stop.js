const play = require("./play.js");

exports.run = function(client, message, args) {
    if (message.member.voiceChannel) {
        const connection = client.voiceConnections.find("id", message.member.voiceChannel.id);
        if (connection) {
            play.stop();
        } else {
            return message.reply("There's no voice connection found.");
        };
    } else {
        return message.reply("You need to be in a voice channel to stop playing music.");
    };
};

exports.help = {
    "name": "Stop",
    "usage": "",
    "permission-level": 1,
    "catergory": "Music",
}