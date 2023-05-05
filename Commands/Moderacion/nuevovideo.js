const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("nuevovideo")
    .setDescription("Te respondere Pong!!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option.setName(`titulo`).setDescription(`asd`).setRequired(true)
    )
    .addStringOption((option) =>
      option.setName(`url`).setDescription(`asd`).setRequired(true)
    )
    .addAttachmentOption((option) =>
      option.setName(`miniatura`).setDescription(`asd`).setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const titulo = interaction.options.getString(`titulo`);
    const url = interaction.options.getString(`url`);
    const miniatura = interaction.options.getAttachment(`miniatura`);

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(url)
        .setLabel(`Link del video`)
        .setEmoji(`🎬`)
        .setStyle(ButtonStyle.Link)
    );

    const embed = new EmbedBuilder()
      .setTitle(`🎇 | Nuevo Video`)
      .addFields({ name: titulo, value: url })
      .setColor("Yellow")
      .setURL(url)
      .setImage(miniatura.url)
      .setFooter({
        text: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      })
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed], components: [button] });
    await interaction.reply({
      content: `El mensaje fue enviado correctamente`,
      ephemeral: true,
    });
  },
};
