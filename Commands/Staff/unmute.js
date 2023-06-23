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

const ms = require("ms")

const registro = require('../../Schema/historySchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Mutea a un usuario del servidor")
        .addMentionableOption(option =>
            option.setName("user")
                .setDescription("Selecciona al usuario que será expulsalo")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    category: "Staff",
    usage: "<usuario>",
    async execute(interaction, client) {
        const persona = interaction.options.getMentionable("user");

        const elweon = await interaction.guild.members.fetch(persona.id);
        const tonto = persona.id;

        if (persona.id === interaction.user.id) return interaction.reply({
            content: "<:warningf:1109631272529186928> No puedes desmutearte a ti mismo",
            ephemeral: true
        });
        if (persona.id === client.user.id) return interaction.reply({
            content: `<:warningf:1109631272529186928> No estoy muteado!`,
            ephemeral: true
        })
        if (persona.user.bot) return interaction.reply(
            {
            content: `<:warningf:1109631272529186928> No puedes desmutear a un BOT`,
            ephemeral: true
            });
        const member = await interaction.guild.members.fetch(persona.id);
        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
            content: `<:warningf:1109631272529186928> El usuario <@${persona.id}> tiene un rango mayor al tuyo`,
            ephemeral: true
            });
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({
            content: `<:warningf:1109631272529186928> Ha ocurrido un error al aplicar el muteo al usuario, comprueba que mi rango sea mayor al usuario seleccionado`,
            ephemeral: true
            })

        const date = new Date(); // Obtener la fecha actual
        const unixTimestamp = Math.floor(date.getTime() / 1000); // Convertir la fecha en marca de tiempo UNIX

        const estewe = interaction.guild.members.cache.get(persona.id)

        try {
           
        const xdd = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({
                name: `${persona.user.username}`,
                iconURL: persona.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
            })
            .addFields(
                {
                    name: `<:succs:1109633125618811021> Aislamiento Removido`,
                    value: [
                        `<:11:1105665875731816549> Moderador: <@${interaction.user.id}> \`(${interaction.user.id})\``,
                        `<:11:1105665875731816549> Usuario: **${persona.user.username}** \`(${persona.user.id})\``,
                        `<:12:1105665933390925824> Fecha Removida: <t:${unixTimestamp}:D>`
                    ].join("\n"),
                    inline: true
                }
            )
            .setFooter({
                text: `Se le ha avisado al privado del usuario`,
                iconURL: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
            })
            .setTimestamp();

            
        estewe.timeout(null);
        interaction.reply({ embeds: [xdd] })
         // aca mete tu codigo, si quieres todo o solamente la parte del embed y donde muteas/kickeas o lo que sea
  

     
         
      
          // Enviar mensaje al usuario sancionado
          const user = persona.user;
          if (!user.bot) {
            user.createDM()
              .then(dmChannel => {
                dmChannel.send({ content: `<:succs:1109633125618811021> tu aislamiento fue removido en el servidor: \`${interaction.guild.name}\``, embeds: [xdd] });
              })
              .catch(error => {
                console.error('Error al enviar mensaje directo al usuario:', error);
              });
          
          }
        } catch(e) {
            return interaction.reply({
                content: `<:warningf:1109631272529186928> Ha ocurrido un error al aplicar el muteo al usuario, comprueba que mi rango sea mayor al usuario seleccionado`,
                ephemeral: true
                })
                }
        
      
    

  }
}