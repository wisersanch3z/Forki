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
    .setName("nmsg")
    .setDescription("boton test")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`youtube`)
        .setLabel(`Youtube`)
        .setEmoji(`🎬`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId(`proximovideo`)
        .setLabel(`Proximos Videos`)
        .setEmoji(`👀`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId(`anuncios`)
        .setLabel(`Anuncios`)
        .setEmoji(`📢`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`serverupdates`)
        .setLabel(`Server Updates`)
        .setEmoji(`📢`)
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setTitle(`Selecciona abajo de que te gustaria recibir notificaciones!!`)
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
