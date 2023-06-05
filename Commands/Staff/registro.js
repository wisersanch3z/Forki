const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageButton, MessageActionRow, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const historySchema = require("../../Schema/historySchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("registro")
    .setDescription("Mira el registro de sanciones de un usuario")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("Mira el historial de sanciones de un usuario")
        .setRequired(false)),
  category: "Staff",
  usage: "(usuario)",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const elwe = interaction.options.getUser("user");
    const estosw = elwe || interaction.user;
    const persona = await interaction.guild.members.fetch(estosw.id);

    const pageSize = 10; // Número de sanciones por página
    let page = 1; // Página actual

    const date = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    function showPage(page, interaction, persona) {
      historySchema.find({ guild: interaction.guild.id, usuario: persona.id })
        .then(registro => {
          if (registro.length === 0) {
            return interaction.editReply('<:succs:1109633125618811021> | El usuario no tiene sanciones registradas.');
          }

          const elembed = new EmbedBuilder()
            .setColor("0077be")
            .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`Sanciones de: ${persona.user.tag}`);

          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const pageSanciones = registro.slice(startIndex, endIndex);

          pageSanciones.forEach(sancion => {
            elembed.addFields({
              name: `<:warningf:1109631272529186928> - \`#${sancion.sanciones}\` | Tipo: ${sancion.tipo}:`,
              value: `Por: \`${sancion.moderador}\`\nMotivo: \`${sancion.razon}\`\nFecha: \`${sancion.fecha}\``,
            });
          });

          if (registro.length > pageSize) {
            let numPages = Math.ceil(registro.length / pageSize);

            // Create previous button
            let prevBtn = new ButtonBuilder()
              .setCustomId('previous_button')
              .setStyle(ButtonStyle.Primary)
              .setLabel('atras');
            if (page === 1)
              prevBtn.setDisabled();

            // Create next button
            let nextBtn = new ButtonBuilder()
              .setCustomId('next_button')
              .setStyle(ButtonStyle.Secondary)
              .setLabel('siguiente');
            if (page >= numPages)
              nextBtn.setDisabled();

            // Add both buttons to action row 
            let btnRow = new ActionRowBuilder()
              .addComponents(prevBtn, nextBtn);

            // Edit original response with additional components 
            interaction.editReply({ embeds: [elembed], components: [btnRow] }).then(() => {
              const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });
              collector.on('collect', i => {
                if (i.customId === 'previous_button') {
                  if (!prevBtn.disabled) {
                    page--;
                    showPage(page, interaction, persona);
                  }
                } else if (i.customId === 'next_button') {
                  if (!nextBtn.disabled) {
                    page++;
                    showPage(page, interaction, persona);
                  }
                }
              });

              collector.on('end', () => {
                // Remove buttons after timeout
                prevBtn.setDisabled();
                nextBtn.setDisabled();
                btnRow = new ActionRowBuilder().addComponents(prevBtn, nextBtn);
                interaction.editReply({ embeds: [elembed], components: [btnRow] });
              });
            });
          } else {
            interaction.editReply({ embeds: [elembed] });
          }
        })
        .catch(error => {
          console.error('Error al obtener el historial de sanciones:', error);
          interaction.editReply('Ha ocurrido un error al obtener el historial de sanciones.');
        });
    }

    interaction.deferReply().then(() => {
      showPage(page, interaction, persona);
    }).catch(error => {
      console.error('Error al deferir la respuesta:', error);
      interaction.followUp('Ha ocurrido un error al procesar el comando.');
    });
  }
};
