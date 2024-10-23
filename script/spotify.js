module.exports.config = {
  name: 'Spotify',
  version: '1.0.0',
  role: 0,
  aliases: ['spotify', 'play'],
  hasPrefix: false,
  description: "spotify message spammer.",
  usage: "spotify [music title]",
  credits: 'Developer',
  cooldown: 1,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    return api.sendMessage(`Usage: spotify [music title]`, event.threadID, event.messageID);
  }
  
  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");

  try {
    const res = await axios.get('https://hiroshi-api.onrender.com/tiktok/spotify', {
      params: { search: input }
    });
    if (!res || !res.data || res.data.length === 0) {
      throw new Error("No results found");
    }

    const { name: trackName, download, image, track } = res.data[0];
    
    const path = __dirname + `/cache/spotify.mp3`;
    const file = fs.createWriteStream(path);
    const rqs = request(encodeURI(download));
    rqs.pipe(file);
    file.on(`finish`, () => {
       setTimeout(function() {
        return api.sendMessage({
          body: `🎶 Now playing: ${trackName}\n\n🔗 Spotify Link: ${track}`,
          attachment: fs.createReadStream(path)
        }, threadID);
      }, 5000);
    });
    file.on(`error`, (err) => {
      api.sendMessage(`Error: ${err}`, threadID, messageID);
    });
  } catch (error) {
    console.log(error);
    api.sendMessage(`Error retrieving Spotify track. Please try again later.`, threadID, messageID);
  }
};