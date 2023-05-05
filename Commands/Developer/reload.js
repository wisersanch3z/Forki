const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require(`discord.js`);
const fs = require(`fs`);
const { loadbButtons } = require("../../Handlers/buttonHandler");

const { loadCommands } = require(`../../Handlers/commandHandler`);
const { loadEvents } = require(`../../Handlers/eventHandler`);

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName(`reload`)
    .setDescription(`Recarga tus comandos/eventos`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName(`events`).setDescription(`Recarga tus eventos`)
    )
    .addSubcommand((options) =>
      options.setName(`commands`).setDescription(`Recarga tus comandos`)
    )
    .addSubcommand((options) =>
      options.setName(`buttons`).setDescription(`Recarga tus botones`)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({
            content: `Los eventos fueron recargados`,
            ephemeral: true,
          });
        }

        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({
            content: `Los comandos fueron recargados`,
            ephemeral: true,
          });
        }

        break;
      case "buttons":
        {
          loadbButtons(client);
          interaction.reply({
            content: `Los botones fueron recargados`,
            ephemeral: true,
          });
        }
        break;
    }
  },
};
