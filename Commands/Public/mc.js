const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");
  const QuickChart = require('quickchart-js');

  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("mc")
      .setDescription("Información sobre el total de miembros de el servidor"),
      category: "Public",
      usage: "",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
    

        const guild = interaction.guild;
        const totalMembers = guild.memberCount;
        const botMembers = guild.members.cache.filter(member => member.user.bot).size;
        const miembrosreales = totalMembers - botMembers;
        const horas24 = guild.members.cache.filter(member => Date.now() - member.joinedTimestamp < 24 * 60 * 60 * 1000).size;
        const dias7 = guild.members.cache.filter(member => Date.now() - member.joinedTimestamp < 7 * 24 * 60 * 60 * 1000).size;
       


        const chart = new QuickChart();
        chart
            .setConfig({
                type: 'bar',
                data: {
                    labels: ['Total', 'Miembros', 'Bots', '24h', '7 dias'],
                    datasets: [{
                        label: 'Conteo de Miembros',
                        data: [totalMembers, miembrosreales, botMembers, horas24, dias7],
                        backgroundColor: ['#${client.config.color}', '#1506fa', '#1005dd', '#0b03bf', '#5938f7']
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: `${guild.name}`
                        }
                    }
                },



            
            })

            .setWidth(500)
            .setHeight(300)
            .setBackgroundColor('#ffffff');
           


        const chartUrl = await chart.getShortUrl();

        const embed = new EmbedBuilder()

            .setTitle(`Información de miembros en: ${interaction.guild.name}`)
            .setColor(`${client.config.color}`)
            .setFooter({ text: `Solicitado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true, size: 1024})})
            .setDescription(`<:10:1121276798227972229>Total de Miembros: **${totalMembers}**\n<:11:1105665875731816549>Miembros: **${miembrosreales}**\n<:11:1105665875731816549>Bots: **${botMembers}**\n<:11:1105665875731816549>En 24h: **${horas24}**\n<:12:1105665933390925824>Ultimos 7 dias: **${dias7}**`)
            .setImage(chartUrl);

        await interaction.reply({ embeds: [embed] });

        }
    }