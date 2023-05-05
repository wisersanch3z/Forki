const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("noping")
    .setDescription("boton test")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, message) {
    const PING = interaction.guild.roles.cache.get(`1060732903455195186`);

    const NOPING = interaction.guild.roles.cache.get(`1060734984794669116`);

    const member = interaction.member;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`ping`)
        .setLabel(`PING`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`noping`)
        .setLabel(`NO PING`)
        .setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setTitle(`Elige si es que prefieres que la gente te haga ping o no`)
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
      })
      .setColor("Yellow");

    interaction.channel.send({ embeds: [embed], components: [button] });
    interaction.reply({ content: `Mensaje enviado`, ephemeral: true });
  },
};
