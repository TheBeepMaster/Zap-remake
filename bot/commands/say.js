exports.run = function(client, message, args) {
    message.delete();
    
    return message.channel.send(args.join(" "));
};

exports.help = {
    "name": "Say",
    "usage": "<Message>",
    "permission-level": 1,
    "catergory": "Fun",
};