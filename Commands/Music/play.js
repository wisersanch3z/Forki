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
      .setName("play")
      .setDescription("Reproduce alguna canción")
      .addStringOption(option =>
        option.setName('cancion')
        .setDescription('Escribe la canción que quieres que suene')
        .setRequired(true)),
      category: "Music",
      usage: "<URL/Nombre de la canción>",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
    
        const cancion = interaction.options.getString('cancion');
   
        if(!interaction.member.voice?.channel) return interaction.reply(`<:warningf:1109631272529186928> Tienes que estar en un canal de voz`);
        if(interaction.guild.members.me.voice?.channel && interaction.member.voice?.channel.id != interaction.guild.members.me.voice?.channel.id) return interaction.reply(`<:warningf:1109631272529186928> Tienes que estar en un canal de voz para que entre`);
   client.distube.play(interaction.member.voice?.channel, cancion, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        });
        interaction.reply(`> Buscando: \`${cancion}\`...`);


    }
}