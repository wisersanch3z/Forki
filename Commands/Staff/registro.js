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

    const pageSize = 6; // Número de sanciones por página
    let page = 1; // Página actual

  
    function showPage(page, interaction, persona) {
      historySchema.find({ guild: interaction.guild.id, usuario: persona.id })
        .then(registro => {
          if (registro.length === 0) {
            return interaction.editReply('<:succs:1109633125618811021> | El usuario no tiene sanciones registradas.');
          }

          const elembed = new EmbedBuilder()
            .setColor("0077be")
            .setThumbnail(persona.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`Registro de sanciones de: ${persona.user.tag}`);

          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const pageSanciones = registro.slice(startIndex, endIndex);

          pageSanciones.forEach(sancion => {
            elembed.addFields({
              name: `- **#${sancion.sanciones}** | <t:${sancion.fecha}:D>`,
              value: `<:11:1105665875731816549>**Moderador:** ${sancion.moderador}\n<:11:1105665875731816549>**Razón:** ${sancion.razon}\n**<:12:1105665933390925824>Sanción aplicada:** ${sancion.tipo}`,
              
              //value: `Por: \`${sancion.moderador}\` \nMotivo: \`${sancion.razon}\`\nFecha: \`${sancion.fecha}\``,
              inline: false,
            });
          });

          elembed.setFooter({
            text: `Total de sanciones: ${registro.length} en: ${interaction.guild.name}`,
            iconURL: `${interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })}`
          });

          if (registro.length > pageSize) {
            let numPages = Math.ceil(registro.length / pageSize);

            // Create previous button
            let prevBtn = new ButtonBuilder()
              .setCustomId('previous_button')
              .setStyle(ButtonStyle.Primary)
              .setEmoji("1109675496654000219")
            if (page === 1)
              prevBtn.setDisabled();

            // Create next button
            let nextBtn = new ButtonBuilder()
              .setCustomId('next_button')
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1109741960715055214")
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
