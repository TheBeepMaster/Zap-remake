const discordjs = require("discord.js");
const fs = require("fs");

exports.help = function(client, message, args) {
    const commands = fs.readdirSync(__dirname);
    const embed = new discordjs.RichEmbed();
    
    for (let command of commands) {
        const cmd_module = require(command);
        const help = cmd_module.help;

        embed.addField(help["name"], `Permission level: **${help["permission-level"]}**\nUsage: **${help["usage"]}**\nCategory: **${help["catergory"]}**`);
    };

    message.author.send({embed: embed});
};

exports.help = {
    "name": "Cmds",
    "usage": "",
    "permission-level": 1,
    "catergory": "Information"
};
