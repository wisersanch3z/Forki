const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");



  module.exports = {
    data: new SlashCommandBuilder()
      .setName("volume")
      .setDescription("Ajusta el volumen de la música")
      .addNumberOption(option => 
        option.setName("volumen")
        .setDescription("Elije el volumen el que este la música")
        .setRequired(true)),
      category: "Music",
      usage: "<Volumen>",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
        const user = interaction.user;

        

        const thevolumen = interaction.options.getNumber("volumen")

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply(`<:warningf:1109631272529186928> No hay nada reproduciéndose`)
    
        queue.setVolume(thevolumen)

        const hola = new EmbedBuilder()
        .setDescription(`
       > <:succs:1109633125618811021> | El volumen fue establecido en: \`${thevolumen}%\`
        `)
        
        .setColor("Green")
        .setFooter({
         text: `Forki-DJ | Cambiado por: ${user.tag}`,
        iconURL: client.user.displayAvatarURL()
          })
        .setTimestamp()
       
        interaction.reply({embeds:[hola]})
   
    }
}