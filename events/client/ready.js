const { ActivityType } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler.js");
const { loadPrefixs } = require("../../Handlers/prefixHandler.js");
const mongoose = require("mongoose")
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

  if(mongoose.connect){
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