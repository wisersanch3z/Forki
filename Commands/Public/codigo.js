const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("codigo")
    .setDescription("Envia un codigo al canal sin que se borre!!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId(`codigo`)
      .setTitle(`Envia un codigo al canal`);

    const textinput = new TextInputBuilder()
      .setCustomId(`codigoembed`)
      .setLabel(`Pega tu codigo aqui!!`)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(4000);

    modal.addComponents(new ActionRowBuilder().addComponents(textinput));

    await interaction.showModal(modal);
  },
};
