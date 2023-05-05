const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("msg")
    .setDescription("Te respondere Pong!!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const channel = interaction.guild.channels.cache.find(
      (c) => c.id === `982806989757378641`
    );
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setTitle(
        `Hola usuario! Te recuerdo que si das un boost al servidor podras acceder a los siguiente beneficios`
      )
      .setColor(`f5ff00`)
      .setDescription(
        `1.- Tendras acceso a mi codigo con actualizaciones de los cambios que me hagan \n 2.- Podras ver los nuevos videos del canal antes que todos`
      )
      .setFooter({
        text: `${guild.name}`,
        iconURL: `${guild.iconURL({ dynamic: true })}`,
      });

    channel.send({ embeds: [embed] });
    interaction.reply({
      content: `El mensaje fue enviado con exito`,
      ephemeral: true,
    });
  },
};
