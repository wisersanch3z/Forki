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
            description: "Menu Principal",
            value: "uno",
            emoji: "1119458898609455115",
          },
          {
            label: "Configuracion",
            description: "Comandos de Configuracion",
            value: "dos",
            emoji: "1109232388216721430",
          },
          {
            label: "Público",
            description: "Comandos publicos",
            value: "tres",
            emoji: "1109232387340128276",
          },
          {
            label: "Moderacióm",
            description: "Comandos para moderar tu servidor",
            value: "cinco",
            emoji: "1109232388216721430",
          },
          {
            label: "Música",
            description: "Comandos de Música",
            value: "cuatro",
            emoji: "1109622835229499402",
          },
        ])
      );
      const user = interaction.user;

      
        const principal = new EmbedBuilder()
        .setColor(`${client.config.color}`)
        .setImage("https://media.discordapp.net/attachments/1011698331052941494/1104249833189019770/standard.gif")
        .setThumbnail(client.user.displayAvatarURL({size:1024}))
        .addFields({
          name: `▸ Bienvenido al Panel de Ayuda`,
          value: `Aquí encontrarás información sobre mis comandos y funcionalidades.
           Aún estoy en desarrollo, pero estoy trabajando para ofrecerte una gran experiencia.`
        },{
          name: `▸ Categorias Disponibles:`,
          value: `<:config:1109232388216721430> | \`Configuración\`\n<:public:1109232387340128276> | \`Público\`\n<:warningf:1109631272529186928> | \`Moderación\`\n<:disco:1109622835229499402> | \`Música\``
        },{
          name: `▸ Adicional:`,
          value: `\`\`\`js\n<> Campo Obligatorio\n() Campo Opcional\`\`\``
        })
        .setFooter({
          text: `Solicitado por ${user.username}`, 
          iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
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
        .addFields({
          name: `▸ ${cantidadConfig} Comandos disponibles`,
          value: `\`\`\`js\n${Config}\n\`\`\``
        },{
          name: `▸ Adicional:`,
          value: `\`\`\`js\n<> Campo Obligatorio\n() Campo Opcional\`\`\``
        })
        .setFooter({
          text: `Solicitado por ${user.username}`, 
          iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .setTimestamp()
        .setColor(`${client.config.color}`);

        //PUBLICOOOO
      const publi = new EmbedBuilder()
        .addFields({
          name: `▸ ${cantidadPublico} Comandos disponibles`,
          value: `\`\`\`js\n${publico}\n\`\`\``
        },{
          name: `▸ Adicional:`,
          value: `\`\`\`js\n<> Campo Obligatorio\n() Campo Opcional\`\`\``
        })
        .setFooter({
          text: `Solicitado por ${user.username}`, 
          iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .setTimestamp()
        .setColor(`${client.config.color}`);

        //MUSICAAAAA
        const elmusic = new EmbedBuilder()
        .addFields({
          name: `▸ ${cantidadMusic} Comandos disponibles`,
          value: `\`\`\`js\n${musica}\n\`\`\``
        },{
          name: `▸ Adicional:`,
          value: `\`\`\`js\n<> Campo Obligatorio\n() Campo Opcional\`\`\``
        })
        .setFooter({
          text: `Solicitado por ${user.username}`, 
          iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .setTimestamp()
        .setColor(`${client.config.color}`);

        //STAAAFF

        const elstaff = new EmbedBuilder()
        .addFields({
          name: `▸ ${cantidadStaff} Comandos disponibles`,
          value: `\`\`\`js\n${Staff}\n\`\`\``
        },{
          name: `▸ Adicional:`,
          value: `\`\`\`js\n<> Campo Obligatorio\n() Campo Opcional\`\`\``
        })
        .setFooter({
          text: `Solicitado por ${user.username}`, 
          iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .setTimestamp()
        .setColor(`${client.config.color}`);
  
  
     

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
