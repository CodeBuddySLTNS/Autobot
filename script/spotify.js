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
  
  try {
    const res = await axios.get('https://hiroshi-api.onrender.com/tiktok/spotify', {
      params: { search: input }
    });
    if (!res || !res.data || res.data.length === 0) {
      throw new Error("No results found");
    }

    const { name: trackName, download, image, track } = res.data[0];
    await api.sendMessage({
      body: `🎶 Now playing: ${trackName}\n\n🔗 Spotify Link: ${track}`,
      attachment: {
        type: "audio",
        payload: {
          url: download
        }
      }
    }, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
    api.sendMessage('Error retrieving Spotify track. Please check your ', event.threadID, event.messageID);
  }
};