const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("proximovideo")
    .setDescription("Te respondere Pong!!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option.setName(`titulo`).setDescription(`asd`).setRequired(true)
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
    const miniatura = interaction.options.getAttachment(`miniatura`);

    const embed = new EmbedBuilder()
      .setTitle(`👀 | Se aproxima un nuevo Video`)
      .addFields({
        name: titulo,
        value: `\nLos boosters ya tienen acceso a este video \n\nLos boosters tienen acceso al archivo con el codigo`,
      })
      .setImage(miniatura.url)
      .setTimestamp()
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      });

    await interaction.channel.send({ embeds: [embed] });
    await interaction.reply({ content: `Mensaje enviado`, ephemeral: true });
  },
};
