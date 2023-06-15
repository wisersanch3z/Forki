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
            description: "Comandos publicos",
            value: "tres",
            emoji: "👥",
          },
          {
            label: "Música",
            description: "Comandos para escuchar tu música",
            value: "cuatro",
            emoji: "📀",
          },
          {
            label: "Moderacióm",
            description: "Comandos para moderar tu servidor",
            value: "cinco",
            emoji: "⚠",
          },
        ])
      );
      const user = interaction.user;

      
        const principal = new EmbedBuilder()
        .setColor("0077be")
        .setImage("https://media.discordapp.net/attachments/1011698331052941494/1104249833189019770/standard.gif")
        .setThumbnail(client.user.displayAvatarURL({size:1024}))
        .setAuthor({
          name:"<:succs:1109633125618811021> |  Panel de ayuda", 
          iconURL: user.avatarURL({dynamic:true, size:1024})
        })
        .setDescription(`
          Bienvenido al \`Panel de Ayuda\` de mi: ${client.user}, agradezco que utilizes mis funcionalidades. 
          [ <:warningf:1109631272529186928> ]TODAVIA ME ENCUENTRO EN DESARROLLO
           \n\nA continuación, con el siguiente menu abajo de este mensaje podras visualizar todas mis categorias, mira el que te llame la atención!\n
          <:config:1109232388216721430> | \`Configuración\`
          <:public:1109232387340128276> | \`Público\`
          <:warningf:1109631272529186928> | \`Moderación\`
          <:disco:1109622835229499402> | \`Música\`
        `)
        .setFooter({
          text: `Panel de ayuda - Solicitado por: ${user.username}`, 
          iconURL: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
        })
      
        interaction.reply({
          embeds:[principal],
          components:[cmp]
        })

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

        const musica = interaction.client.commands
        .filter((x) => x.category == "Music")
        .map((x) => ` ${x.data.name} ${x.usage || ""}`)
        .join("\n");


        const cantidadPublico = interaction.client.commands.filter((x) => x.category == 'Public').size
        const cantidadConfig = interaction.client.commands.filter((x) => x.category == 'Config').size
        const cantidadStaff = interaction.client.commands.filter((x) => x.category == 'Staff').size
        const cantidadMusic = interaction.client.commands.filter((x) => x.category == 'Music').size

        const ifiltro = i => i.user.id === interaction.user.id;
  
        let collector = interaction.channel.createMessageComponentCollector({ filter: ifiltro });

        //CONFIIIIIIIIIG
        const config = new EmbedBuilder()
        .setTitle("Comandos de Configuración")
        .setDescription(`\`${cantidadConfig}\` Comandos existentes en esta categoria`)
        .setFooter({ text: "Panel de Configuración" })
        .addFields({
          name: "<:config:1109232388216721430> | Comandos:",
          value: `\`\`\`js\n${Config}\n\`\`\``
        })
        .setTimestamp()
        .setColor("0077be");

        //PUBLICOOOO
      const publi = new EmbedBuilder()
        .setTitle("Comandos públicos")
        .setDescription(`\`${cantidadPublico}\` Comandos existentes en esta categoria`)
        .addFields({
          name: "<:public:1109232387340128276> | Comandos:",
          value: `\`\`\`js\n${publico}\n\`\`\``
        })
        
        .setFooter({ text: "Panel de Publico" })
        .setTimestamp()
        .setColor("0077be");

        //MUSICAAAAA
        const elmusic = new EmbedBuilder()
        .setTitle("Comandos de Música")
        .setDescription(`\`${cantidadMusic}\` Comandos existentes en esta categoria`)
        .addFields({
          name: "<:disco:1109622835229499402>  | Comandos:",
          value: `\`\`\`js\n${musica}\n\`\`\``
        })
        
        .setFooter({ text: "Panel de Música" })
        .setTimestamp()
        .setColor("0077be");

        //STAAAFF

        const elstaff = new EmbedBuilder()
        .setTitle("Comandos de Moderación")
        .setDescription(`\`${cantidadStaff}\` Comandos existentes en esta categoria`)
        .addFields({
          name: "<:warningf:1109631272529186928>  | Comandos:",
          value: `\`\`\`js\n${Staff}\n\`\`\``
        })
        
        .setFooter({ text: "Panel de Moderación" })
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
        collector.on("collect", async i => {
          if (i.values[0] === "cuatro") {
            await i.deferUpdate();
            i.editReply({ embeds: [elmusic], components: [cmp] });
          }
        });
        collector.on("collect", async i => {
          if (i.values[0] === "cinco") {
            await i.deferUpdate();
            i.editReply({ embeds: [elstaff], components: [cmp] });
          }
        });
    }

  }
