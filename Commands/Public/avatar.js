const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Te enseñare el avatar del usuario que quieras")
    .addUserOption((option) =>
      option.setName(`user`).setDescription(`Puedes mecionar a algun usuario`)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client, message) {
    const user = interaction.options.getUser(`user`) || interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.tag}`)
      .setDescription(
        `[PNG](${user.avatarURL({ format: `png` })}) / [WEBP](${user.avatarURL({
          dynamic: true,
        })}) / [JPG](${user.avatarURL({ format: `jpg` })})`
      )
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setFooter({
        text: `Pedido por: ${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });

    interaction.reply({ embeds: [embed] });
  },
};
