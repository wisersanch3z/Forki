const discord = require("discord.js");
const client = new discord.Client({
  intents: 32767,
  partials: ["GUILD_MEMBER", "USER", "CHANNEL", "MESSAGE", "REACTION"],
});

//NPMS
const db = require('megadb');
//NPMS 

//------- t
client.commands = new discord.Collection();
client.events = new discord.Collection();
client.slash = new discord.Collection();

["commandHandler", "eventHandler", "slashHandler"].forEach((file) => {
  require(`./handlers/${file}`)(client, discord);
});
//!------

client.login(process.env.token);
