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
    .setName("emsg")
    .setDescription("boton test")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const role = interaction.guild.roles.cache.find(
      (r) => r.id === `1057504697029758977`
    );

    const role2 = interaction.guild.roles.cache.find(
      (r) => r.id === `1057504694399934524`
    );

    const role3 = interaction.guild.roles.cache.find(
      (r) => r.id === `1057504689459052665`
    );

    const member = interaction.member;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`17`)
        .setLabel(`10-17`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`18`)
        .setLabel(`18-25`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId(`30`)
        .setLabel(`26-35`)
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setTitle(`Seleciona abajo en que rango de edades se encuentra tu edad`)
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      })
      .setColor("Yellow");

    interaction.channel.send({ embeds: [embed], components: [button] });
    interaction.reply({ content: `Mensaje enviado`, ephemeral: true });
  },
};
