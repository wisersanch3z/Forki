const { execute } = require("./ready");

const repeatedWords = {};



module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    let prefix = `.`;


    if (!message.author.bot) {
 
   
        const word = message.content.toLowerCase();
      
        if (repeatedWords[word] && !repeatedWords[word].includes(message.author.id)) {
          message.channel.send(word);
          
          repeatedWords[word].push(message.author.id);
        } else {
         
          repeatedWords[word] = [message.author.id];
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