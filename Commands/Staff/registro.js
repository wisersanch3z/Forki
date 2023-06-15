const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageButton, MessageActionRow, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const db = require("../../Schema/historySchema");

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
      try {
        db.findOne({ guild: interaction.guild.id, usuario: persona.id }, async (err, data) => {

          if (err) throw err;

          if (!data || data.content.length === 0) {
            return interaction.editReply({ content: `<:succs:1109633125618811021> | El usuario no tiene sanciones registradas.`, ephemeral: true });
          }

          const elembed = new EmbedBuilder()
            .setColor("0077be")
            .setThumbnail(persona.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle(`Registro de sanciones de: ${persona.user.tag}`);

          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const pageSanciones = Array.from(data.content).slice(startIndex, endIndex);

          pageSanciones.forEach((sancion, index) => {
         
            elembed.addFields(
              {
                name: `• ${startIndex + index + 1} | <t:${sancion.fecha}:D>`,
                value: [
                  `<:11:1105665875731816549>**Moderador:** <@${sancion.moderador}>\n<:11:1105665875731816549>**Razón:** ${sancion.razon}\n**<:12:1105665933390925824>Sanción aplicada:** ${sancion.tipo}`,
      
                ].join("\n"),
                inline: false
              }
            )
      });

          elembed.setFooter({
            text: `Total de sanciones: ${data.content.length} en: ${interaction.guild.name}`,
            iconURL: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }) || 'https://imagepng.org/wp-content/uploads/2018/08/alerta-2.png'
          });
         
          if (data.length > pageSize) {
            let numPages = Math.ceil(data.length / pageSize);

            // Create previous button
            let prevBtn = new ButtonBuilder()
              .setCustomId('previous_button')
              .setStyle(ButtonStyle.Primary)
              .setEmoji("1109675496654000219");
            if (page === 1)
              prevBtn.setDisabled();

            // Create next button
            let nextBtn = new ButtonBuilder()
              .setCustomId('next_button')
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("1109741960715055214");
            if (page >= numPages)
              nextBtn.setDisabled();

            // Add both buttons to action row
            let btnRow = new ActionRowBuilder()
              .addComponents(prevBtn, nextBtn);

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
                prevBtn.setDisabled(true);
                nextBtn.setDisabled(true);
                btnRow = new MessageActionRow().addComponents(prevBtn, nextBtn);
                interaction.editReply({ embeds: [elembed], components: [btnRow] });
              });
            });

          } else {
            interaction.editReply({ embeds: [elembed] });
          }
        })
      } catch (error) {
        console.error('Error al obtener el historial de sanciones:', error);
        interaction.editReply('Ha ocurrido un error al obtener el historial de sanciones.');
      }
    }

    try {
      interaction.deferReply().then(() => {
        showPage(page, interaction, persona);
      });
    } catch (error) {
      console.error('Error al deferir la respuesta:', error);
      interaction.followUp('Ha ocurrido un error al procesar el comando.');
    }
  }
};
