const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("sta")
    .setDescription("Sistema de Tortura Alarmista")
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
  

    //BOTONES DE LAS CLASES

    const boton1 = new ButtonBuilder()
	.setLabel('Click para unirte al Zoom de Sociales')
	.setURL('https://us05web.zoom.us/j/87340813135?pwd=bkxIMnB4QXZxYjNkL2RDVFVmdXNRdz09')
	.setStyle(ButtonStyle.Link)
  .setEmoji('1105688021812125777');

  const row1 = new ActionRowBuilder()
			.addComponents(boton1);

  const boton2 = new ButtonBuilder()
      .setLabel('Click para unirte al Zoom de Informática')
      .setURL('https://us04web.zoom.us/j/78561115699?pwd=kiGbfURj9e3sYAOdDnrUBWqNBTg2b2.1')
      .setStyle(ButtonStyle.Link)
      .setEmoji('1105688021812125777');
    
  const row2 = new ActionRowBuilder()
          .addComponents(boton2);

  const boton3 = new ButtonBuilder()
          .setLabel('Click para unirte al Zoom de Artística')
          .setURL('https://us05web.zoom.us/j/81373137268?pwd=V3FEK29EdW1ZS2U3UjZWK0FPMjk1dz09')
          .setStyle(ButtonStyle.Link)
          .setEmoji('1105688021812125777');
        
  const row3 = new ActionRowBuilder()
              .addComponents(boton3);

  const boton4 = new ButtonBuilder()
              .setLabel('Click para unirte al Zoom de Lenguaje')
              .setURL('https://us05web.zoom.us/j/86430265687?pwd=UERMOS91MXl4bkZrRHUvOGFoKzZFdz09')
              .setStyle(ButtonStyle.Link)
              .setEmoji('1105688021812125777');
            
  const row4 = new ActionRowBuilder()
                  .addComponents(boton4);
            

              
    //FIN BOTONES
  
    //CLASES OPCIONES
   if(clase == 1){

    const sociales = new EmbedBuilder()
    .setColor("Blue")
    .setDescription("⏰ ¡La clase de `Sociales` está a punto de iniciar!")
    .addFields(
      {
      name: "➜ Datos de la reunión:",
      value: [
        `<:zoom1:1105688698479190016> ID de reunión: \`873 4081 3135\``,
        `<:candado:1105688704049233960> Código de acceso: \`Sociales23\``
      ].join("\n")     
    },
    {
        name: "➜ Información extra:",
        value: [
          "La clase durara de `1:00pm` hasta `1:45pm`",
        ].join("\n"),
        inline: true
        }
    )
   .setFooter({text: "[STA] | Sistema de Tortura Alarmista"})
    canal.send({content: `<@&1101361745261502614>`, embeds: [sociales], components: [row1]})

    interaction.reply({content: "✅Clase sociales seleccionada!", ephemeral: true})
   }

   if(clase == 2){

  //CLASES INFORMATICA
    const compu = new EmbedBuilder()
    .setColor("Blue")
    .setDescription("⏰ ¡La clase de `Informática` está a punto de iniciar!")
    .addFields(
      {
      name: "➜ Datos de la reunión:",
      value: [
        `<:zoom1:1105688698479190016> ID de reunión: \`785 6111 5699\``,
        `<:candado:1105688704049233960> Código de acceso: \`INFO9-23\``
      ].join("\n")     
    },
    {
        name: "➜ Información extra:",
        value: [
          "La clase durara de `1:45pm` hasta `2:30pm`",
        ].join("\n"),
        inline: true
        }
    )
   .setFooter({text: "[STA] | Sistema de Tortura Alarmista"})
    canal.send({content: `<@&1101361745261502614>`, embeds: [compu], components: [row2]})

    interaction.reply({content: "✅Clase informatica seleccionada!", ephemeral: true})   
  
   }

   if(clase == 3){
    const artis = new EmbedBuilder()
    .setColor("Blue")
    .setDescription("⏰ ¡La clase de `Artística` está a punto de iniciar!")
    .addFields(
      {
      name: "➜ Datos de la reunión:",
      value: [
        `<:zoom1:1105688698479190016> ID de reunión: \`813 7313 7268\``,
        `<:candado:1105688704049233960> Código de acceso: \`CCJSJ2023\``
      ].join("\n")     
    },
    {
        name: "➜ Información extra:",
        value: [
          "La clase durara de `2:30pm` hasta `3:15pm`",
        ].join("\n"),
        inline: true
        }
    )
   .setFooter({text: "[STA] | Sistema de Tortura Alarmista"})
    canal.send({content: `<@&1101361745261502614>`, embeds: [artis], components: [row3]})

    interaction.reply({content: "✅Clase Artística seleccionada!", ephemeral: true})  
   }
  
   if(clase == 4){
    const lenguaje = new EmbedBuilder()
    .setColor("Blue")
    .setDescription("⏰ ¡La clase de `Lenguaje` está a punto de iniciar!")
    .addFields(
      {
      name: "➜ Datos de la reunión:",
      value: [
        `<:zoom1:1105688698479190016> ID de reunión: \`864 3026 5687\``,
        `<:candado:1105688704049233960> Código de acceso: \`LENGUAJE23\``
      ].join("\n")     
    },
    {
        name: "➜ Información extra:",
        value: [
          "La clase durara de `3:15pm` hasta `4:00pm`",
        ].join("\n"),
        inline: true
        }
    )
   .setFooter({text: "[STA] | Sistema de Tortura Alarmista"})
    canal.send({content: `<@&1101361745261502614>`, embeds: [lenguaje], components: [row4]})

    interaction.reply({content: "✅Clase Lenguaje seleccionada!", ephemeral: true})  
   }
  },
};
