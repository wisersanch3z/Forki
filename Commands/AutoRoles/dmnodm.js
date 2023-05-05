const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("dmmsg")
    .setDescription("boton test")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const DM = interaction.guild.roles.cache.get(`1060732857846337626`);

    const NODM = interaction.guild.roles.cache.get(`1060732891249782874`);

    const member = interaction.member;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`dm`)
        .setLabel(`DM`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`nodm`)
        .setLabel(`NO DM`)
        .setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setTitle(
        `Elige si es que prefieres que te envien mensajes directos o no`
      )
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      })
      .setColor("Yellow");

    interaction.channel.send({ embeds: [embed], components: [button] });
    interaction.reply({ content: `Mensaje enviado`, ephemeral: true });
  },
};
