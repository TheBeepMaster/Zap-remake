const discordjs = require("discord.js");
const client = new discordjs.Client({
    disableEveryone: true
});
const settings = require("../settings.json");
const fs = require("fs");
const permissions = require("./util/permissions.js");
const cleverbot = require("cleverbot.io");
const cleverClient = new cleverbot(process.env.CLEVER_BOT_USER, process.env.CLEVER_BOT_KEY);

client.on("ready", () => {
    client.user.setPresence({
        status: "idle",
        game: {
            name: "for commands",
            type: "WATCHING"
        }
    });
    
    console.log("Zap bot is now online.");

    cleverClient.setNick(process.env.CLEVER_BOT_SESSION);

    cleverClient.create((err, session) => {
        if (err) throw console.log(err);
        
        console.log("Succesfully connected to cleverbot.io!");
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild || !message.guild.available);

    if (message.content.startsWith(process.env.PREFIX) && message.channel.type != "dm") {
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
    } else if (message.isMentioned(client.user)) {
        cleverClient.ask(message.cleanContent, (err, response) => {
            if (err) throw err;

            message.channel.send(response);
        });
    } else if (message.channel.type == "dm") {
        cleverClient.ask(message.cleanContent, (err, response) => {
            if (err) throw err;

            message.channel.send(response);
        });
    };
});

client.login(process.env.TOKEN);
