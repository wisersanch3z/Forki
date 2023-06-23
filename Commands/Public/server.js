const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  const sampSchema = require("../../Schema/sampSchema");
  const samp = require("samp-query");

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("server")
      .setDescription("Mira la información detallada sobre el servidor de SAMP establecido en el servidor"),
  
    category: "Public",
    usage: "",
  
    /**
       * @param {ChatInputCommandInteraction} interaction 
       */
  
    async execute(interaction, client) {
  
      let sampp = await sampSchema.findOne({ guildId: interaction.guild.id });
  
      if (!sampp) {
        return interaction.reply({content: `<:warningf:1109631272529186928> | La IP no esta establecida, usa **/setip** para establecerla`, ephemeral: true});
      }
  
     
    const options = {
        host: sampp.ip,
        port: sampp.port,
      };
  
      await samp(options, (error, query) => {
        if (error) {
          const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .addFields({
              name: `🔴 Error al obtener la información`,
              value: `<:11:1105665875731816549> IP: \`${options.host}:${options.port}\`\n<:12:1105665933390925824> Estado: **Offline**`
              
            })
    
  
          return interaction.reply({ embeds: [embed] });
        } else {
          const pass = query["passworded"] ? "Si" : "No";
          const embed = new EmbedBuilder()
            .setColor(`${client.config.color}`)
            .setTitle(`**${query["hostname"]}**`)
            .addFields(
              {
                name: "IP:PORT",
                value: `${options.host}:${options.port}`,
                inline: true,
              },
              {
                name: "PLAYERS",
                value: `${query["online"] || 0}/${query["maxplayers"] || 0}`,
                inline: true,
              },
              { name: "GAMEMODE", value: query["gamemode"] || "-", inline: true },
              {
                name: "MAP",
                value: query["rules"]["mapname"] || "-",
                inline: true,
              },
              { name: "LANGUAGE", value: query["language"] || "-", inline: true },
              {
                name: "TIME - WEATHER",
                value:
                  query["rules"]["worldtime"] + " - " + query["rules"]["weather"],
                inline: true,
              },
              {
                name: "VERSION",
                value: query["rules"]["version"] || "-",
                inline: true,
              },
              { name: "PASSWORD?", value: pass, inline: true },
              {
                name: "URL",
                value: `[${query["rules"]["weburl"]}](https://${
                  query["rules"]["weburl"] || "https://sa-mp.com"
                })`,
                inline: true,
              }
            );
  
          return interaction.reply({ embeds: [embed] });
        }
      });
    },
  };
  