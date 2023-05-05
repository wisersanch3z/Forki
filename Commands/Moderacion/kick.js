const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

const { CommandCooldown, msToMinutes } = require("discord-command-cooldown");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kickeare a un usuario del servidor")
    .addUserOption((option) =>
      option
        .setName(`target`)
        .setDescription(`Usuario que sera kickeado`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`razon`)
        .setDescription(`Razon de porque kickear al usuario`)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const cooldown = new CommandCooldown("kick", ms("5h"));

    const userCooldowned = await cooldown.getUser(interaction.user.id);

    if (userCooldowned) {
      const timeLeft = msToMinutes(userCooldowned.msLeft, false); // False for excluding '0' characters for each number < 10
      const embed3 = new EmbedBuilder()
        .setTitle(
          `Necesitas esperar ${
            timeLeft.hours +
            " horas, " +
            timeLeft.minutes +
            " minutos, " +
            timeLeft.seconds +
            " segundos"
          } antes de volver a ejecutar el comando!!`
        )
        .setColor("Red");
      interaction.reply({ embeds: [embed3], ephemeral: true });
    } else {
      await cooldown.addUser(interaction.user.id);

      const user = interaction.options.getUser(`target`);
      const { guild } = interaction;

      const channel =
        interaction.guild.channels.cache.get(`1074181624222195722`);

      let razon = interaction.options.getString(`razon`);
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

      if (!razon) razon = "No se dio una razon";
      if (user.id === interaction.user.id)
        return interaction.reply({
          content: `No puedes kickearte a ti mismo`,
          ephemeral: true,
        });
      if (user.id === client.user.id)
        return interaction.reply({
          content: `No puedes kickearme a mi`,
          ephemeral: true,
        });
      if (
        member.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.reply({
          content: `No puedes kickear a alguien con un rol igual o mayor al tuyo`,
          ephemeral: true,
        });
      if (!member.kickable)
        return interaction.reply({
          content: `No puedes kickear a este usuario`,
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
        .setTitle(`🥾 | ${user.tag} Ha sido kickeado del servidor con exito`)
        .setColor("Red")
        .setTimestamp()
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .addFields({
          name: `Razon`,
          value: `${razon}`,
        });

      const logembed = new EmbedBuilder()
        .setTitle(`Nuevo Kick`)
        .setColor("Red")
        .addFields(
          { name: `Usuario Kickeado`, value: user.tag, inline: true },
          { name: `Moderador`, value: interaction.user.tag, inline: true },
          { name: `Razon`, value: razon }
        )
        .setTimestamp();

      await member.kick(razon).catch(console.error);

      await channel.send({ embeds: [logembed] });

      await interaction.reply({ embeds: [embed] });
    }
  },
};
