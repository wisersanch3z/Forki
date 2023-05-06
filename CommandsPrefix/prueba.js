const { Message } = require("discord.js");

module.exports = {
  name: "prueba",
  /**
   *
   * @param {Message} message
   */
  async execute(message, args) {
    message.channel.send({ content: `q` });
  },
};
