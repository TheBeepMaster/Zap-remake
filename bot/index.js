const discordjs = require("discord.js");
const client = new discordjs.Client({
    disableEveryone: true
});
const settings = require("../settings.json");
const fs = require("fs");
const permissions = require("./util/permissions.js");

client.on("ready", () => {
    client.user.setPresence({
        status: "idle",
        game: {
            name: "for commands",
            type: "WATCHING"
        }
    });
    
    console.log("Zap bot is now online.");
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild.available) return;

    if (message.content.startsWith(process.env.PREFIX)) {
        const splitted = message.content.split(" ");
        const command = splitted[0].toLowerCase().split("-")[1];
        let args = [];

        for (let index = 0; index < splitted.length; index++) {
            if (index != 0) {
                args.push(splitted[index]);
            };
        };

        const exists = fs.existsSync(`${__dirname}/commands/${command}.js`);

        if (exists) {
            const module = require(`./commands/${command}.js`);

            if (permissions.calculate(message.member) >= module.help["permission-level"]) {
                try {
                    module.run(client, message, args);
                } catch (err) {
                    console.log(`[ERROR]: ${err}`);
    
                    return message.reply("An error occured while trying to run the command. The error has been logged.");
                };
            } else {
                return message.reply("You are not authorized to execute that command. Your permission level is too low.");
            };
        };
    } else if (message.content == ".") {
        return message.channel.send("com");
    };
});

client.login(process.env.TOKEN);