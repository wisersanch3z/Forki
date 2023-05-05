const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Te enseñare la informacion del Servidor"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client, message) {
    const { guild } = interaction;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(`https://www.youtube.com/channel/UCYWw2P9ZitCiWu49a_mqbRw`)
        .setLabel(`Canal de Youtube`)
        .setEmoji(`🎥`)
        .setStyle(ButtonStyle.Link)
    );

    const {
      createdTimestamp,
      ownerId,
      description,
      members,
      memberCount,
      channels,
    } = guild;

    const botCount = members.cache.filter((member) => member.user.bot).size;
    const getChannelTypeSize = (type) =>
      channels.cache.filter((channel) => type.includes(channel.type)).size;

    const totalChannels = getChannelTypeSize([
      ChannelType.GuildText,
      ChannelType.GuildNews,
      ChannelType.GuildVoice,
      ChannelType.GuildStageVoice,
      ChannelType.GuildForum,
      ChannelType.GuildPublicThread,
      ChannelType.GuildPrivateThread,
      ChannelType.GuildNewsThread,
      ChannelType.GuildCategory,
    ]);

    const embed = new EmbedBuilder()
      .setColor(`f5ff00`)
      .setImage(guild.bannerURL({ size: 1024 }))
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${guild.iconURL({ dynamic: true })}`,
      })
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        {
          name: "📃 Descripción",
          value: [
            `Somos la **PolloGang**, comunidad dirigida principalmente a la creacion de Bots de Discord. Aqui podras encontrar ayuda con errores/preguntas que tengas o compartir tu conocimiento con los demas. Tambien contamos con un canal de Youtube con una variedad de videos para hacerte mas facil el proceso.`,
          ].join("\n"),
        },
        {
          name: "🌎 | General",
          value: [
            `💾 **ID:** ${guild.id}`,
            `📆 **Creado:** <t:${parseInt(createdTimestamp / 1000)}:R>`,
            `👑 **Dueño:** <@${ownerId}>`,
            `🔗 **URL:** discord.gg/${guild.vanityURLCode || "None"}`,
          ].join("\n"),
        },
        {
          name: `👥 | Miembros [${memberCount}]`,
          value: [
            `👤 Usuarios: ${guild.memberCount - botCount}`,
            `🤖 Bots: ${botCount}`,
            ``,
            ``,
          ].join("\n"),
          inline: true,
        },
        {
          name: "🔰 | Nitro Boost",
          value: [
            `Nivel: ${guild.premiumTier}`,
            `Boosts: ${guild.premiumSubscriptionCount}`,
          ].join("\n"),
          inline: true,
        },
        {
          name: `Canales (${totalChannels})`,
          value: [
            `💬 **Texto:** ${getChannelTypeSize([
              ChannelType.GuildText,
              ChannelType.GuildForum,
              ChannelType.GuildNews,
            ])}`,
            `🎙 **Voz:** ${getChannelTypeSize([
              ChannelType.GuildVoice,
              ChannelType.GuildStageVoice,
            ])}`,
            `🧵 **Hilos:** ${getChannelTypeSize([
              ChannelType.GuildPublicThread,
              ChannelType.GuildPrivateThread,
              ChannelType.GuildNewsThread,
            ])}`,
            `📕 **Categorias:** ${getChannelTypeSize([
              ChannelType.GuildCategory,
            ])}`,
          ].join("\n"),
          inline: true,
        },
        { name: "Banner", value: guild.bannerURL() ? "** **" : "None" }
      );

    interaction.reply({ embeds: [embed], components: [button] });
  },
};
