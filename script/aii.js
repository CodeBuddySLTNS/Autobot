const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'Aii',
  version: '1.0.0',
  role: 0,
  aliases: ['aii'],
  hasPrefix: false,
  description: "An AI command with a simplified response.",
  usage: "Aii [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question.`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction("🔍", event.messageID, () => {}, true);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.setMessageReaction("⚠️", event.messageID, () => {}, true);
  }
};
