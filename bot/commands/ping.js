exports.run = function(client, message, args) {
    return message.reply(`Pong! ${client.ping}ms`);
};

exports.help = {
    "name": "Ping",
    "usage": "",
    "permission-level": 1,
    "catergory": "Information",
}