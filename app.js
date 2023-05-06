const {
  Client,
  Partials,
  Collection,
} = require("discord.js");
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
  ws: { properties: { browser: "Discord iOS" } },
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadbMenus } = require("./Handlers/menuHandler");
const { loadModals } = require("./Handlers/modalHandler");
const { loadbButtons } = require("./Handlers/buttonHandler");

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();
client.prefixs = new Collection();

loadEvents(client);
loadbButtons(client);
loadbMenus(client);
loadModals(client);

require("./Handlers/anti-crash")(client);

require("dotenv").config();

client
  .login(process.env.token)
  .then(() => {
    console.log(`Cliente ${client.user.username} conectado a Discord`);
    client.user.setActivity(`NOS VAMOS PA LA V14 PENDEJOS DE MIERDA`);
  })
  .catch((err) => console.log(err));
