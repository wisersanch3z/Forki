const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");

  const repitSchema = require('../../Schema/repitSchema')
  
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
            

   
    const repetircdoso = thw ? '✅' : '❌';

    const bruh = new EmbedBuilder()
    .setColor("#2F3136")
    .setTitle(`🛠 | Configuración establecida en ${interaction.guild.name}`)
    .setDescription(`Repetir mensajes: ${repetircdoso}`)
    .setFooter({text: "Forki systems!"})

    interaction.reply({embeds: [bruh]})

    }
}