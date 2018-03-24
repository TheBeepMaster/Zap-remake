const discordjs = require("discord.js");
const wikipedia = require("wtf_wikipedia");

exports.run = function(client, message, args) {
    const searchString = args.join(" ");

    wikipedia.from_api(searchString, "nl", (markdown) => {
        const data = wikipedia.parse(markdown);

        console.log(data);

        // const embed = new discordjs.RichEmbed();
    });
};

exports.help = {
    "name": "Wikisearch",
    "usage": "<Search String>",
    "permission-level": 1,
    "catergory": "Information",
};
