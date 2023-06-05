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
      .setName("skip")
      .setDescription("Salta la música que este reproduciendose ahora"),
      category: "Music",
      usage: "",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
        const user = interaction.user;


        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply(`<:warningf:1109631272529186928> No hay nada reproduciéndose`);
        if(!interaction.member.voice?.channel) return interaction.reply(`<:warningf:1109631272529186928> Necesitas estar en un canal de voz para ejecutarlo`);
        if(interaction.guild.members.me.voice?.channel && interaction.member.voice?.channel.id != interaction.guild.members.me.voice?.channel.id) return interaction.reply(`<:warningf:1109631272529186928> Tenemos que estar en el mismo canal de voz`);
        const song = await queue.skip()
        const skipp = new EmbedBuilder()
        .setColor('0077be')
        .setDescription(`
        <:succs:1109633125618811021> | ¡Se ha saltado la música actual!\n
        Ahora suena: \`${song.name}\`
        `)
        .setFooter({
        text: `Saltado por: ${user.tag}`,
        iconURL: user.displayAvatarURL()
        })
       
        .setTimestamp()
        
        client.distube.skip(interaction);
        interaction.reply({ embeds: [skipp] });

    }

}