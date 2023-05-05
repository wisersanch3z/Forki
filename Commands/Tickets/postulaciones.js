const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("postulaciones")
    .setDescription("asd")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`posthelper`)
        .setLabel(`Helper`)
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId(`postmod`)
        .setLabel(`Moderador`)
        .setStyle(ButtonStyle.Success)
        .setDisabled(true),

      new ButtonBuilder()
        .setCustomId(`postadmin`)
        .setLabel(`Admin`)
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true)
    );

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      })
      .setColor("Yellow")
      .setTitle(
        `Elige en los botones de abajo a que rol te gustaria postularte`
      )
      .setDescription(
        `Posteriormente se creara un canal con una serie de preguntas que deberas responder para finalmente saber si eres elegido para recibir el rol`
      )
      .setFooter({ text: `Por el momento solo se estan aceptando Helpers` });

    await interaction.channel.send({ embeds: [embed], components: [button] });
    await interaction.reply({
      content: `El mensaje se envio correctamente`,
      ephemeral: true,
    });
  },
};
