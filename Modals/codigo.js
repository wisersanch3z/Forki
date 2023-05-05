const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: {
    name: `codigo`,
  },
  async execute(interaction, client) {
    const webhook = await interaction.channel.createWebhook({
      name: `${interaction.user.username}`,
      avatar: interaction.user.displayAvatarURL(),
    });

    const embed = new EmbedBuilder().setDescription(`
          \`\`\`${interaction.fields.getTextInputValue("codigoembed")}\`\`\`
           `);

    await webhook.send({
      embeds: [embed],
    });

    await webhook.delete();

    await interaction.reply({
      content: `Tu codigo se envio correctamente`,
      ephemeral: true,
    });
  },
};
