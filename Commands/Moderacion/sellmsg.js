const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("sellmsg")
    .setDescription("Te respondere con Pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`sell`)
        .setLabel(`Quiero un Bot`)
        .setEmoji(`🤖`)
        .setStyle(ButtonStyle.Success)
    );

    const embed = new EmbedBuilder()
      .setTitle(
        `Hola usuario! ¿Estas interesado en adquirir un bot personalizado?`
      )
      .setColor("Yellow")
      .setDescription(
        `<@581878328357683251> presta su servicio de creacion de bots de Discord, como ejemplo de su trabajo estan <@977744924382494760> y <@1041409661334736896>.`
      )
      .addFields(
        {
          name: `¿Que tipo de funciones puede tener el Bot?`,
          value: `El bot puede tener sistema de tickets, autoroles, verificacion, comandos de utilidad, comandos de moderacion, entre otros. Para alguna funcion especial puedes consultar la posibilidad de crearla.`,
        },
        {
          name: `¿Cual es el precio?`,
          value: `El precio va a variar dependiendo de la cantidad de funciones que quieras y la complejidad de estas, para poder cotizar tu bot da click en el boton de **Quiero un Bot** y envia todo lo que buscas.`,
        }
      )
      .setFooter({
        text: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      });

    await interaction.channel.send({ embeds: [embed], components: [button] });
    await interaction.reply({
      content: `El mensaje fue enviado exitosamente`,
      ephemeral: true,
    });
  },
};
