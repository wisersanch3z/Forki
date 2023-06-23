const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const repitSchema = require('../../Schema/repitSchema');
const sampSchema = require("../../Schema/sampSchema");
const embed = new EmbedBuilder();
const samp = require("samp-query");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Mira la configuración establecida en este servidor"),
  category: "Config",
  usage: "",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */




  async execute(interaction, client) {

    const thw = await repitSchema.findOne({ Guild: interaction.guild.id })
    const twh = await sampSchema.findOne({ guildId: interaction.guild.id })

    const sampip = twh ? `<:onnn:1105353206051131434> [\`${twh.ip}:${twh.port}\`]` : `<:off:1105353267246026772>`;
    const repetircdoso = thw ? `<:onnn:1105353206051131434> ` : `<:off:1105353267246026772>`;

    const bruh = new EmbedBuilder()
      .setColor("22CDFF")
      .setThumbnail(interaction.guild.iconURL() || interaction.guild.animatedIconURL())
      .addFields({
        name: `Configuración establecida en ${interaction.guild.name}`,
        value: `Repetidor de mensajes: ${repetircdoso}\nIP de SA:MP: ${sampip}`
      })
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
      })

    interaction.reply({ embeds: [bruh] })

  }
}