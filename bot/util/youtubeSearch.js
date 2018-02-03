const settings = require("../../settings.json");
const request = require("superagent");

exports.search = function(input, callback) {
    const requestUrl = "https://www.googleapis.com/youtube/v3/search" + `?part=snippet&q=${escape(input)}&key=${process.env.GOOGLE_API_KEY}`;

    request.get(requestUrl, (err, response) => {
        if (!response || response.statusCode != 200) {
            return callback(null);
        };

        for (let item of response.body.items) {
            if (item.id.kind === "youtube#video") {
                let vid = item.id.videoId;
                videoUrl = `https://www.youtube.com/watch?v=${vid}`;

                return callback(videoUrl);
            };
        };
    });
};