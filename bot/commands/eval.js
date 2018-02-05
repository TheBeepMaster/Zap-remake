function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    };
};

exports.run = function(client, message, args) {
    try {
        let evaled = eval(args.join(" "));

        message.channel.send(clean(evaled) || "undefined", {code: "xl"});
    } catch(err) {
        message.channel.send("ERROR: " + err, {code: "xl"});
    };
};

exports.help = {
    "name": "Eval",
    "usage": "<Code>",
    "permission-level": 2,
    "catergory": "Owner Only",
};
