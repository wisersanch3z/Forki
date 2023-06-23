const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");

  const AsciiTable = require("ascii-table");
  const sampSchema = require("../../Schema/sampSchema");
  
  const embed = new EmbedBuilder();
  const samp = require("samp-query");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("players")
      .setDescription("Mira los usuarios online en el servidor de SAMP establecido"),
  
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
  
    
      const table1 = new AsciiTable()
      .setHeading(" ID", "NICK                ", "   SCORE")
      .setAlign(2, AsciiTable.RIGHT);
    const table2 = new AsciiTable()
      .setHeading(" ID", "NICK                ", "   SCORE")
      .setAlign(2, AsciiTable.RIGHT);
    const table3 = new AsciiTable()
      .setHeading(" ID", "NICK                ", "   SCORE")
      .setAlign(2, AsciiTable.RIGHT);
    const table4 = new AsciiTable()
      .setHeading(" ID", "NICK                ", "   SCORE")
      .setAlign(2, AsciiTable.RIGHT);
    const table5 = new AsciiTable()
      .setHeading(" ID", "NICK                ", "   SCORE")
      .setAlign(2, AsciiTable.RIGHT);

    const options = {
      host: sampp.ip,
      port: sampp.port,
    };

    await samp(options, (error, query) => {
      if (error) {
        console.log(error);
        const embed = new EmbedBuilder()
        .setColor("DarkRed")
        .addFields({
          name: `🔴 Error al obtener la información`,
          value: `<:11:1105665875731816549> IP: \`${options.host}:${options.port}\`\n<:12:1105665933390925824> Estado: **Offline**`
          
        })

        return interaction.reply({ embeds: [embed] });
      } else {
        const embed = new EmbedBuilder()
          .setColor(`${client.config.color}`)
          .setTitle(`**${query["hostname"]}**`);

        if (query["online"] > 0) {
          if (query["online"] > 100) {
            embed.addFields({
              name: "Lista de Jugadores ",
              value:
                "❌ No puedo obtener la lista de más de 100 usuarios",
            });
          } else if (query["players"].length == 0) {
            embed.addFields({
              name: "Lista de Jugadores ",
              value: "🔴 hubo un error al obtener la lista de usuarios, intenta nuevamente",
            });
          } else {
            if (query["online"] > 0) {
              for (var i = 0; i < 20; i++) {
                if (query["players"][i] !== undefined) {
                  table1.addRow(
                    query["players"][i]["id"],
                    query["players"][i]["name"],
                    query["players"][i]["score"]
                  );
                }
              }
              embed.addFields({
                name: `${query["online"]}/${query["maxplayers"]}`,
                value: "```\n" + table1 + "```",
              });
            }
            if (query["online"] > 20) {
              for (var i = 20; i < 40; i++) {
                if (query["players"][i] !== undefined) {
                  table2.addRow(
                    query["players"][i]["id"],
                    query["players"][i]["name"],
                    query["players"][i]["score"]
                  );
                }
              }
              embed.addFields({
                name: "\u200B",
                value: "```\n" + table2 + "```",
              });
            }
            if (query["online"] > 40) {
              for (var i = 40; i < 60; i++) {
                if (query["players"][i] !== undefined) {
                  table3.addRow(
                    query["players"][i]["id"],
                    query["players"][i]["name"],
                    query["players"][i]["score"]
                  );
                }
              }
              embed.addFields({
                name: "\u200B",
                value: "```\n" + table3 + "```",
              });
            }
            if (query["online"] > 60) {
              for (var i = 60; i < 80; i++) {
                if (query["players"][i] !== undefined) {
                  table4.addRow(
                    query["players"][i]["id"],
                    query["players"][i]["name"],
                    query["players"][i]["score"]
                  );
                }
              }
              embed.addFields({
                name: "\u200B",
                value: "```\n" + table4 + "```",
              });
            }
            if (query["online"] > 80) {
              for (var i = 80; i < 100; i++) {
                if (query["players"][i] !== undefined) {
                  table5.addRow(
                    query["players"][i]["id"],
                    query["players"][i]["name"],
                    query["players"][i]["score"]
                  );
                }
              }
              embed.addFields({
                name: "\u200B",
                value: "```\n" + table5 + "```",
              });
            }
          }
          return interaction.reply({ embeds: [embed] });
        } else if (query["online"] == 0) {
          embed.addFields({ name: "Lista de Jugadores", value: "*Servidor vacio...*" });
          return interaction.reply({ embeds: [embed] });
        }
      }
    });
    },
  };
  