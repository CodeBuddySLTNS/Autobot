module.exports.config = {
  name: 'Info',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Info [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 👾\n━━━━━━━━━━━━━━━\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t★ ${commands[i]}\n`;
      }
      helpMessage += `━━━━━━━━━━━━━━━\n𝗙𝗼𝗹𝗹𝗼𝘄 𝘁𝗵𝗲 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: https://www.facebook.com/bosscleo3233
      
      𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗬𝗧: https://www.youtube.com/@CodeBuddySolutions\n━━━━━━━━━━━━━━━━\nPage ${page}/${Math.ceil(commands.length / pages)}. To view the next page, type '${prefix}info <page number>'. To view information about a specific command, type '${prefix}info <command name>'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 👾\n━━━━━━━━━━━━━━━\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t★ ${commands[i]}\n`;
      }
      helpMessage += `━━━━━━━━━━━━━━━\n𝗙𝗼𝗹𝗹𝗼𝘄 𝘁𝗵𝗲 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿: https://www.facebook.com/bosscleo3233
      
      𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗬𝗧: https://www.youtube.com/@CodeBuddySolutions\n━━━━━━━━━━━━━━━━\nPage ${page}/${Math.ceil(commands.length / pages)}. To view the next page, type '${prefix}info <page number>'. To view information about a specific command, type '${prefix}info <command name>'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const descriptionMessage = description ? `𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${description}\n` : '';
        const usageMessage = usage ? `𝚄𝚜𝚊𝚐𝚎: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';
        const message = `𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻👾\n━━━━━━━━━━━━━━━━\n𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝙽𝚊𝚖𝚎: ${name}\n${descriptionMessage}\n${usageMessage} ━━━━━━━━━━━━━━━━`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {}
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? 'This is my prefix: ' + prefix : "Sorry i don't have prefix";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
