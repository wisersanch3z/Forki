const { EmbedBuilder } = require('discord.js')
const {DisTube} = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

module.exports = (client, discord, interaction) => {

    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format: "audioonly",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin(),
        ],
    });

    

    //CUANDO SUENA UNA MUSICA
    client.distube.on("playSong", (queue, song) => {
        const user = song.user;
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                  .setDescription(`
                > <:disco:1109622835229499402> | Reproduciendo ahora: \`${song.name}\`\n
                • **Información**:
                <:11:1105665875731816549> [URL](${song.url})
                <:11:1105665875731816549> Visitas: \`${song.views}\`
                <:12:1105665933390925824> Duración: \`${song.formattedDuration}\`
                
                  `)
                  .setThumbnail(song.thumbnail)
                  .setColor(`${client.config.color}`)
                  .setFooter({
                    text: `Forki-DJ | Añadido por: ${user.username}`,
                    iconURL: client.user.displayAvatarURL()
                  })
                  .setTimestamp()
              ],
        })
    })
//song.name | song.formattedDuration
    client.distube.on("addSong", (queue, song) => {
        const user = song.user;
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
            .setDescription(`
            <:disco:1109622835229499402> [${song.name}](${song.url}) ha sido agregado a la cola!
            `)
            .setThumbnail(song.thumbnail)
            .setColor(`${client.config.color}`)
            .setFooter({
             text: `Forki-DJ | Añadido por: ${user.username}`,
            iconURL: client.user.displayAvatarURL()
              })
            .setTimestamp()
              ],
        })
    });


    client.distube.on('addList', (queue, playlist) => {
    
    queue.textChannel.send(
      `Añadido la Playlist \`${playlist.name}\`\n
      playlist (${playlist.songs.length})
    `)
    });

    client.distube.on('empty', channel => {
        const hola = new EmbedBuilder()
        .setDescription(`
        > <:leave:1110731669801021510> El canal de voz se encuentra **solo**, he abandonado el canal de voz por la inactividad
        `)
        
        .setColor("Red")
        .setFooter({
         text: `Forki-DJ`,
        iconURL: client.user.displayAvatarURL()
          })
        .setTimestamp()
        channel.textChannel.send({embeds:[hola]})
    })

    client.distube.on('finish', queue => {
        const hola = new EmbedBuilder()
        .setDescription(`
        > <:leave:1110731669801021510> Ya no hay ninguna **música** en la cola, saliendo del **canal de voz...**
        `)
        
        .setColor("Red")
        .setFooter({
         text: `Forki-DJ`,
        iconURL: client.user.displayAvatarURL()
          })
        .setTimestamp()
       
        queue.textChannel.send({embeds:[hola]})
    })

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = false;
    });
    console.log("DISTUBE CARGADO")
};