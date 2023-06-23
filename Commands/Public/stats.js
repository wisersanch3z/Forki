const { 
    EmbedBuilder,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Client,
    ChannelType,
    UserFlags,
    PermissionFlagsBits,
    version
} = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Visualiza las estadisticas de mi!"),
        category: "Public",
        usage: "",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        await client.application.fetch();
   
        const totalMembers = await interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
 
        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;
        const embed = new EmbedBuilder()
                .setTitle(`Estadísticas de ${client.user.username}`)
                .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
                .setImage("https://media.discordapp.net/attachments/1011698331052941494/1104249833189019770/standard.gif")
                .addFields(
               {
               name: "• Información General",
               value: [
               `<:nombre:1104255566634819624> - Nombre: \`${client.user.username}\``,
               `<:calenda:1104255569382092891> - Creado: <t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
               `<a:dev:1106365526218915852> - Dueño: ${client.application.owner ? `<@${client.application.owner.id}> \`(${client.application.owner.id})` : "Wisero"}\``,
               `<:cmd:1104256497573179392> - Comandos de Barra: \`${client.commands.size}\``,
               `:open_file_folder: - Estoy en: \`${client.guilds.cache.size}\` servidores`,
               `<:Persona:1104252708065648650> - Viendo \`${totalMembers}\` usuarios`
               ].join("\n")        
              },
                   
              {
                name: "• Mi Sistema",
                value: [
                    `<:time:1104263909193564201> - Tiempo Activo: <t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                    `<:wifi:1104263912167313428> - Latencia: \`${client.ws.ping}ms\``,
                    `<:nodejs:1104263064687231056> - Versión Node.js: \`${process.version}\``,
                    `<:discordjs:1104263193162961017> - Versión Discord.js: \`${version}\``
                ].join("\n"),
                inline: true
            },
            

                    )
                    .setColor(`${client.config.color}`)
            interaction.reply({embeds: [embed]});
    }
};
