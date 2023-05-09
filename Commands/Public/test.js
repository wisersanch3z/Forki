const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("slash test")
    .addNumberOption(option =>
      option.setName('clase')
      .setDescription('Elije el numero de una clase del 1 al 4')
      .setRequired(true)),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */


  async execute(interaction, client) {

    
    const canal = client.channels.resolve('936495044603572244')

    const clase = interaction.options.getNumber('clase');

    if(clase > 4) return interaction.reply({content: "El valor que has colocado es mayor a 4"})

    if(clase < 1) return interaction.reply({content: "El valor colocado es menor a 1"})
  
  
   if(clase == 1){

    const sociales = new EmbedBuilder()
    
    .setColor("22CDFF")
    .setDescription(
"`Mensaje programado para las 1:00pm | Viernes`\n\n\
⏰ | Link de Zoom para unirse a la clase de Sociales:\n[Click aqui para unirte](https://us05web.zoom.us/j/87340813135?pwd=bkxIMnB4QXZxYjNkL2RDVFVmdXNRdz09)\
\n\n⏹ | **Detalles del enlace**:\n🆔 | ID de reunión: 873 4081 3135\n🔐 | Código de acceso: Sociales23")
   .setFooter({text: "[STA] | Sistema de Tortura Alarmista"})
    canal.send({content: `<@&1101361745261502614>`, embeds: [sociales]})

    interaction.reply({content: "opcion 1 seleccionado"})
   }

   if(clase == 2){
    interaction.reply({content: "hola opcion2"})
   }

  
  },
};
