const axios = require('axios');
const config = require('../config.json');

async function getAnswers(q, id, name){
  try {
    for(url of config.codebuddyApi){
      const data = await fetchFromAi(q, url, id, name);
      if (data) return data;
    }
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function fetchFromAi(q, url, id, name){
  try {
    const {data} = await axios.get(`${url}/api/poulyn?prompt=${q}&id=${id}&name=${name}`);
    
    if (data) return data.reply;
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    return null
  }
}


module.exports.config = {
  name: 'Poulyn',
  version: '1.0.0',
  hasPermission: 0,
  usePrefix: false,
  aliases: ['poulyn'],
  description: "Ah basta, ako si poulyn.",
  usages: "poulyn [prompt]",
  credits: 'Developer',
  cooldowns: 1,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const info = await api.getUserInfo(event.senderID);
  const name = info[event.senderID].name;
  const input = args.join(' ');

  if (!input) {
    api.setMessageReaction('🤨', event.messageID, () => {}, true);
    return api.sendMessage(`🎀 | 𝙿𝚘𝚞𝚕𝚢𝚗 | 
━━━━━━━━━━━━━━━━\nHello! 👋 Kumusta araw mo bhe?`, event.threadID, event.messageID);
  }

  let chatInfoMessageID = "";
  
  api.setMessageReaction('🤍', event.messageID, () => {}, true);

  try {
    const answer = await getAnswers(input, event.senderID, name);
    api.sendMessage(`🎀 | 𝙿𝚘𝚞𝚕𝚢𝚗 | 
━━━━━━━━━━━━━━━━\n${answer}`, event.threadID, event.messageID);
    api.setMessageReaction('💚', event.messageID, () => {}, true);
  } catch (error) {
    console.error(error);
    api.setMessageReaction('⚠️', event.messageID, () => {}, true);
  }
};
