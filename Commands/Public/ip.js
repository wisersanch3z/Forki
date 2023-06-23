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
    .setName("ip")
    .setDescription("Mira la IP del servidor de SA:MP establecido en este servidor"),

  category: "Public",
  usage: "",

  /**
     * @param {ChatInputCommandInteraction} interaction 
     */

  async execute(interaction, client) {

    let sampp = await sampSchema.findOne({ guildId: interaction.guild.id });

    if (!sampp) {
      return interaction.reply({content: `<:warningf:1109631272529186928> | La IP no esta establecida, usa **/setip** para establecerla`, ephemeral: true});
    }

    const options = {
      host: sampp.ip,
      port: sampp.port,
    };

    await samp(options, (error, query) => {
      if (error) {
        embed.setColor("DarkRed");
        embed.addFields({
          name: `🔴 Error al obtener la información`,
          value: `<:11:1105665875731816549> IP: \`${options.host}:${options.port}\`\n<:12:1105665933390925824> Estado: **Offline**`
          
        })
        return interaction.reply({embeds: [embed]})
      } else {
        embed.setColor("Green");
        embed.addFields({
          name: `🟢 ${query.hostname}`,
          value: `<:11:1105665875731816549> IP: \`${options.host}:${options.port}\`\n<:12:1105665933390925824> Estado: **Online**`
          
        })
        return interaction.reply({embeds: [embed]})
      }
    });

    return;
  },
};
