const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonInteraction,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("vmsg")
    .setDescription("boton test")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const role = interaction.guild.roles.cache.get(`1057488201297690664`);

    const role2 = interaction.guild.roles.cache.get(`1057488205307461782`);

    const role3 = interaction.guild.roles.cache.get(`1057488208667103262`);

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`V14`)
        .setLabel(`V14`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`V13`)
        .setLabel(`V13`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId(`V12`)
        .setLabel(`V12`)
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setTitle(`Seleciona abajo las versiones de discord.js que domines`)
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      })
      .setColor("Yellow");

    interaction.channel.send({ embeds: [embed], components: [button] });
    interaction.reply({
      content: `Mensaje enviado correctamente`,
      ephemeral: true,
    });
  },
};
