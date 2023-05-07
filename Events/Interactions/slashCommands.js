const { ChatInputCommandInteraction, InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return interaction.reply({
          content: "<:denied:1104556455182467113> | Comando desactualizado",
          ephermal: true,
        });

      if (command.developer && interaction.user.id !== "540398056588181507")
        return interaction.reply({
          content: "<:denied:1104556455182467113> | Este comando solo esta disponible para mi creador",
          ephermal: true,
        });

      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error(`<:denied:1104556455182467113> | Este boton no tiene un codigo`);

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { menus } = client;
      const { customId } = interaction;
      const menu = menus.get(customId);
      if (!menu) return new Error(`<:denied:1104556455182467113> | Este menu no tiene un codigo`);

      try {
        await menu.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error(`<:denied:1104556455182467113> | Este Modal no tiene un codigo`);

      try {
        await modal.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  },
};
