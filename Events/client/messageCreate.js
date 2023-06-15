const { execute } = require("./ready");

const repeatedWords = {};


const repitSchema = require('../../Schema/repitSchema')
  
module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    let prefix = `?`;

   
    
    if (!message.author.bot) {
      const data = await repitSchema.findOne({ Guild: message.guild.id});
      if (!data) return;
      
   
    
if (message.content || message.attachments.size > 0) {
  const content = message.content.toLowerCase();
  const attachments = message.attachments.map(a => a.url).join('\n');
  const key = content + attachments;
  
  if (repeatedWords[key] && !repeatedWords[key].includes(message.author.id)) {
    if (message.content) {
      message.channel.send(content);
    }
    if (message.attachments.size > 0) {
      message.channel.send(attachments);
    }
    repeatedWords[key].push(message.author.id);
  } else {
    repeatedWords[key] = [message.author.id];
    }
  }
  }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd =
      client.prefixs.get(command) ||
      client.prefixs.find(
        (cmd) => command.aliases && cmd.aliases.includes(command)
      );

    if (!cmd) return;

    cmd.execute(message, args);
  },
};