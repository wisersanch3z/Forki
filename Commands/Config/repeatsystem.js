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
      .addStringOption(option =>
        option.setName('opcion')
        .addChoices(
            { name: "Activar", value: "si" },
            { name: "Desactivar", value: "no" }
          )
        .setDescription('Eleji una opcion')
        .setRequired(true)),
        category: "Staff",
        usage: "<Activar | Desactivar>",
   
   
        /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
  

    

    async execute(interaction, client) {
  

        const valor = interaction.options.getString('opcion');
/*
        if(valor > 1) return interaction.reply({content: "El valor que has colocado es mayor a 1!"})
    
        if(valor < 0) return interaction.reply({content: "El valor colocado es menor a 0!"})
*/    

        if(valor == "si"){//ACTIVAR 

    interaction.reply({content: "Haz activado mi repetidor!"})
  
            
        let x = await repitSchema.findOne({Guild: interaction.guild.id}).exec()
        if(x){ 
        await x.updateOne({Guild: interaction.guild.id})
    }

    let i = new repitSchema({Guild: interaction.guild.id})
    await i.save()

    }
        
           if(valor == "no" ){//DESACTIVAR
    interaction.reply({content: "Haz desactivado mi repetidor!"})


    let x = await repitSchema.findOneAndDelete({Guild: interaction.guild.id}).exec()
        if(x){ 
        await x.updateOne({Guild: interaction.guild.id})
    }


           }
        

    }
}