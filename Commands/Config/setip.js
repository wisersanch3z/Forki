const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const sampSchema = require("../../Schema/sampSchema");
const embed = new EmbedBuilder();
const samp = require("samp-query");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setip")
    .setDescription("Establece una IP de SA:MP")
    .addStringOption(option =>
      option.setName("ip")
        .setDescription("Escribe la IP deseada de SA:MP")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("port")
        .setDescription("Escribe el PORT deseado de SA:MP (por default: 7777)")
        .setRequired(false)),

  category: "Config",
  usage: "<IP>",

  /**
     * @param {ChatInputCommandInteraction} interaction 
     */

  async execute(interaction, client) {

    const ip = interaction.options.getString("ip");
    const port = interaction.options.getString("port") || "7777";
    let samp = await sampSchema.findOne({ guildId: interaction.guild.id });



    if (!samp) {
      let newip = await sampSchema.create({
        guildId: interaction.guild.id,
        ip: ip,
        port: port,
      });
      newip.save();
      return interaction.reply(
        `<:succs:1109633125618811021> | La ip se agrego correctamente: **IP: ${ip}:${port}**`
      );
    } else {
      await sampSchema.findOneAndUpdate({
        guildId: interaction.guild.id,
        ip: ip,
        port: port,
      });
      return interaction.reply(
        `<:succs:1109633125618811021> | La ip se actualizo correctamente a: **IP: ${ip}:${port}**`
      );
    }


  },
};
