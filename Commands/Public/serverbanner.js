const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverbanner")
    .setDescription("Te mostrare el banner del servidor"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const { guild } = interaction;
    let banners = guild.bannerURL({ size: 512, dynamic: true });

    if (!banners)
      return interaction.reply({
        content: `${guild.name} no tiene un banner para mostrar`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle(`Banner del servidor ${guild.name}`)
      .setImage(`${banners}`)
      .setFooter({
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });
    interaction.reply({ embeds: [embed] });
  },
};
