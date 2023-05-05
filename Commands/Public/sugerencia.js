const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sugerencia")
    .setDescription("Envia alguna recomendacion al servidor")
    .addStringOption((option) =>
      option
        .setName(`sugerencia`)
        .setDescription(`Escribe aqui tu sugerencia`)
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const sugerencia = interaction.options.getString(`sugerencia`);

    const { guild } = interaction;

    const channel = interaction.guild.channels.cache.find(
      (c) => c.id === `1057042055295148173`
    );

    const embed = new EmbedBuilder()
      .setTitle(`Sugerencia de ${interaction.user.username}`)
      .setColor(`f5ff00`)
      .setDescription(`${sugerencia}`)
      .setFooter({
        text: `${guild.name} | Usa /sugerencia para enviar tu sugerencia`,
        iconURL: `${guild.iconURL({ dynamic: true })}`,
      });

    const message = await channel.send({
      embeds: [embed],
      fetchReply: true,
    });

    message.react(`👍`);
    message.react(`👎`);

    interaction.reply({
      content: `Tu sugerencia fue agregada con exito`,
      ephemeral: true,
    });
  },
};
