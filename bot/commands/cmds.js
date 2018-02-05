const discordjs = require("discord.js");
const fs = require("fs");

exports.run = function(client, message, args) {
    const commands = fs.readdirSync(__dirname);
    const embed = new discordjs.RichEmbed();
    embed.setTitle("Commands list");
    embed.setColor(0x7c7c7c);
    embed.setTimestamp();
    embed.setAuthor("Zap bot, made by TheBeepMaster#0506.");

    for (let command of commands) {
        const cmd_module = require(`./${command}`);
        const help = cmd_module.help;

        if (help["usage"].length > 0) {
            embed.addField(help["name"], `Permission level: **${help["permission-level"]}**\nUsage: **${help["usage"]}**\nCategory: **${help["catergory"]}**`);
        } else {
            embed.addField(help["name"], `Permission level: **${help["permission-level"]}**\nUsage: **No usage**\nCategory: **${help["catergory"]}**`);
        };
    };

    message.author.send({embed: embed});
};

exports.help = {
    "name": "Cmds",
    "usage": "",
    "permission-level": 1,
    "catergory": "Information"
};
