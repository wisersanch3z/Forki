const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userbanner")
    .setDescription("Te enseñare tu banner o el de la persona que quieras")
    .addUserOption((option) =>
      option.setName(`user`).setDescription(`Puedes mecionar a algun usuario`)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser(`user`) || interaction.user;
    if (!user) user = interaction.user;
    let member = await user.fetch({ force: true });
    let banner = user.bannerURL({ size: 512, dynamic: true });

    if (!banner)
      return interaction.reply({
        content: `${user.username} no tiene un banner para mostrar`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor(`f5ff00`)
      .setFooter({
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      })
      .setImage(`${banner}`)
      .setTitle(`Banner de ${user.username}`);

    interaction.reply({ embeds: [embed] });
  },
};
