const { ActivityType } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler.js");
const { loadPrefixs } = require("../../Handlers/prefixHandler.js");


module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    setInterval(() => {
      const estados = [
        { name: "bruh", type: ActivityType.Competing },
        { name: "bruh 2", type: ActivityType.Listening },
        { name: `@${client.user.username}`, type: ActivityType.Watching },
      ];

      const activity = estados[Math.floor(Math.random() * estados.length)];

      client.user.setStatus("online");
      client.user.setActivity(activity.name, { type: activity.type });
    }, 15000);

    loadCommands(client);
    loadPrefixs(client);

    console.log("Bot iniciado");
  },
};