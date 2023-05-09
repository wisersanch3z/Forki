const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");

  const repitSchema = require('../../Schema/repitSchema');
const { options } = require("superagent");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("config")
      .setDescription("Mira la configuración establecida en este servidor"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
  

    

    async execute(interaction, client) {
  
   const thw = await repitSchema.findOne({ Guild: interaction.guild.id})
            

   
    const repetircdoso = thw ? '<:onnn:1105353206051131434>' : '<:off:1105353267246026772>';

    const bruh = new EmbedBuilder()
    .setColor("0077be")
    .setThumbnail(interaction.guild.iconURL() || interaction.guild.animatedIconURL())
    .setTitle(`Configuración establecida en: ${interaction.guild.name}`)
    .setDescription(
  `Repetidor de mensajes: ${repetircdoso}\n
  `)
    .setFooter({text: `Solicitado por: ${interaction.user.username}`})

    interaction.reply({embeds: [bruh]})

    }
}