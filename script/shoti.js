module.exports.config = {
  name: "Shoti",
  version: "1.0.0",
  hasPermission: 0,
  credits: "libyzxy0",
  aliases: ['shoti'],
  description: "Generate a random tiktok video.",
  commandCategory: "Entertainment",
  usage: "[]",
  cooldowns: 0,
  usePrefix: true,
  dependencies: {}
};

module.exports.run = async ({ api, event, args }) => {

  api.setMessageReaction("🤍", event.messageID, (err) => {
     }, true);
  api.sendTypingIndicator(event.threadID, true);

  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const prompt = args.join(" ");

 try {
  const response = await axios.get(`https://betadash-shoti-yazky.vercel.app/shotizxx?apikey=shipazu`);
  const { shotiurl, username, nickname, duration} = response.data;
  const path = __dirname + `/cache/shoti.mp4`;
  const file = fs.createWriteStream(path);
  const rqs = request(encodeURI(shotiurl));
  rqs.pipe(file);
  file.on(`finish`, () => {
     setTimeout(function() {
       api.setMessageReaction("💚", event.messageID, (err) => {
          }, true);
      return api.sendMessage({
      body: `Username: @${username}\nNickname: ${nickname}\nDuration: ${duration}`, 
      attachment: fs.createReadStream(path)
    }, threadID);
      }, 5000);
        });
  file.on(`error`, (err) => {
      api.sendMessage(`Error: ${err}`, threadID, messageID);
  });
   } catch (err) {
    api.sendMessage(`Error: ${err}`, threadID, messageID);
  };
};
