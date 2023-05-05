const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Te enseñare la informacion sobre mi"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(`Canal de Youtube`)
        .setEmoji(`🎥`)
        .setURL(`https://www.youtube.com/@PolloGang`)
    );

    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setAuthor({
        name: `${client.user.tag}`,
        iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
      })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTitle(
        `Hola ${interaction.user.username} yo soy ${client.user.username}`
      )
      .setDescription(
        `Soy el bot oficial de la PolloGang, mi objetivo es poder servir para multiples funciones dentro del servidor.`
      )
      .setImage(
        `https://cdn.discordapp.com/attachments/1044354959950487692/1056409542977671238/Copia_de_POLLOGANGBOTPLUS_1.png`
      )
      .addFields(
        {
          name: "Fui creado",
          value: [
            `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
          ].join("\n"),
        },
        { name: `He sido creado por:`, value: `<@581878328357683251>` }
      );

    interaction.reply({ embeds: [embed], components: [button] });
  },
};
