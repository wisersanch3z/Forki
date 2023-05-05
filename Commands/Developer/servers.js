const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Te respondere con Pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Este es el listado de servidores`)
      .setDescription(`Estoy en ${client.guilds.cache.size} servers`)
      .addFields({
        name: `Servidores en los que estoy`,
        value: `${client.guilds.cache.map((x) => x.name).join("\n\n")}`,
      });

    await interaction.reply({
      content: `Te envie el listado de servidores en los que estoy`,
    });
    await interaction.member.send({ embeds: [embed] });
  },
};
