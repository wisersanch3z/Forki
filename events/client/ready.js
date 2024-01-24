const {
  ActivityType,
  EmbedBuilder,
  WebhookClient
} = require("discord.js");

const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1117215016605728768/CckTbMgD4360QMQuRvgrhgBYz_8aV88aksbVt0-OlIFUvZD47xyB7DTsYEnSJPnjIR5G",
});

const { loadCommands } = require("../../Handlers/commandHandler.js");
const { loadPrefixs } = require("../../Handlers/prefixHandler.js");
const mongoose = require("mongoose")
const axios = require("axios")
require("dotenv").config();


module.exports = {
  name: "ready",
  once: true,


  async execute(client) {



  
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.mongodb, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const online = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`> 🟢 **${client.user.username}** conectado!`)
    webhook.send({ embeds: [online] });


    if (mongoose.connect) {
      const senal = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`> 🟢 **MongoDB** conectado!`)
      webhook.send({ embeds: [senal] });

      console.log("🟩 | Base de datos conectada")
    }



    setInterval(() => {
      const estados = [
        { name: "Con tu abuela", type: ActivityType.Competing },
        { name: "Dale Comba", type: ActivityType.Listening },
        { name: `@${client.user.username}`, type: ActivityType.Watching },
      ];

      const activity = estados[Math.floor(Math.random() * estados.length)];

      client.user.setStatus("online");
      client.user.setActivity(activity.name, { type: activity.type });
    }, 15000);

    loadCommands(client);
    loadPrefixs(client);




    console.log("🟩 | Bot arrancado");
  },
};