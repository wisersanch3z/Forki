const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    UserFlagsBitField,
    PermissionFlagsBits,
} = require("discord.js");

const ms = require("ms")

const registro = require('../../Schema/historySchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mear")
        .setDescription("💀 Meale a un usuario del servidor")
        .addMentionableOption(option =>
            option.setName("usuario")
                .setDescription("Selecciona al usuario que sera meado")
                .setRequired(true)),
              
    category: "Public",
    usage: "<usuario>",
    async execute(interaction, client) {
        const persona = interaction.options.getMentionable("usuario");


        const bruh = new EmbedBuilder()
        .setDescription(`<@${interaction.user.id}> Esta **meando** a <@${persona.user.id}>!`)
        .setColor("Gold")
        .setImage(`https://media.discordapp.net/attachments/1107672005400076372/1119354201919737866/Video_sin_titulo_Hecho_con_Clipchamp.gif`)

        interaction.reply({embeds: [bruh]})
        //ACTUALIZA JHERMANPO

    }
}