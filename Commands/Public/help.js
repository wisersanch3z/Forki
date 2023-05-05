const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Te ayudare con mis comandos disponibles"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`pag1`)
        .setLabel(`Menu`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`pag2`)
        .setLabel(`Pagina 1`)
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId(`pag3`)
        .setLabel(`Pagina 2`)
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setTitle(`🛡 | Menu de Ayuda`)
      .setColor(`#f2ff00`)
      .addFields(
        {
          name: `Pagina 1`,
          value: `🔰 | Comandos de utilidad`,
        },
        {
          name: `Pagina 2`,
          value: `🛠 | Comandos de moderacion`,
        }
      );

    const embed2 = new EmbedBuilder()
      .setTitle(`🔰 | Comandos de utilidad`)
      .setColor(`#f2ff00`)
      .addFields(
        {
          name: `/avatar`,
          value: `Te mostrare tu avatar o el de algun usuario`,
        },
        {
          name: `/botinfo`,
          value: `Te mostrare alguna informacion sobre mi`,
        },
        {
          name: `/server`,
          value: `Te mostrare informacion sobre el servidor`,
        },
        {
          name: `/user`,
          value: `Te mostrare tu informacion o la de algun usuario`,
        },
        {
          name: `/servericon`,
          value: `Te mostrare el icono del servidor`,
        },
        {
          name: `/userbanner`,
          value: `Te mostrare tu banner o el de algun usuario`,
        },
        {
          name: `/serverbanner`,
          value: `Te mostrare el banner del servidor`,
        },
        {
          name: `/sugerencia`,
          value: `Envia una recomendacion al servidor`,
        }
      );

    const embed3 = new EmbedBuilder()
      .setTitle(`🛠 | Comandos de moderacion`)
      .setColor(`#f2ff00`)
      .addFields(
        {
          name: `/ban`,
          value: `Baneare a algun usario del servidor`,
        },
        {
          name: `/kick`,
          value: `Expulsare a alguien del servidor`,
        },
        {
          name: `/timeout`,
          value: `Dare un tiempo de timeout a un usuario`,
        }
      );

    await interaction.reply({
      embeds: [embed],
      components: [button],
      ephemeral: true,
    });

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on(`collect`, async (i) => {
      if (i.customId === `pag2`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({
            content: `Solo la persona que ejecuto el comando puede utilizar los botones!`,
            ephemeral: true,
          });
        }
        await i.update({
          embeds: [embed2],
          components: [button],
          ephemeral: true,
        });
      }

      if (i.customId === `pag1`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({
            content: `Solo la persona que ejecuto el comando puede utilizar los botones!`,
            ephemeral: true,
          });
        }
        await i.update({
          embeds: [embed],
          components: [button],
          ephemeral: true,
        });
      }

      if (i.customId === `pag3`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({
            content: `Solo la persona que ejecuto el comando puede utilizar los botones!`,
            ephemeral: true,
          });
        }
        await i.update({
          embeds: [embed3],
          components: [button],
          ephemeral: true,
        });
      }
    });
  },
};
