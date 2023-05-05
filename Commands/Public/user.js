const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Te enseñare la informacion del usuario que quieras")
    .addUserOption((option) =>
      option.setName(`user`).setDescription(`Puedes mecionar a algun usuario`)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const user = interaction.options.getUser(`user`) || interaction.user;
    if (!user) user = interaction.user;
    const miembro = await interaction.guild.members.fetch(user.id);
    let member = await user.fetch({ force: true });

    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setAuthor({
        name: `${user.tag}`,
        iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
      })
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setImage(user.bannerURL({ size: 512 }))
      .setTitle(`Información de ${user.username}`)
      .addFields(
        {
          name: "🌎 | General",
          value: [`📜 **Tag:** <@${user.id}>`, `👑 **ID:** ${user.id}`].join(
            "\n"
          ),
        },
        {
          name: `Cuenta Creada`,
          value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Se unió`,
          value: `<t:${parseInt(miembro.joinedAt / 1000)}:R>`,
          inline: true,
        },
        {
          name: "Banner",
          value: user.bannerURL() ? "** **" : "🎏 None",
        }
      );

    interaction.reply({ embeds: [embed] });
  },
};
