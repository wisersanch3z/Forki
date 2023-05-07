const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te dire PONG jje"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    interaction.reply({ content: `Pong! **${client.ws.ping} ms**` });
  },
};
