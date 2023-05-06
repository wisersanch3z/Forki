const { execute } = require("./ready");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    let prefix = `.`;

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