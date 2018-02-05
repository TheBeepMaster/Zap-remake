function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    };
};

exports.run = function(client, message, args) {
    if (message.author.id !== "208666671194439681")
        return message.reply("You are not authorized to execute this command. This command is restricted to the bot creator.");

    try {
        let evaled = eval(args.join(" "));

        message.channel.send(clean(evaled).toString(), {code: "xl"});
    } catch(err) {
        message.channel.send("ERROR: ```" + err + "\n```", {code: "xl"});
    }
};

exports.help = {
    "name": "Eval",
    "usage": "<Code>",
    "permission-level": 2,
    "catergory": "Owner Only",
};
