const TranslateText = require("translate");

exports.run = async (client, message, args) => {
    const language = args[0];

    const toTranslate = [];
    for (let index = 1; index < args.length; index++) {
        toTranslate.push(args[index]);
    };
    toTranslate.join(" ");

    if (language && language.length >= 2) {
        if (toTranslate.length > 0) {
            const result = await TranslateText(toTranslate, { to: language, key: process.env.GOOGLE_TRANSLATE_KEY });

            return message.reply(result);
        } else {
            return message.reply("Please, tell me what you want to translate.");
        };
    } else {
        return message.reply("Please, specify a language you want to translate to.");
    };
};

exports.help = {
    "name": "Translate",
    "usage": "<language> <text>",
    "permission-level": 1,
    "catergory": "Information"
};
