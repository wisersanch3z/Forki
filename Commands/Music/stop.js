const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");



  module.exports = {
    data: new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Deten la música que este sonando"),
      category: "Music",
      usage: "",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
        const user = interaction.user;

        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply(`<:warningf:1109631272529186928> No hay nada reproduciéndose`)
        queue.stop()
        interaction.reply(`<:succs:1109633125618811021> | Música detenida!`)


    }
}