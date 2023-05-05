const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { CommandCooldown, msToMinutes } = require("discord-command-cooldown");
const ms = require("ms");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("tiempo")
    .setDescription("Te respondere Pong!!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const earnCashCommandCooldown = new CommandCooldown("earnCash", ms("5m"));

    const userCooldowned = await earnCashCommandCooldown.getUser(
      interaction.user.id
    );

    if (userCooldowned) {
      const timeLeft = msToMinutes(userCooldowned.msLeft, false); // False for excluding '0' characters for each number < 10
      interaction.reply({
        content: `You need to wait ${
          timeLeft.hours +
          " hours, " +
          timeLeft.minutes +
          " minutes, " +
          timeLeft.seconds +
          " seconds"
        } before running command again!`,
        ephemeral: true,
      });
    } else {
      // do your command stuff
      // and
      await earnCashCommandCooldown.addUser(interaction.user.id); // Cooldown user again
      interaction.reply({ content: `hola`, ephemeral: true });
    }
  },
};
