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

let contador = 1;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Advierte a un usuario sobre su comportamiento")
    .addMentionableOption(option =>
      option.setName("user")
        .setDescription("Selecciona al usuario que será advertido")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("motivo")
        .setDescription("Proporciona el motivo por el cual sancionas a este usuario")
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  category: "Staff",
  usage: "<usuario> (motivo)",
  async execute(interaction, client) {
    const persona = interaction.options.getMentionable("user");
    const textomotivo = interaction.options.getString("motivo");

    const elweon = await interaction.guild.members.fetch(persona.id);
    const tonto = persona.id;

    const motivowe = textomotivo || 'Sin motivo registrado';

    const date = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    const tipo = "Advertencia";

    registro.findOne({ usuario: tonto, guild: interaction.guild.id })
      .then((result, index) => {

        const xdd = new EmbedBuilder()
          .setColor("0077BE")
          .setAuthor({
            name: `${persona.user.tag} | Nuevo Caso`,
            iconURL: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
          })
          .setThumbnail(persona.displayAvatarURL())
          .setDescription(`:police_officer: Responsable: ${interaction.user}\n:rightt: Motivo: \`${motivowe}\`\n\n> Tipo: **${tipo}**`)
          .setFooter({
            text: `Fecha: ${date} - Caso Número: #${contador}`
          })
          .setTimestamp();


        const warning = new registro({
          guild: interaction.guild.id,
          usuario: tonto,
          moderador: interaction.user.tag,
          razon: motivowe,
          fecha: date,
          tipo: tipo,
          sanciones: contador
        });

        contador++;

        return warning.save()
          .then(() => {
            interaction.reply({ embeds: [xdd] });
          });
      })
      .catch(error => {
        console.error('Error al obtener el historial de sanciones:', error);
        interaction.reply('Ha ocurrido un error al obtener el historial de sanciones.');
      });
  }
};