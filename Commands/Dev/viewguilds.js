const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("viewguilds")
        .setDescription("Mira los servidores donde estoy"),
    category: "Dev",
    usage: "",
    developer: "true",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    //bruh

    async execute(interaction, client) {

        const serverListEmbed = new EmbedBuilder()
        .setColor(`${client.config.color}`)
        .setTimestamp();
   
  
        const servers = interaction.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(15);

        const serverDescriptions = servers.map((server, index) => `**${server.name}** [${server.memberCount}] \`(${server.id})\``);

        const description = serverDescriptions.join("\n");

        serverListEmbed.setDescription(description);
      await interaction.reply({ embeds: [serverListEmbed] });
    
        
    }
}
