const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servericon")
    .setDescription("Te mostrare el icono del servidor"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const { guild } = interaction;
    let icon = guild.iconURL({ size: 1024, dynamic: true });

    if (!icon)
      return interaction.reply({
        content: `Este servidor no tiene un icono para mostrar :c`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle(`Este es el icono de ${guild.name}`)
      .setImage(icon);

    interaction.reply({ embeds: [embed] });
  },
};
