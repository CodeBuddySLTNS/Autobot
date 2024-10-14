const axios = require('axios');
const config = require('../config.json');

async function getAnswers(q, id){
  try {
    for(url of config.codebuddyApi){
      const data = await fetchFromAi(q, url, id);
      if (data) return data;
    }
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function fetchFromAi(q, url, id){
  try {
    const {data} = await axios.get(`${url}/api/gpt4o?prompt=${q}&id=${id}`);
    
    if (data) return data.reply;
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    return null
  }
}


module.exports.config = {
  name: 'Ai',
  version: '1.0.0',
  hasPermission: 0,
  usePrefix: false,
  aliases: ['gpt', 'ai'],
  description: "An AI command powered by GPT-4",
  usages: "ai [prompt]",
  credits: 'Developer',
  cooldowns: 1,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    return api.sendMessage(`✧⁠     ∩_∩\n✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  \n┏━━∪∪━━━━━━━━━┓ \n✿        𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆      ✿\n┗━━━━━━━━━━━━━┛\n━━━━━━━━━━━━━━━\nHow can I assist you today?\n━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
  }

  // if (input === "clear") {
  //   try {
  //     await axios.post('https://gaypt4ai.onrender.com/clear', { id: event.senderID });
  //     return api.sendMessage("Chat history has been cleared.", event.threadID, event.messageID);
  //   } catch (error) {
  //     console.error(error);
  //     return api.sendMessage('An error occurred while clearing the chat history.', event.threadID, event.messageID);
  //   }
  // }


  let chatInfoMessageID = "";
  
  api.setMessageReaction("🔍", event.messageID, () => {}, true);

  try {
    // const url = (event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo")
    //   ? { link: event.messageReply.attachments[0].url }
    //   : {};

    // const { data } = await axios.post('https://gaypt4ai.onrender.com/chat', {
    //   prompt: input,
    //   customId: event.senderID,
    //   ...url
    // });
    
    const answer = await getAnswers(input, event.senderID);
    
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    const aiq = `✧⁠     ∩_∩\n✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  \n┏━━∪∪━━━━━━━━━┓ \n✿        𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆      ✿\n┗━━━━━━━━━━━━━┛\n━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━`;
    api.sendMessage(aiq, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    api.setMessageReaction('⚠️', event.messageID, () => {}, true);
  }
};
