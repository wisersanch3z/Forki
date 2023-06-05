const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");

  const repitSchema = require('../../Schema/repitSchema');
const { options } = require("superagent");
  

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Expulsa a un usuario del servidor"),
      category: "Staff",
      usage: "<usuario> (motivo)",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
 
 
    }
}