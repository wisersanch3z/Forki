const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    IntegrationApplication,
    ButtonBuilder,
  } = require("discord.js");



  module.exports = {
    data: new SlashCommandBuilder()
      .setName("queue")
      .setDescription("Mira la lista de canciones en cola"),
      category: "Music",
      usage: "",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {

        const user = interaction.user;
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply(`No hay ninguna cancion reproduciendose`);
        if (!interaction.member.voice?.channel) return interaction.reply(`Necesitas estar en un canal de voz para ejecutar eso`);
        if (interaction.guild.members.me.voice?.channel && interaction.member.voice?.channel.id != interaction.guild.members.me.voice?.channel.id) return interaction.reply(`<:cruz:1104223759877025833> Tienes que estar en el mismo canal de voz que yo para hacer eso!`);
        
        let listaqueue = [];
        var maximascanciones = 10;
        
        for (let i = 0; i < queue.songs.length; i += maximascanciones) {
            let canciones = queue.songs.slice(i, i + maximascanciones);
            listaqueue.push(canciones.map((cancion, index) => `➝ [\`${cancion.name}\`](${cancion.url})`).join("\n "));
        }

        

        var limite = listaqueue.length;
        var embeds = [];
        
        for (let i = 0; i < limite; i++) {
            let desc = String(listaqueue[i]).substring(0, 2048);
            let embed = new EmbedBuilder()
                .setDescription(`
                <:queue:1109674322043359294> | **Lista de Canciones**:\n\n${desc}
                `)
                .setColor("0077be")
                
                .setFooter({
                  text: "Forki | Cola de música",
                  iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            if (queue.songs.length > 1) embed.addFields([{name: `\nCanción Actual`, value: `[\`${queue.songs[0].name}\`](${queue.songs[0].url})`}, ])
            await embeds.push(embed)
            interaction.reply(`${interaction.user}`)
        }
        return paginacion();

        async function paginacion() {
           
            let paginaActual = 0;
            if (embeds.length === 1) return interaction.channel.send({ embeds: [embeds[0]] }).catch(() => { });
            let boton_atras = new ButtonBuilder().setStyle('Secondary').setCustomId('Volver').setEmoji('⚽').setLabel('Volver')
            let boton_avanzar = new ButtonBuilder().setStyle('Secondary').setCustomId('Siguiente').setEmoji('🏀').setLabel('Siguiente')
            let embedpaginas = await interaction.channel.send({
                content: `❗ | Has clic en los botones, para volver o ir a la siguiente pagina`,
                embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1}/${embeds.length}` })],
                components: [new ActionRowBuilder().addComponents([boton_atras, boton_avanzar])]
            });
            
            const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id && client.user.id, time: 180e3 });
            collector.on("collect", async b => {                                            
                if (!b?.user || b.user.id !== interaction.user.id) return b?.reply({ content: `Solo la persona que ejecutó el slash puede usarlo` });

                switch (b?.customId) {
                    case "Volver": {
                        collector.resetTimer();
                        if (paginaActual !== 0) {
                            paginaActual -= 1
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1}/${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        } else {
                            paginaActual = embeds.length - 1
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1}/${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    case "Siguiente": {
                        collector.resetTimer();
                        if (paginaActual < embeds.length - 1) {
                            paginaActual++
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1}/${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        } else {
                            paginaActual = 0
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1}/${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    default:
                        break;
                }
            });
            collector.on("end", () => {
                embedpaginas.components[0].components.map(boton => boton.disabled = true)
                embedpaginas.edit({content: `Tiempo expirado, vuelve a escribir el comando para interactuar nuevamente\``, embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1}/${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
            });
        }

    
    }
}