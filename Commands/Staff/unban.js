const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    UserFlagsBitField,
    PermissionFlagsBits,
  } = require("discord.js");

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unban")
      .setDescription("Desbloquea del servidor a un usuario")
      .addStringOption(option =>
        option.setName("id")
          .setDescription("Escribe la ID del usuario que desees desbloquear")
          .setRequired(true))
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    category: "Staff",
    usage: "<usuario>",
    async execute(interaction, client) {
      const persona = interaction.options.getString("id");

      if (persona === interaction.user.id) return interaction.reply({ content: "<:warningf:1109631272529186928> No puedes sancionarte a ti mismo", ephemeral: true });
      if (persona === client.user.id) return interaction.reply({content: `<:warningf:1109631272529186928> No puedes sancionarme a mi!`, ephemeral: true})
     


  
      const date = new Date(); // Obtener la fecha actual
      const unixTimestamp = Math.floor(date.getTime() / 1000); // Convertir la fecha en marca de tiempo UNIX
  
    

  
  
        const xdd = new EmbedBuilder()
          .setColor("Green")
          .setAuthor({
            name: `Se ha removido exitosamente un bloqueo`,
            iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
          })
          .addFields(
            {
              name: `<:succs:1109633125618811021> Bloqueo Removido`,
              value: [
                `<:11:1105665875731816549> Moderador: <@${interaction.user.id}> \`(${interaction.user.id})\``,
                `<:11:1105665875731816549> ID:  \`(${persona})\``,
                `<:12:1105665933390925824> Fecha: <t:${unixTimestamp}:D>`
              ].join("\n"),
              inline: true
            }
          )
          .setFooter({
            text: `Bloqueo Eliminado`,
            iconURL: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
          })
          .setTimestamp();
  
  
  
    
          await interaction.guild.bans.fetch() 
          .then(async bans => {
   
              if (bans.size == 0) return await interaction.reply({ content: '<:warningf:1109631272529186928> No hay ningun baneo en el servidor', ephemeral: true})
              let bannedID = bans.find(ban => ban.user.id == persona);
              if (!bannedID ) return await interaction.reply({ content: '<:warningf:1109631272529186928> Ese usuario no se encuentra baneado en el servidor', ephemeral: true})
   
              await interaction.guild.bans.remove(persona).catch(err => {
                  return interaction.reply({ content: `<:warningf:1109631272529186928> Hubo un error al intentar desbanear al usuario, intenta de nuevo`, ephemeral: true})
              })
          })
   
          await interaction.reply({ embeds: [xdd] });
            // Enviar mensaje al usuario sancionado
        
    
        }
    }
    
