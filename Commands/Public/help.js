const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    InteractionType,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");

  const repitSchema = require('../../Schema/repitSchema');
const { options } = require("superagent");
  

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("Solicita el menu de comandos disponibles"),
      category: "Public",
      usage: "",


    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */


    async execute(interaction, client) {
        const publico = interaction.client.commands
        .filter((x) => x.category == "Public")
        .map((x) => ` ${x.data.name} ${x.usage || ""}`)
        .join("\n");

        const Staff = interaction.client.commands
        .filter((x) => x.category == "Staff")
        .map((x) => ` ${x.data.name} ${x.usage || ""}`)
        .join("\n");

        const Config = interaction.client.commands
        .filter((x) => x.category == "Config")
        .map((x) => ` ${x.data.name} ${x.usage || ""}`)
        .join("\n");


      const cmp = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("Menu")
        .addOptions([
          {
            label: "Menu Principal",
            description: "Menu Principa",
            value: "uno",
            emoji: "⚙️",
          },
          {
            label: "Configuracion",
            description: "Comandos de Configuracion",
            value: "dos",
            emoji: "🔧",
          },
          {
            label: "Público",
            description: "Comandos para cualquier usuario",
            value: "tres",
            emoji: "🧩",
          },
        ])
      );
      const user = interaction.user;

      
        const principal = new EmbedBuilder()
        .setColor("0077be")
        .setDescription(
          "¡Bienvenido! te encuentras en el panel de ayuda de **Forki!**\
          \n\nSelecciona a continuación un menu para ver las **categorias** disopnibles"
          
          )
      
        interaction.reply({
          embeds:[principal],
          components:[cmp]
        })

        const ifiltro = i => i.user.id === interaction.user.id;
  
        let collector = interaction.channel.createMessageComponentCollector({ filter: ifiltro });

        const config = new EmbedBuilder()
        .setTitle("Comandos de Configuración")
        .setDescription(`${interaction.client.commands.filter((x) => x.category == 'Config').size} **Comandos** existentes en esta categoria`)
        .setFooter({ text: "Panel de Configuración" })
        .addFields({
          name: "<:stafff:1109218297020416012> ➜ Comandos:",
          value: `\`\`\`\n${Config}\n\`\`\``
        })
        .setTimestamp()
        .setColor("0077be");
  
      const publi = new EmbedBuilder()
        .setTitle("Comandos públicos")
        .setDescription(`${interaction.client.commands.filter((x) => x.category == 'Public').size} **Comandos** existentes en esta categoria`)
        .addFields({
          name: "👨‍👩‍👦 ➜ Comandos:",
          value: `\`\`\`\n${publico}\n\`\`\``
        })
        
        .setFooter({ text: "Panel de comandos Públicos" })
        .setTimestamp()
        .setColor("0077be");
  
     

        collector.on("collect", async i => {
          if (i.values[0] === "uno") {
            await i.deferUpdate();
            i.editReply({ embeds: [principal], components: [cmp] });
          }
        });
    
        collector.on("collect", async i => {
          if (i.values[0] === "dos") {
            await i.deferUpdate();
            i.editReply({ embeds: [config], components: [cmp] });
          }
        });
    
        collector.on("collect", async i => {
          if (i.values[0] === "tres") {
            await i.deferUpdate();
            i.editReply({ embeds: [publi], components: [cmp] });
          }
        });
    }

  }
