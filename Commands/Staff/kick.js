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

const registro = require('../../Schema/historySchema');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulsa a un usuario del servidor")
    .addMentionableOption(option =>
      option.setName("user")
        .setDescription("Selecciona al usuario que será expulsalo")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("motivo")
        .setDescription("Proporciona el motivo por el cual sancionas a este usuario")
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  category: "Staff",
  usage: "<usuario> (motivo)",
  async execute(interaction, client) {
    const persona = interaction.options.getMentionable("user");
    const textomotivo = interaction.options.getString("motivo");

    const elweon = await interaction.guild.members.fetch(persona.id);
    const tonto = persona.id;

    if (persona.id === interaction.user.id) return interaction.reply({ content: "<:warningf:1109631272529186928> No puedes sancionarte a ti mismo", ephemeral: true });
    if (persona.id === client.user.id) return interaction.reply({content: `<:warningf:1109631272529186928> No puedes sancionarme a mi!`, ephemeral: true})
    if (persona.user.bot) return interaction.reply({ content: `<:warningf:1109631272529186928> No puedes sancionar a un BOT`, ephemeral: true });
    const member = await interaction.guild.members.fetch(persona.id);
    if (member.roles.highest.position >= interaction.member.roles.highest.position)
    return interaction.reply({ content: `<:warningf:1109631272529186928> El usuario <@${persona.id}> tiene un rango mayor al tuyo`, ephemeral: true });
    
    
    
    const motivowe = textomotivo || 'Sin motivo registrado';

    const date = new Date(); // Obtener la fecha actual
    const unixTimestamp = Math.floor(date.getTime() / 1000); // Convertir la fecha en marca de tiempo UNIX

    const tipo = "Kick";


    registro.findOne({ usuario: tonto, guild: interaction.guild.id }, async (err, data) => {


      try{

      const xdd = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({
          name: `${persona.user.username}`,
          iconURL: persona.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .addFields(
          {
            name: `<:succs:1109633125618811021> Sanción aplicada correctamente`,
            value: [
              `<:11:1105665875731816549> Moderador: <@${interaction.user.id}> \`(${interaction.user.id})\``,
              `<:11:1105665875731816549> Sancionado: **${persona.user.username}** \`(${persona.user.id})\``,
              `<:11:1105665875731816549> Motivo: **${motivowe}**`,
              `<:12:1105665933390925824> Fecha aplicada: <t:${unixTimestamp}:D>`
            ].join("\n"),
            inline: true
          }
        )
        .setFooter({
          text: `Expulsión`,
          iconURL: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .setTimestamp();



      if (!data) {
        data = new registro({
          guild: interaction.guild.id,
          usuario: tonto,
          content: [
            {
              moderador: interaction.user.id,
              razon: motivowe,
              fecha: unixTimestamp,
              tipo: tipo,
            }
          ],
        })
      } else {
        const cosocontenido = {
          moderador: interaction.user.id,
          razon: motivowe,
          fecha: unixTimestamp,
          tipo: tipo,
        }
        data.content.push(cosocontenido)


      }
      data.save()
      
      interaction.guild.members.kick(persona)
      interaction.reply({ embeds: [xdd] })
   
    } catch(e) {
      return interaction.reply({
          content: `<:warningf:1109631272529186928> Ha ocurrido un error al aplicar el muteo al usuario, comprueba que mi rango sea mayor al usuario seleccionado`,
          ephemeral: true
          })
          }
      
       
      
          // Enviar mensaje al usuario sancionado
          const user = persona.user;
          if (!user.bot) {
            user.createDM()
              .then(dmChannel => {
                dmChannel.send({ content: `<:warningf:1109631272529186928> Has sido sancionado en el servidor: \`${interaction.guild.name}\``, embeds: [xdd] });
              })
              .catch(error => {
                console.error('Error al enviar mensaje directo al usuario:', error);
              });
              
          }
        
    
    })

  }
}