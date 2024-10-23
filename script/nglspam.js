module.exports.config = {
  name: 'NGLspam',
  version: '1.0.0',
  role: 0,
  aliases: ['nglspam', 'ngl'],
  hasPrefix: false,
  description: "NGL message spammer.",
  usage: "nglspam",
  credits: 'Developer',
  cooldown: 1,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(" ").split("|").map(item => item.trim());
  
  if (input.length !== 3) {
    return api.sendMessage("Invalid format. Usage: nglspam username | message | count", event.threadID, event.messageID);
  }
  
  const [username, message, count] = input;
  const total = parseInt(count, 10);
  
  if (isNaN(total) || total <= 0) {
    return api.sendMessage("The count must be a positive integer.", event.threadID, event.messageID);
  }
  
  api.sendMessage(`Sending ${total} messages to ${username}...`, event.threadID, event.messageID);
  try {
    // Encode message to handle spaces and special characters
    const apiUrl = `https://markdevs69v2-679r.onrender.com/api/other/nglspam?username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}&total=${total}`;
  
    // Perform the API request
    const response = await axios.get(apiUrl);
  
    if (response.data && response.data.status === true) {
      const result = response.data.result;
      api.sendMessage(result, event.threadID, event.messageID);
    } else {
      api.sendMessage(`Failed to send messages. Please check the details and try again.`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error in NGL Spam command:", error);
      api.sendMessage(`An error occurred while sending the messages. Please try again.`, event.threadID, event.messageID);
  }
};
