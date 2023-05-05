const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Dare timeout a un usuario del servidor")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Usuario a dar timeout`)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName(`tiempo`)
        .setDescription(`Tiempo de timeout en minutos`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`razon`)
        .setDescription(`Razon de porque dar timeout al usuario`)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser(`target`);
    const tiempo = interaction.options.getInteger(`tiempo`);
    const { guild } = interaction;

    let razon = interaction.options.getString(`razon`);
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!razon) razon = "No se dio una razon";
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: `No puedes darte timeout a ti mismo`,
        ephemeral: true,
      });
    if (tiempo > 10000)
      return interaction.reply({
        content: `El timeout no puede superar los 10.000 minutos!`,
        ephemeral: true,
      });
    if (user.id === client.user.id)
      return interaction.reply({
        content: `No puedes darme timeout a mi`,
        ephemeral: true,
      });
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `No puedes dar Timeout a alguien con un rol igual o mayor al tuyo`,
        ephemeral: true,
      });
    if (!member.kickable)
      return interaction.reply({
        content: `No puedes dar timeout a alguien con un rol superior al mio`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/1044354959950487692/1053441776133885983/PRywUXcqg0v5DD6s7C3LyQ.png"
        }`,
      })
      .setTitle(`🔈 ${user.tag} ha sido timeouted`)
      .setColor(`#ff0000`)
      .setTimestamp()
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        {
          name: `Razon`,
          value: `${razon}`,
          inline: true,
        },
        {
          name: `Tiempo`,
          value: `${tiempo} minutos`,
          inline: true,
        }
      );

    await member.timeout(tiempo * 60 * 1000, razon).catch(console.error);

    interaction.reply({ embeds: [embed] });
  },
};
