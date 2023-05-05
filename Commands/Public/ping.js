const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te respondere Pong!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    interaction.reply({ content: `Pong! **${client.ws.ping} ms**` });
  },
};
