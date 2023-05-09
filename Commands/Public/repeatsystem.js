const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");

  const repitSchema = require('../../Schema/repitSchema')
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("repeatsystem")
      .setDescription("Manipula el sistema de repetición de mensajes")
      .addNumberOption(option =>
        option.setName('valor')
        .setDescription('0=Desactivar | 1=Activar')
        .setRequired(true)),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
  

    

    async execute(interaction, client) {
  

        const valor = interaction.options.getNumber('valor');

        if(valor > 1) return interaction.reply({content: "El valor que has colocado es mayor a 1!"})
    
        if(valor < 0) return interaction.reply({content: "El valor colocado es menor a 0!"})
      
      
        if(valor == 1){

    interaction.reply({content: "Haz activado mi repetidor!"})
  
            
        let x = await repitSchema.findOne({Guild: interaction.guild.id}).exec()//Vemos si ya hay algo guardado
        if(x){ 
        await x.updateOne({Guild: interaction.guild.id})//Si ya hay un canal guardado, actualizamos al nuevo canal.
    }

    let i = new repitSchema({Guild: interaction.guild.id})//Colocamos los datos 
    await i.save()//Guardamos los datos

    }
        
           if(valor == 0){
    interaction.reply({content: "Haz desactivado mi repetidor!"})


    let x = await repitSchema.findOneAndDelete({Guild: interaction.guild.id}).exec()//Vemos si ya hay algo guardado
        if(x){ 
        await x.updateOne({Guild: interaction.guild.id})//Si ya hay un canal guardado, actualizamos al nuevo canal.
    }


           }
        

    }
}